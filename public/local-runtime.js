/*
 * Literature Notes — local runtime.
 * Provides the same window.claude.use(...) interface the app uses on claude.ai,
 * backed by the self-hosted server: documents, PDF files, downloads and Ask.
 */
(function () {
  'use strict';
  const CFG = window.LITNOTES_CONFIG || {};
  const CLIENT_ID = Math.random().toString(36).slice(2);
  const err = (code, message, extra) => Object.assign({ code, message }, extra || {});

  async function api(method, url, body, headers) {
    let r;
    try {
      r = await fetch(url, { method, body, headers: Object.assign({ 'x-client-id': CLIENT_ID }, headers || {}) });
    } catch (e) { throw err('unavailable', 'Server unreachable'); }
    if (!r.ok) {
      let j = {}; try { j = await r.json(); } catch (e) {}
      throw err(j.code || (r.status >= 500 ? 'unavailable' : 'invalid_argument'), j.message || ('HTTP ' + r.status));
    }
    return r;
  }

  /* ---------------- db: one collection of documents ---------------- */
  function snapshotOf(list) {
    const docs = list.map((d) => ({ id: d.id, exists: true, data: () => d.data, metadata: { fromCache: false, hasPendingWrites: false } }));
    return { docs, size: docs.length, empty: !docs.length, metadata: { fromCache: false, hasPendingWrites: false }, docChanges: () => [] };
  }
  const listeners = new Set();
  let es = null, refetchTimer = null;
  async function fetchAll() {
    const r = await api('GET', '/api/docs');
    return (await r.json()).docs || [];
  }
  function notifyAll() {
    clearTimeout(refetchTimer);
    refetchTimer = setTimeout(async () => {
      try { const list = await fetchAll(); listeners.forEach((l) => l.next(snapshotOf(list))); } catch (e) {}
    }, 150);
  }
  function ensureEvents() {
    if (es || typeof EventSource === 'undefined') return;
    es = new EventSource('/api/events');
    es.onmessage = (m) => { try { const ev = JSON.parse(m.data); if (ev.origin !== CLIENT_ID) notifyAll(); } catch (e) {} };
    es.onopen = () => notifyAll(); // after a reconnect, catch up on anything missed
  }
  const enc = encodeURIComponent;
  function docRef(id) {
    return {
      id, path: id,
      async get() { const list = await fetchAll(); const d = list.find((x) => x.id === id); return { id, exists: !!d, data: () => (d ? d.data : undefined), metadata: { fromCache: false, hasPendingWrites: false } }; },
      async set(data) { await api('PUT', '/api/docs/' + enc(id), JSON.stringify(data), { 'content-type': 'application/json' }); },
      async update(data) { const cur = await this.get(); if (!cur.exists) throw err('invalid_argument', 'Document does not exist'); await this.set(Object.assign({}, cur.data(), data)); },
      async delete() { await api('DELETE', '/api/docs/' + enc(id)); },
    };
  }
  const db = {
    collection() {
      return {
        doc: (id) => docRef(id || Math.random().toString(36).slice(2)),
        async get() { return snapshotOf(await fetchAll()); },
        onSnapshot(next, error) {
          const l = { next, error }; listeners.add(l); ensureEvents();
          fetchAll().then((list) => next(snapshotOf(list))).catch((e) => error && error(err('unavailable', 'Server unreachable')));
          return () => listeners.delete(l);
        },
      };
    },
    doc: (p) => docRef(String(p).split('/').pop()),
  };

  /* ---------------- user: single local user ---------------- */
  const user = { id: async () => 'local', me: async () => ({ id: 'local', name: 'You' }), isOwner: () => true, canEdit: () => true, can: () => true, profiles: async () => ({}) };

  /* ---------------- assets: PDFs stored on the server ---------------- */
  const assets = {
    async upload(blob, opts) {
      const type = (opts && opts.type) || blob.type || 'application/pdf';
      if (type !== 'application/pdf') throw err('unsupported_type', 'Only PDF files are stored');
      const r = await api('POST', '/api/files', blob, { 'content-type': 'application/pdf' }).catch((e) => { throw e.code === 'unavailable' ? err('store_unavailable', e.message) : e; });
      return r.json();
    },
    async delete(ref) { const id = String(ref).split('/').pop(); const r = await api('DELETE', '/api/files/' + enc(id)); return r.json(); },
    async list() { return { assets: [], usage: {} }; },
  };

  /* ---------------- downloads: plain browser download ---------------- */
  const downloads = {
    async save({ filename, data }) {
      const blob = data instanceof Blob ? data : new Blob([data]);
      const u = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = u; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(u), 5000);
      return { status: 'saved' };
    },
  };

  /* ---------------- sample: Ask, relayed by the server ---------------- */
  async function sample(input, opts) {
    opts = opts || {};
    const messages = typeof input === 'string' ? [{ role: 'user', content: input }] : input;
    if (opts.signal && opts.signal.aborted) throw err('cancelled', 'Cancelled');
    let r;
    try {
      r = await fetch('/api/ask', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages }), signal: opts.signal });
    } catch (e) {
      if (opts.signal && opts.signal.aborted) throw err('cancelled', 'Cancelled');
      throw err('upstream_error', 'Server unreachable');
    }
    if (!r.ok) { let j = {}; try { j = await r.json(); } catch (e) {} throw err(j.code || 'upstream_error', j.message || ('HTTP ' + r.status)); }
    const reader = r.body.getReader(); const dec = new TextDecoder();
    let text = '', truncated = false, failed = false;
    try {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        let delta = dec.decode(value, { stream: true });
        if (delta.includes('\u0000TRUNCATED')) { truncated = true; delta = delta.replace('\u0000TRUNCATED', ''); }
        if (delta.includes('\u0000ERROR')) { failed = true; delta = delta.replace('\u0000ERROR', ''); }
        if (delta) { text += delta; if (opts.onText && text.trim()) opts.onText({ text, delta }); }
      }
    } catch (e) {
      if (opts.signal && opts.signal.aborted) throw err('cancelled', 'Cancelled', { text });
      throw err('upstream_error', 'Connection lost', { text });
    }
    if (failed) throw err('upstream_error', 'The model stopped with an error', { text });
    if (!text.trim()) throw err('empty_completion', 'No answer');
    return { text, truncated, modelTierApplied: 'default' };
  }
  sample.json = async (input, opts) => { const { text } = await sample(input, opts); const m = text.match(/[\[{][\s\S]*[\]}]/); try { return JSON.parse(m ? m[0] : text); } catch (e) { throw err('invalid_json', 'Not JSON', { text }); } };
  sample.limits = async () => ({ maxPromptBytes: 2 * 1024 * 1024 });

  const caps = { db, user, assets, downloads, sample: CFG.ai ? sample : null };
  window.claude = { use: async (name) => (name in caps ? caps[name] : null) };
})();
