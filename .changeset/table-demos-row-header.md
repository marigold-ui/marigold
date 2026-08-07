---
'@marigold/docs': patch
---

fix(DST-1696): mark a row header column in the EmptyState and DateFormat table demos

Two rendered demos declared a `<Table>` without marking any column as `rowHeader`, so react-aria threw `A table must have at least one Column with the isRowHeader prop set to true` whenever the table's collection was rebuilt. The first commit runs with `isSSR` and stays silent, so the error only surfaced on a later re-render (the DateFormat demo's tabular-digits switch triggers it on the first toggle). React recovered with a synchronous re-render, leaving a console error on two published docs pages.

Both demos now mark their first column as `rowHeader`, which is also what assistive technology announces when navigating rows. The DateFormat table gained its missing `aria-label`.

[DST-1696](https://reservix.atlassian.net/browse/DST-1696)
