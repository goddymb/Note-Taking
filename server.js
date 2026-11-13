#!/usr/bin/env node
/*
 * Literature Notes — self-hosted server
 * Zero runtime dependencies: Node.js 20+ standard library only.
 *
 * Stores notes as JSON documents and PDFs as files under DATA_DIR, serves the
 * single-page app with PDF.js and fonts from local packages (works offline),
 * and optionally relays "Ask" questions to the Claude API or a local Ollama model.
 */
'use strict';
const http = require('node:http');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

/* ---------------------------------------------------------------- config */
const env = (k, d) => (process.env[k] === undefined || process.env[k] === '' ? d : process.env[k]);
const PORT = parseInt(env('PORT', '8080'), 10);
const HOST = env('HOST', '0.0.0.0');
const DATA_DIR = path.resolve(env('DATA_DIR', path.join(__dirname, 'data')));
const DOCS_DIR = path.join(DATA_DIR, 'docs');
const FILES_DIR = path.join(DATA_DIR, 'files');
const PUBLIC_DIR = path.join(__dirname, 'public');
const PDFJS_DIR = path.resolve(env('PDFJS_DIR', path.join(__dirname, 'node_modules', 'pdfjs-dist', 'build')));
const FONTS_DIR = path.resolve(env('FONTS_DIR', path.join(__dirname, 'vendor-fonts')));
const MAX_UPLOAD = parseInt(env('MAX_UPLOAD_MB', '50'), 10) * 1024 * 1024;
const APP_PASSWORD = env('APP_PASSWORD', '');

const ANTHROPIC_API_KEY = env('ANTHROPIC_API_KEY', '');
const ANTHROPIC_MODEL = env('ANTHROPIC_MODEL', 'claude-sonnet-5-5');
const ANTHROPIC_BASE_URL = env('ANTHROPIC_BASE_URL', 'https://api.anthropic.com').replace(/\/+$/, '');
const OLLAMA_URL = env('OLLAMA_URL', '').replace(/\/+$/, '');
const OLLAMA_MODEL = env('OLLAMA_MODEL', 'llama3.1:8b');
const OLLAMA_NUM_CTX = parseInt(env('OLLAMA_NUM_CTX', '32768'), 10);
const AI_MAX_TOKENS = parseInt(env('AI_MAX_TOKENS', '2048'), 10);
const CROSSREF_ENABLED = env('CROSSREF', 'on') !== 'off';
let PKG_VERSION = '0.0.0'; try { PKG_VERSION = require('./package.json').version; } catch (e) {}
const APP_VERSION = env('APP_VERSION', PKG_VERSION).replace(/^v/, '');
const UPDATE_REPO = env('UPDATE_REPO', 'goddymb/Note-Taking');
const UPDATE_GITHUB_TOKEN = env('UPDATE_GITHUB_TOKEN', '');
const GITHUB_API = env('GITHUB_API', 'https://api.github.com').replace(/\/+$/, '');
const WATCHTOWER_URL = env('WATCHTOWER_URL', '').replace(/\/+$/, '');
const UPDATE_TOKEN = env('UPDATE_TOKEN', '');
const CROSSREF_MAILTO = env('CROSSREF_MAILTO', '');
const CROSSREF_URL = env('CROSSREF_URL', 'https://api.crossref.org').replace(/\/+$/, '');

const AI = ANTHROPIC_API_KEY
  ? { provider: 'anthropic', label: env('AI_LABEL', 'Claude'), model: ANTHROPIC_MODEL }
  : OLLAMA_URL
    ? { provider: 'ollama', label: env('AI_LABEL', 'AI'), model: OLLAMA_MODEL }
    : null;

const FONT_PACKAGES = ['inter', 'sora', 'plus-jakarta-sans', 'fraunces', 'manrope', 'newsreader'];

