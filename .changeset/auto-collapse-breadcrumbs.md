---
'@marigold/components': minor
'@marigold/theme-rui': patch
---

feat([DST-1240]): Add auto-collapse behavior to Breadcrumbs. The `maxVisibleItems` prop now defaults to `'auto'`, which uses a `ResizeObserver` to progressively show or hide breadcrumb items based on available container width.
