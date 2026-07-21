# @marigold/cli

## 0.4.0

### Minor Changes

- 7fc3b53: feat(DST-1446): `marigold search` to find components by docs content

  Adds `marigold search <query>`, which ranks components by matching the query against their docs content (title, description, section headings, and section prose), not just the component name. This collapses the "list → guess → docs → retry" discovery loop (3 to 5 calls) that AI agents run today into a single ranked, snippet-bearing, deep-linked result.

  - **CLI:** new `loadSearchIndex()` / `searchComponentDocs()` library functions and a `search` command wrapping them, with `--limit`, `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache and `sanitizeRemote` — no new dependencies). Scoring weights title ×3, description ×2, each matching heading ×2, and each matching section snippet ×1. Tab completion and telemetry cover the new command. No-match exits 0 (`[]` for `--format json`).
  - **Docs:** `build-manifest.mjs` now also emits `public/component-search.json` — a content index over the component MDX (per-component `headings` plus prose-bearing `{ heading, snippet }` sections, with JSX/imports/code-fences stripped). It is written after `manifest.json` so a content-index bug can never block the manifest that `list`/`docs` depend on.

## 0.3.0

### Minor Changes

- 7877bc6: feat(DST-1421): `marigold examples` commands to expose application patterns

  Adds `marigold examples list` and `marigold examples get <slug>` so AI agents (and humans) can discover and retrieve Marigold's application-level reference patterns from the terminal, mirroring the library-first architecture of the `docs`/`list` commands.
  - **CLI:** new `listExamples()` / `getExample(slug)` library functions and a `examples` command wrapping them, with `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache layer). Tab completion and telemetry are extended to cover the new command and example slugs.
  - **Docs:** a new `build-examples.mjs` registry step emits `public/mcp/examples.json` and `public/mcp/examples/<slug>.json` from colocated `*.marigold-pattern.yaml` sidecars. Examples are discovered by sidecar presence (App-Shell placeholder pages are excluded automatically), and a malformed sidecar fails the build. Sidecars ship for the `filter`, `form` and `inventory` examples.
  - A global framework-transformation note (`marigold docs getting-started/examples-for-agents`) documents porting examples from the Next.js App Router to other frameworks (Vite, etc.) once, rather than per example.

- d84dfeb: feat(DST-1445): surface non-component docs pages in the CLI

  `marigold docs <name-or-slug>` now resolves any docs page, not just components — Foundations, Patterns, and Getting-Started pages are reachable by slug (`docs foundations/accessibility`) or name (`docs installation`). Full slugs route by prefix (`components/…` to a component, otherwise a page); bare names try components first and fall back to pages.

  `marigold list` now also lists those pages, grouped under `Foundations`, `Patterns`, and `Getting Started` headings, and accepts `--category foundations|patterns|getting-started` (the top-level segment, so `--category patterns` returns every pattern page). The `--format json` payload gains an additive top-level `pages` array (`{ title, slug, category, description }`); the existing `categories` shape is unchanged. Shell completion now suggests page slugs for `docs` and page categories for `--category`.

  The package README was updated to document the new page support: the `docs` command reference now covers slugs and page categories, and the `list` reference reflects that pages are listed and searchable alongside components.

  Note: the internal `getComponentDocs` / `ComponentDocs` exports were renamed to `getPageDocs` / `PageDocs`.

## 0.2.1

### Patch Changes

- 401929c: Fix `@marigold/cli` publishing without its `dist/` output. The release build filter excluded the CLI package, so the published tarball shipped without compiled files and the `marigold` bin pointed to a missing entry. The CLI is now built before publish.

## 0.2.0

### Minor Changes

- 6b40542: feat(DST-1264): add `@marigold/cli` — terminal access to Marigold docs, component discovery, and project setup.
  - New package `@marigold/cli` with commands:
    - `marigold docs <Component>` — fetch component documentation (supports `--section`, `--format`, `--fresh`, `--offline`)
    - `marigold list` — list available components (supports `--category`, `--search`)
    - `marigold init` — interactive wizard that installs Marigold packages, edits CSS, wraps the app in `Providers`, and patches the Vite config for Next.js and Vite projects
    - `marigold telemetry <status|enable|disable>` — manage anonymous telemetry
    - `marigold completion <bash|zsh|fish>` — print a shell completion script for tab-completing commands, options, and component names
  - Security: sanitize remote content at the fetch boundary to strip the full ECMA-48 escape set (OSC, DCS, APC/PM/SOS, cursor) so a compromised docs origin can't write to the clipboard via OSC 52 or hijack the terminal; the OSC/DCS matchers are linear-time to avoid ReDoS on adversarial input.
  - Docs site: extended `/api/manifest.json` with categorized components and package version; added `/api/telemetry` ingest route (Upstash Redis).
  - CLAUDE.md: documented CLI usage for AI agents.

  The CLI is designed so AI coding agents can fetch accurate Marigold API data from the terminal instead of guessing from training data. Library exports (`getComponentDocs`, `loadManifest`, …) are available for the MCP server to reuse in a later change.