/* ---------------------------------------------------------------- helpers */
const ID_RE = /^[A-Za-z0-9_\-.~:@+]{1,200}$/;
const validId = (id) => ID_RE.test(id) && id !== '.' && id !== '..';
const FILE_ID_RE = /^[a-f0-9]{32}$/;
const log = (...a) => console.log(new Date().toISOString(), ...a);

function send(res, status, body, headers = {}) {
  const isBuf = Buffer.isBuffer(body);
  const payload = isBuf || typeof body === 'string' ? body : JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': isBuf ? 'application/octet-stream' : typeof body === 'string' ? 'text/plain; charset=utf-8' : 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers,
  });
  res.end(payload);
}
const fail = (res, status, code, message) => send(res, status, { code, message });

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    const chunks = []; let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) { reject(Object.assign(new Error('too large'), { code: 'too_large' })); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function writeAtomic(file, data) {
  const tmp = `${file}.${process.pid}.${crypto.randomBytes(4).toString('hex')}.tmp`;
  await fsp.writeFile(tmp, data);
  await fsp.rename(tmp, file);
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.ttf': 'font/ttf', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.map': 'application/json',
  '.bcmap': 'application/octet-stream', '.pfb': 'application/octet-stream',
};

/* serve a file from inside `root`, refusing anything that escapes it */
async function serveStatic(res, root, rel, cache = 'public, max-age=86400') {
  const file = path.resolve(root, '.' + path.posix.normalize('/' + rel));
  if (!file.startsWith(root + path.sep) && file !== root) return fail(res, 403, 'forbidden', 'Forbidden');
  let st;
  try { st = await fsp.stat(file); } catch { return fail(res, 404, 'not_found', 'Not found'); }
  if (!st.isFile()) return fail(res, 404, 'not_found', 'Not found');
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Content-Length': st.size, 'Cache-Control': cache });
  fs.createReadStream(file).pipe(res);
}

/* ---------------------------------------------------------------- auth */
function authorized(req) {
  if (!APP_PASSWORD) return true;
  const h = req.headers.authorization || '';
  if (!h.startsWith('Basic ')) return false;
  const pass = Buffer.from(h.slice(6), 'base64').toString().split(':').slice(1).join(':');
  const a = crypto.createHash('sha256').update(pass).digest();
  const b = crypto.createHash('sha256').update(APP_PASSWORD).digest();
  return crypto.timingSafeEqual(a, b);
}

/* ---------------------------------------------------------------- live updates (SSE) */
const clients = new Set();
function broadcast(evt) {
  const line = `data: ${JSON.stringify(evt)}\n\n`;
  for (const c of clients) c.write(line);
}
setInterval(() => { for (const c of clients) c.write(': ping\n\n'); }, 25000).unref();

/* ---------------------------------------------------------------- index.html with local runtime */
let fontsAvailable = [];
function detectFonts() {
  fontsAvailable = FONT_PACKAGES.filter((f) => fs.existsSync(path.join(FONTS_DIR, f, 'node_modules', '@fontsource-variable', f, 'index.css')));
}
function fontsCss() {
  return fontsAvailable.map((f) => `@import url('/vendor/fonts/${f}/index.css');`).join('\n') + '\n';
}
async function indexHtml() {
  let html = await fsp.readFile(path.join(PUBLIC_DIR, 'index.html'), 'utf8');
  const config = {
    version: 1,
    pdfjsBase: '/vendor/pdfjs/',
    ai: AI ? { label: AI.label, provider: AI.provider, model: AI.model } : null,
    maxUploadMb: Math.round(MAX_UPLOAD / 1024 / 1024),
    lookup: CROSSREF_ENABLED,
    appVersion: APP_VERSION,
    updates: !!UPDATE_REPO,
  };
  const inject = `<script>window.LITNOTES_CONFIG=${JSON.stringify(config).replace(/</g, '\\u003c')};</script>\n<script src="/local-runtime.js"></script>\n`;
  // local fonts instead of Google Fonts (works offline); fall back to Google Fonts if the packages are missing
  if (fontsAvailable.length) {
    html = html.replace(/<link rel="preconnect"[^>]*>\s*/g, '').replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>/, '<link href="/vendor/fonts.css" rel="stylesheet">');
  }
  const pwa = '<link rel="manifest" href="/manifest.webmanifest">\n<meta name="theme-color" content="#8b5cf6">\n<link rel="icon" type="image/svg+xml" href="/icons/icon.svg">\n<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">\n<meta name="application-name" content="Literature Notes">\n';
  return html.replace('<head>', '<head>\n' + inject + pwa);
}

