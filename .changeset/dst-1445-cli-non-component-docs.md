---
'@marigold/cli': minor
---

feat(DST-1445): surface non-component docs pages in the CLI

`marigold docs <name-or-slug>` now resolves any docs page, not just components — Foundations, Patterns, and Getting-Started pages are reachable by slug (`docs foundations/accessibility`) or name (`docs installation`). Full slugs route by prefix (`components/…` to a component, otherwise a page); bare names try components first and fall back to pages.

`marigold list` now also lists those pages, grouped under `Foundations`, `Patterns`, and `Getting Started` headings, and accepts `--category foundations|patterns|getting-started` (the top-level segment, so `--category patterns` returns every pattern page). The `--format json` payload gains an additive top-level `pages` array (`{ title, slug, category, description }`); the existing `categories` shape is unchanged. Shell completion now suggests page slugs for `docs` and page categories for `--category`.

The package README was updated to document the new page support: the `docs` command reference now covers slugs and page categories, and the `list` reference reflects that pages are listed and searchable alongside components.

Note: the internal `getComponentDocs` / `ComponentDocs` exports were renamed to `getPageDocs` / `PageDocs`.
