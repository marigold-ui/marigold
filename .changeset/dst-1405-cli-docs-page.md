---
'@marigold/docs': patch
---

docs(DST-1405): document the Marigold CLI on the docs site

Adds a new **CLI** page under Getting Started (`/getting-started/cli`). The single page covers installation (npm / pnpm / npx), usage with AI agents, every command (`docs`, `list`, `examples`, `init`, `completion`, `telemetry`) with flags and examples, and configuration (environment variables and per-OS cache / config locations). Content mirrors `packages/cli/README.md`.

Cross-links were added from the Installation page (`marigold init` as a faster setup path) and the Usage with AI page (the AI-agents section of the new CLI page).