/* ---------------------------------------------------------------- updates */
function cmpVer(a, b) {
  const pa = String(a).replace(/^v/, '').split(/[.-]/).map((x) => parseInt(x, 10) || 0);
  const pb = String(b).replace(/^v/, '').split(/[.-]/).map((x) => parseInt(x, 10) || 0);
  for (let i = 0; i < 3; i++) { if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) - (pb[i] || 0); }
  return 0;
}
let releaseCache = null; // { at, data }
async function latestRelease(force) {
  if (!force && releaseCache && Date.now() - releaseCache.at < 60 * 60 * 1000) return releaseCache.data;
  const ctl = new AbortController(); const timer = setTimeout(() => ctl.abort(), 8000);
  try {
    const r = await fetch(`${GITHUB_API}/repos/${UPDATE_REPO}/releases/latest`, {
      signal: ctl.signal,
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'LiteratureNotes/' + APP_VERSION, ...(UPDATE_GITHUB_TOKEN ? { Authorization: 'Bearer ' + UPDATE_GITHUB_TOKEN } : {}) },
    });
    if (r.status === 404) throw new Error('No releases published yet');
    if (!r.ok) throw new Error('GitHub answered ' + r.status);
    const j = await r.json();
    const data = { version: String(j.tag_name || '').replace(/^v/, ''), notes: String(j.body || '').slice(0, 6000), url: j.html_url, publishedAt: j.published_at };
    releaseCache = { at: Date.now(), data };
    return data;
  } finally { clearTimeout(timer); }
}
async function handleVersion(url, res) {
  const out = { current: APP_VERSION, canUpdate: !!(WATCHTOWER_URL && UPDATE_TOKEN), repo: UPDATE_REPO };
  try {
    const rel = await latestRelease(url.searchParams.get('refresh') === '1');
    Object.assign(out, { latest: rel.version, newer: cmpVer(rel.version, APP_VERSION) > 0, notes: rel.notes, url: rel.url, publishedAt: rel.publishedAt });
  } catch (e) {
    out.error = e.name === 'AbortError' ? 'Could not reach GitHub (offline?)' : e.message;
  }
  return send(res, 200, out);
}
async function handleUpdate(res) {
  if (!WATCHTOWER_URL || !UPDATE_TOKEN) return fail(res, 400, 'not_configured', 'One-click updates need the updater service (see README)');
  log('update requested — asking the updater to pull the latest version');
  send(res, 202, { ok: true });
  // The updater replaces this container, so do not wait for the answer.
  fetch(WATCHTOWER_URL + '/v1/update', { headers: { Authorization: 'Bearer ' + UPDATE_TOKEN } })
    .then((r) => log('updater answered', r.status)).catch((e) => log('updater call ended:', e.message));
}

