---
'@marigold/cli': minor
'@marigold/docs': minor
---

feat(DST-1446): `marigold search` to find components by docs content

Adds `marigold search <query>`, which ranks components by what their docs actually say — title, description, section headings, and section prose — rather than just by name. This collapses the "list → guess → docs → retry" discovery loop (3–5 calls) that AI agents run today into a single ranked, snippet-bearing, deep-linked result.

- **CLI:** new `loadSearchIndex()` / `searchComponentDocs()` library functions and a `search` command wrapping them, with `--limit`, `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache and `sanitizeRemote` — no new dependencies). Scoring weights title ×3, description ×2, each matching heading ×2, and each matching section snippet ×1. Tab completion and telemetry cover the new command. No-match exits 0 (`[]` for `--format json`).
- **Docs:** `build-manifest.mjs` now also emits `public/component-search.json` — a content index over the component MDX (per-component `headings` plus prose-bearing `{ heading, snippet }` sections, with JSX/imports/code-fences stripped). It is written after `manifest.json` so a content-index bug can never block the manifest that `list`/`docs` depend on.
