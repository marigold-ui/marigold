---
'@marigold/cli': minor
'@marigold/docs': minor
---

feat(DST-1264): add `@marigold/cli` — terminal access to Marigold docs, component discovery, and project setup.

- New package `@marigold/cli` with commands:
  - `marigold docs <Component>` — fetch component documentation (supports `--section`, `--format`, `--fresh`, `--offline`)
  - `marigold list` — list available components (supports `--category`, `--search`)
  - `marigold init` — interactive wizard to install Marigold packages and print setup instructions
  - `marigold telemetry <status|enable|disable>` — manage anonymous telemetry
- Docs site: extended `/api/manifest.json` with categorized components and package version; added `/api/telemetry` ingest route (Upstash Redis).
- CLAUDE.md: documented CLI usage for AI agents.

The CLI is designed so AI coding agents can fetch accurate Marigold API data from the terminal instead of guessing from training data. Library exports (`getComponentDocs`, `loadManifest`, …) are available for the MCP server to reuse in a later change.