/* ---------------------------------------------------------------- CrossRef lookup (DOI → reference) */
const lookupCache = new Map();
const decodeEntities = (t) => String(t || '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/\s+/g, ' ').trim();
const first = (a) => (Array.isArray(a) ? a[0] : a) || '';
function crossrefToRef(m) {
  const t = m.type || '';
  const container = decodeEntities(first(m['container-title']));
  let type = 'journal';
  if (['book', 'monograph', 'edited-book', 'reference-book'].includes(t)) type = 'book';
  else if (['book-chapter', 'book-section', 'book-part', 'reference-entry'].includes(t)) type = 'chapter';
  else if (['report', 'report-component', 'posted-content'].includes(t)) type = 'report';
  else if (t === 'proceedings-article') type = container ? 'chapter' : 'conference';
  else if (t === 'dissertation') type = 'thesis';
  const people = (list) => (list || []).map((a) => (a.family ? { family: a.family, given: a.given || '', org: false } : a.name ? { family: a.name, given: '', org: true } : null)).filter(Boolean);
  const dp = ((m['published-print'] || m['published-online'] || m.issued || {})['date-parts'] || [[]])[0] || [];
  const title = decodeEntities(first(m.title)) + (first(m.subtitle) ? ': ' + decodeEntities(first(m.subtitle)) : '');
  const ref = {
    type, authors: people(m.author), editors: people(m.editor),
    year: dp[0] ? String(dp[0]) : '', month: dp[1] ? String(dp[1]) : '', day: dp[2] ? String(dp[2]) : '',
    title, doi: m.DOI || '', publisher: decodeEntities(m.publisher),
  };
  if (type === 'journal') Object.assign(ref, { journal: container, volume: m.volume || '', issue: m.issue || '', pages: m.page || '', articleNo: m['article-number'] || '' });
  if (type === 'chapter') Object.assign(ref, { bookTitle: container, pages: m.page || '' });
  if (type === 'thesis') {
    const deg = first(m.degree) || '';
    Object.assign(ref, { institution: decodeEntities((first(m.institution) || {}).name), degree: /doct|phd/i.test(deg) ? 'Doctoral dissertation' : /master/i.test(deg) ? "Master's thesis" : 'Doctoral dissertation' });
  }
  if (type === 'conference') Object.assign(ref, { conference: decodeEntities((m.event || {}).name), location: decodeEntities((m.event || {}).location) });
  return ref;
}
async function handleLookup(url, res) {
  if (!CROSSREF_ENABLED) return fail(res, 404, 'not_found', 'Lookup disabled');
  const doi = (url.searchParams.get('doi') || '').trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, '');
  if (!/^10\.\d{4,9}\/\S+$/.test(doi) || doi.length > 300) return fail(res, 400, 'invalid_request', 'Not a DOI');
  if (lookupCache.has(doi)) return send(res, 200, { ref: lookupCache.get(doi) });
  const ctl = new AbortController(); const timer = setTimeout(() => ctl.abort(), 8000);
  try {
    const r = await fetch(CROSSREF_URL + '/works/' + encodeURIComponent(doi), {
      signal: ctl.signal,
      headers: { 'User-Agent': `LiteratureNotes/1.0 (self-hosted${CROSSREF_MAILTO ? '; mailto:' + CROSSREF_MAILTO : ''})` },
    });
    if (!r.ok) return fail(res, r.status === 404 ? 404 : 502, 'not_found', 'DOI not found in CrossRef');
    const j = await r.json();
    const ref = crossrefToRef(j.message || {});
    if (lookupCache.size > 500) lookupCache.clear();
    lookupCache.set(doi, ref);
    return send(res, 200, { ref });
  } catch (e) {
    return fail(res, 502, 'unavailable', 'CrossRef could not be reached (offline?)');
  } finally { clearTimeout(timer); }
}

/* ---------------------------------------------------------------- AI relay */
function mergeTurns(messages) {
  const out = [];
  for (const m of messages) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string' || !m.content.trim()) continue;
    const last = out[out.length - 1];
    if (last && last.role === m.role) last.content += '\n\n' + m.content; else out.push({ role: m.role, content: m.content });
  }
  while (out.length && out[0].role !== 'user') out.shift();
  return out;
}

