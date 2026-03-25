---
'@marigold/docs': patch
---

Move markdown parser and plugins from `app/mcp/` to `lib/markdown/`. Serve markdown at `/{page-path}.md` instead of `/mcp/{page-path}.md`. Remove `build:md-docs` script.
