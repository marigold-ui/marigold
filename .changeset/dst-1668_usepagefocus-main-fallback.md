---
'@marigold/components': minor
---

feat(DST-1668): `usePageFocus` falls back to the `<main>` landmark when a page has no `<h1>`

On an `aria-label`-only `<Page>`, a route change now moves focus to the `<main>` landmark instead of leaving it on the clicked link. The hook makes the landmark focusable (`tabindex="-1"`) at that point, so afterwards clicking non-interactive page content also moves focus there. Pages with a `<Title>` still move focus to the heading and never make the landmark focusable. Neither focus move draws a focus ring. `<Page>` now accepts a `tabIndex` for the landmark, for example `-1` for a skip-link target, and the hook keeps it as it is.