async function relayAnthropic(messages, res, signal) {
  const r = await fetch(`${ANTHROPIC_BASE_URL}/v1/messages`, {
    method: 'POST', signal,
    headers: { 'content-type': 'application/json', 'x-api-key': ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: ANTHROPIC_MODEL, max_tokens: AI_MAX_TOKENS, stream: true, messages }),
  });
  if (!r.ok) {
    const t = await r.text().catch(() => '');
    throw Object.assign(new Error(`Claude API error ${r.status}: ${t.slice(0, 300)}`), { status: r.status });
  }
  startStream(res);
  let buf = '', truncated = false;
  const dec = new TextDecoder();
  for await (const chunk of r.body) {
    buf += dec.decode(chunk, { stream: true });
    let i;
    while ((i = buf.indexOf('\n\n')) >= 0) {
      const block = buf.slice(0, i); buf = buf.slice(i + 2);
      const dataLine = block.split('\n').find((l) => l.startsWith('data:'));
      if (!dataLine) continue;
      let ev; try { ev = JSON.parse(dataLine.slice(5)); } catch { continue; }
      if (ev.type === 'content_block_delta' && ev.delta && ev.delta.type === 'text_delta') res.write(ev.delta.text);
      else if (ev.type === 'message_delta' && ev.delta && ev.delta.stop_reason === 'max_tokens') truncated = true;
      else if (ev.type === 'error') throw new Error((ev.error && ev.error.message) || 'Claude API stream error');
    }
  }
  return truncated;
}

async function relayOllama(messages, res, signal) {
  const r = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST', signal, headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ model: OLLAMA_MODEL, messages, stream: true, options: { num_ctx: OLLAMA_NUM_CTX, num_predict: AI_MAX_TOKENS } }),
  });
  if (!r.ok) {
    const t = await r.text().catch(() => '');
    throw Object.assign(new Error(`Ollama error ${r.status}: ${t.slice(0, 300)}`), { status: r.status });
  }
  startStream(res);
  let buf = '', truncated = false;
  const dec = new TextDecoder();
  for await (const chunk of r.body) {
    buf += dec.decode(chunk, { stream: true });
    let i;
    while ((i = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
      if (!line) continue;
      let ev; try { ev = JSON.parse(line); } catch { continue; }
      if (ev.error) throw new Error(ev.error);
      if (ev.message && ev.message.content) res.write(ev.message.content);
      if (ev.done && ev.done_reason === 'length') truncated = true;
    }
  }
  return truncated;
}

function startStream(res) {
  if (res.headersSent) return;
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' });
}

async function handleAsk(req, res) {
  if (!AI) return fail(res, 503, 'sampling_disabled', 'No AI provider configured');
  let body;
  try { body = JSON.parse((await readBody(req, 2 * 1024 * 1024)).toString('utf8')); } catch (e) {
    return fail(res, e.code === 'too_large' ? 413 : 400, e.code === 'too_large' ? 'prompt_too_large' : 'invalid_request', 'Bad request');
  }
  const messages = mergeTurns(Array.isArray(body.messages) ? body.messages : []);
  if (!messages.length || messages[messages.length - 1].role !== 'user') return fail(res, 400, 'invalid_request', 'Conversation must end with a user turn');
  const ctl = new AbortController();
  res.on('close', () => ctl.abort());
  try {
    const truncated = AI.provider === 'anthropic' ? await relayAnthropic(messages, res, ctl.signal) : await relayOllama(messages, res, ctl.signal);
    if (truncated) res.write('\u0000TRUNCATED');
    res.end();
  } catch (e) {
    if (ctl.signal.aborted) return;
    log('ask error:', e.message);
    if (!res.headersSent) {
      const code = e.status === 429 ? 'rate_limited' : e.status === 401 || e.status === 403 ? 'sampling_disabled' : e.status === 413 ? 'prompt_too_large' : 'upstream_error';
      return fail(res, 502, code, e.message);
    }
    res.write('\u0000ERROR');
    res.end();
  }
}

