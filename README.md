# Literature Notes — self-hosted

Structured reading notes for literature reviews, running entirely on your own computer or server.

- **Projects → papers → guided reading questions** (Pass 1 Triage, Pass 2 Argument, Pass 3 Critique, My Research)
- **APA 7 references** built from the details you enter
- **Auto-fill**: upload a PDF and the authors, year, title, journal, volume, issue, pages and DOI are filled in (from CrossRef when the PDF has a DOI, otherwise read from the first page by the Ask model)
- **PDFs** stored on your machine, read **side by side** with your notes
- **Ask**: question a paper (from its full text) or a whole project (from your notes), using the Claude API *or* a local model through Ollama
- **Compare**, **search**, **paper and project reports** (Markdown, Word/PDF via .html), three themes
- Works **offline**: the PDF reader and fonts are installed inside the container

Your notes are plain JSON files and your PDFs are ordinary `.pdf` files in the `data` folder, so you can always read or back them up without the app.

---

## 1. Run it with Docker (recommended)

You need **Docker Desktop** (Windows/macOS) or **Docker Engine** (Linux).

```bash
# in this folder
cp .env.example .env          # Windows PowerShell: copy .env.example .env
docker compose up -d
```

Open **http://localhost:8080**.

This downloads the ready-made app image from GitHub (`ghcr.io/goddymb/note-taking`) plus a small updater. After the first download the app runs without internet.

| Task | Command |
|---|---|
| Stop | `docker compose down` |
| Start again | `docker compose up -d` |
| See logs | `docker compose logs -f literature-notes` |

**Build from source instead** (no download from GitHub, no one-click updates):
`docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build`

### Install it as a desktop app

Open http://localhost:8080 in Edge or Chrome and go to **Settings → Desktop app → Install app** (or in Edge: **⋯ → Apps → Install this site as an app**). Literature Notes then opens in its own window from the Start menu and taskbar. Docker Desktop must be running; turn on *Start Docker Desktop when you sign in* in its settings so the app is always available.

## 2. Turn on "Ask" (optional)

Edit `.env`, then run `docker compose up -d` again.

**Option A: Claude API** (best answers, needs internet)
```
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-5-5
```
Get a key at console.anthropic.com. API use is billed per request by Anthropic, separately from a claude.ai subscription.

**Option B: a local model with Ollama** (fully offline, private)
```bash
docker compose --profile local-ai up -d
docker compose exec ollama ollama pull llama3.1:8b
```
Then in `.env`:
```
OLLAMA_URL=http://ollama:11434
OLLAMA_MODEL=llama3.1:8b
OLLAMA_NUM_CTX=32768
```
If Ollama is already installed on your computer (not in Docker), use `OLLAMA_URL=http://host.docker.internal:11434` instead.

Local models are slower and less precise than Claude, especially with long papers. They need roughly 8 GB of free RAM for an 8B model; a GPU helps a lot. If answers seem to ignore the end of a paper, raise `OLLAMA_NUM_CTX` (uses more memory) or ask about specific sections.

With neither option set, everything else works and the Ask buttons explain how to enable it.

## 3. Updates

Open **Settings → Updates**. When a new version is published, a dot appears next to Settings and the card shows what is new. Click **Update now**: the updater downloads the new version and restarts the app (one to three minutes). Your notes and PDFs are kept, because they live in `data`.

The updater (`nickfedor/watchtower`, a maintained fork of Watchtower) only ever touches the Literature Notes container and only when you click the button.

To update from the command line instead: `docker compose pull && docker compose up -d`

### Publishing a new version (for the maintainer)

1. Add a section for the version at the top of `CHANGELOG.md`, e.g. `## [1.2.0]`.
2. Bump `"version"` in `package.json`, commit and push.
3. Tag and push: `git tag v1.2.0 && git push origin v1.2.0`
   (or run the **Release** workflow by hand from the Actions tab).

GitHub Actions then checks that the server starts, builds the image for Intel/AMD and ARM, pushes it to `ghcr.io/goddymb/note-taking`, and creates the GitHub release that installed apps detect.

**One-time step after the first release:** on GitHub open your profile → **Packages** → **note-taking** → **Package settings** → **Change visibility** → **Public**. Images on GitHub's registry start private, and a private image cannot be downloaded without signing in.

## 3b. Your data and backups

Everything lives in `./data`:

```
data/docs/    one JSON file per project and per paper (your notes)
data/files/   your PDFs
```

**Back up by copying the `data` folder** (for example to a USB drive or cloud folder) while the app is stopped. The in-app **Settings → Back up all data** creates a `.json` file with your notes (not the PDFs).

**Moving notes from the online (claude.ai) version:** in the online app choose Settings → Back up all data, then here choose Settings → Restore… and pick that file. PDFs are not inside the backup, so attach them again from each paper's page.

## 4. Using it from other devices

By default the app is only reachable from the computer it runs on. To open it from your phone or another laptop on the same Wi-Fi:

1. In `docker-compose.yml` change `"127.0.0.1:8080:8080"` to `"8080:8080"`.
2. **Set `APP_PASSWORD` in `.env`** (any username works in the login box).
3. `docker compose up -d`, then open `http://<your-computer's-IP>:8080`.

Do not expose it directly to the internet. If you want access from anywhere, put it behind a VPN (for example Tailscale) or a reverse proxy with HTTPS.

## 5. Run without Docker

Requires Node.js 20 or newer.

```bash
npm install          # installs PDF.js
npm run fonts        # optional: installs the fonts for offline use
npm start            # http://localhost:8080
```

The same settings can be given as environment variables (`ANTHROPIC_API_KEY`, `OLLAMA_URL`, `APP_PASSWORD`, `DATA_DIR`, `PORT`, …).

## Settings reference

| Variable | Default | Meaning |
|---|---|---|
| `PORT` | `8080` | Port inside the container |
| `DATA_DIR` | `/data` | Where notes and PDFs are stored |
| `APP_PASSWORD` | *(empty)* | Password for the login prompt; empty = no login |
| `MAX_UPLOAD_MB` | `50` | Largest PDF accepted |
| `ANTHROPIC_API_KEY` | *(empty)* | Enables Ask with Claude |
| `ANTHROPIC_MODEL` | `claude-sonnet-5-5` | Claude model to use |
| `OLLAMA_URL` | *(empty)* | Enables Ask with a local Ollama model |
| `OLLAMA_MODEL` | `llama3.1:8b` | Ollama model name |
| `OLLAMA_NUM_CTX` | `32768` | How much text the local model reads at once |
| `AI_MAX_TOKENS` | `2048` | Longest answer |
| `CROSSREF` | `on` | Look up reference details by DOI when a PDF is uploaded (`off` to disable) |
| `CROSSREF_MAILTO` | *(empty)* | Your email, sent to CrossRef with lookups (optional) |
| `UPDATE_TOKEN` | *(set in .env)* | Shared secret between the app and its updater |
| `UPDATE_GITHUB_TOKEN` | *(empty)* | Only if the repository is private: a token that can read its releases |
| `AI_LABEL` | `Claude` / `AI` | Name shown on the Ask buttons |

## How it is built

- `.github/workflows/release.yml` builds and publishes each tagged version.
- `server.js` uses only the Node.js standard library: documents are written atomically to JSON files, uploads are checked to be real PDFs, open tabs receive live updates through server-sent events, and Ask requests are streamed from Claude or Ollama.
- `public/index.html` is the same single-page app as the online version; `public/local-runtime.js` connects it to this server.
- The container runs the app as an unprivileged user and exposes a `/healthz` endpoint for Docker's health check.
