---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

feat(DST-1643): add a `fullscreen` size to `Dialog`

`<Dialog size="fullscreen">` fills the viewport (minus a small margin) at every breakpoint, giving content-heavy picks room for search, filters, and a long scrollable list while the title and actions stay fixed. The existing `xsmall`/`small`/`medium`/`large` sizes are unchanged.
