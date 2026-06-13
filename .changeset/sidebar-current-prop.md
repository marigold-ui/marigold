---
'@marigold/components': minor
---

feat(DST-1322): add `current` prop to `Sidebar.Nav` for automatic active item detection

`Sidebar.Nav` now accepts a `current` prop that resolves the active leaf automatically — pass the current pathname (string) for smart segment-aware matching, or a predicate `(href, key) => boolean` for full control. Removes the per-item `active={pathname === '/...'}` boilerplate. The per-item `active` prop on `Sidebar.Item` still works as a local override.