/* ---------------------------------------------------------------- router */
async function handle(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const p = decodeURIComponent(url.pathname);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  if (p === '/healthz') return send(res, 200, { ok: true, version: APP_VERSION });
  if (!authorized(req)) {
    res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Literature Notes", charset="UTF-8"' });
    return res.end('Authentication required');
  }

  // app shell
  if (req.method === 'GET' && (p === '/' || p === '/index.html')) {
    return send(res, 200, await indexHtml(), { 'Content-Type': 'text/html; charset=utf-8' });
  }
  if (req.method === 'GET' && p === '/local-runtime.js') return serveStatic(res, PUBLIC_DIR, 'local-runtime.js', 'no-cache');
  // installable app (Start menu / taskbar window)
  if (req.method === 'GET' && p === '/manifest.webmanifest') {
    return send(res, 200, JSON.stringify({
      id: '/', name: 'Literature Notes', short_name: 'Lit Notes',
      description: 'Structured reading notes for literature reviews',
      start_url: '/', scope: '/', display: 'standalone', display_override: ['window-controls-overlay', 'standalone'],
      background_color: '#fbf9ff', theme_color: '#8b5cf6', categories: ['education', 'productivity'],
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        { src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      ],
    }), { 'Content-Type': 'application/manifest+json', 'Cache-Control': 'no-cache' });
  }
  if (req.method === 'GET' && p.startsWith('/icons/')) return serveStatic(res, path.join(PUBLIC_DIR, 'icons'), p.slice('/icons/'.length), 'public, max-age=604800');
  if (req.method === 'GET' && p === '/sw.js') {
    // Minimal service worker: lets browsers install the app. It caches nothing,
    // so updates always show the latest version and data never goes stale.
    return send(res, 200, "self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));self.addEventListener('fetch',()=>{});", { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'no-cache', 'Service-Worker-Allowed': '/' });
  }
  if (req.method === 'GET' && p === '/vendor/fonts.css') return send(res, 200, fontsCss(), { 'Content-Type': 'text/css; charset=utf-8', 'Cache-Control': 'public, max-age=86400' });
  if (req.method === 'GET' && p.startsWith('/vendor/pdfjs/')) return serveStatic(res, PDFJS_DIR, p.slice('/vendor/pdfjs/'.length), 'public, max-age=604800');
  if (req.method === 'GET' && p.startsWith('/vendor/fonts/')) {
    const [pkg, ...rest] = p.slice('/vendor/fonts/'.length).split('/');
    if (!FONT_PACKAGES.includes(pkg)) return fail(res, 404, 'not_found', 'Not found');
    return serveStatic(res, path.join(FONTS_DIR, pkg, 'node_modules', '@fontsource-variable', pkg), rest.join('/'), 'public, max-age=604800');
  }

  // documents
  if (p === '/api/docs' && req.method === 'GET') {
    const names = (await fsp.readdir(DOCS_DIR)).filter((n) => n.endsWith('.json'));
    const docs = [];
    for (const n of names) {
      try { docs.push({ id: n.slice(0, -5), data: JSON.parse(await fsp.readFile(path.join(DOCS_DIR, n), 'utf8')) }); } catch (e) { log('skip unreadable doc', n, e.message); }
    }
    return send(res, 200, { docs });
  }
  const docMatch = p.match(/^\/api\/docs\/([^/]+)$/);
  if (docMatch) {
    const id = docMatch[1];
    if (!validId(id)) return fail(res, 400, 'invalid_argument', 'Bad id');
    const file = path.join(DOCS_DIR, id + '.json');
    if (req.method === 'PUT') {
      let data;
      try { data = JSON.parse((await readBody(req, 4 * 1024 * 1024)).toString('utf8')); } catch { return fail(res, 400, 'invalid_argument', 'Body must be a JSON object'); }
      if (!data || typeof data !== 'object' || Array.isArray(data)) return fail(res, 400, 'invalid_argument', 'Body must be a JSON object');
      await writeAtomic(file, JSON.stringify(data));
      broadcast({ type: 'doc', id, origin: req.headers['x-client-id'] || '' });
      return send(res, 200, { ok: true });
    }
    if (req.method === 'DELETE') {
      await fsp.rm(file, { force: true });
      broadcast({ type: 'doc', id, origin: req.headers['x-client-id'] || '' });
      return send(res, 200, { ok: true });
    }
  }
  if (p === '/api/events' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' });
    res.write('retry: 3000\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  // PDFs
  if (p === '/api/files' && req.method === 'POST') {
    let buf;
    try { buf = await readBody(req, MAX_UPLOAD); } catch (e) { return fail(res, 413, 'too_large', `Files are limited to ${MAX_UPLOAD / 1024 / 1024} MB`); }
    if (!buf.length) return fail(res, 400, 'invalid_request', 'Empty file');
    if (buf.subarray(0, 1024).indexOf('%PDF-') < 0) return fail(res, 415, 'unsupported_type', 'Not a PDF');
    const id = crypto.randomBytes(16).toString('hex');
    await writeAtomic(path.join(FILES_DIR, id + '.pdf'), buf);
    log('stored pdf', id, buf.length, 'bytes');
    return send(res, 200, { id, url: '/_blob/' + id, sizeBytes: buf.length, contentType: 'application/pdf' });
  }
  const fileMatch = p.match(/^\/api\/files\/([^/]+)$/);
  if (fileMatch && req.method === 'DELETE') {
    const id = fileMatch[1];
    if (!FILE_ID_RE.test(id)) return fail(res, 400, 'invalid_request', 'Bad id');
    let deleted = true;
    try { await fsp.rm(path.join(FILES_DIR, id + '.pdf')); } catch { deleted = false; }
    return send(res, 200, { deleted });
  }
  const blobMatch = p.match(/^\/_blob\/([^/]+)$/);
  if (blobMatch && req.method === 'GET') {
    const id = blobMatch[1];
    if (!FILE_ID_RE.test(id)) return fail(res, 404, 'not_found', 'Not found');
    const file = path.join(FILES_DIR, id + '.pdf');
    let st; try { st = await fsp.stat(file); } catch { return fail(res, 404, 'not_found', 'Not found'); }
    res.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-Length': st.size, 'Content-Disposition': 'inline', 'Cache-Control': 'private, max-age=31536000, immutable' });
    return fs.createReadStream(file).pipe(res);
  }

  // AI
  if (p === '/api/ask' && req.method === 'POST') return handleAsk(req, res);
  if (p === '/api/lookup' && req.method === 'GET') return handleLookup(url, res);
  if (p === '/api/version' && req.method === 'GET') return handleVersion(url, res);
  if (p === '/api/update' && req.method === 'POST') return handleUpdate(res);

  return fail(res, 404, 'not_found', 'Not found');
}

/* ---------------------------------------------------------------- start */
async function main() {
  await fsp.mkdir(DOCS_DIR, { recursive: true });
  await fsp.mkdir(FILES_DIR, { recursive: true });
  detectFonts();
  const server = http.createServer((req, res) => {
    handle(req, res).catch((e) => { log('error', req.method, req.url, e.stack || e.message); if (!res.headersSent) fail(res, 500, 'internal', 'Server error'); else res.end(); });
  });
  server.requestTimeout = 0; // long AI answers and large uploads
  server.listen(PORT, HOST, () => {
    log(`Literature Notes ${APP_VERSION} running on http://localhost:${PORT}`);
    log(`data folder: ${DATA_DIR}`);
    log(`PDF.js: ${fs.existsSync(path.join(PDFJS_DIR, 'pdf.min.mjs')) ? 'local' : 'MISSING (run npm install)'} · fonts: ${fontsAvailable.length ? fontsAvailable.join(', ') : 'Google Fonts fallback'}`);
    log(`Ask: ${AI ? `${AI.provider} (${AI.model})` : 'off — set ANTHROPIC_API_KEY or OLLAMA_URL to enable'}`);
    if (!APP_PASSWORD && HOST !== '127.0.0.1') log('tip: set APP_PASSWORD if other people on your network can reach this port');
  });
  const stop = () => { log('shutting down'); server.close(() => process.exit(0)); setTimeout(() => process.exit(0), 3000).unref(); };
  process.on('SIGTERM', stop); process.on('SIGINT', stop);
}
main().catch((e) => { console.error(e); process.exit(1); });
