---
'@marigold/components': major
'@marigold/theme-rui': minor
---

feat(AppLayout): switch to page-level scroll

`AppLayout` no longer owns an interior scroll container. The document
(`<html>`/`<body>`) now scrolls the whole page while the sidebar sticks
to the left and the top header sticks to the top. This matches native
browser behaviour for mobile URL-bar collapse, pull-to-refresh,
scroll restoration, find-in-page, anchor links, and keyboard scroll.

`@marigold/theme-rui` reserves the scrollbar gutter on `<html>` so
overlay scroll-lock does not shift the layout, and clips horizontal
overflow on `<body>` so off-screen portals (e.g. the react-aria
live-announcer, pulled in transitively) cannot expand the document.

Breaking:

- Code reading `mainRef.current.scrollTop` (or similar) will not see
  user scroll anymore. Read `window.scrollY` /
  `document.documentElement.scrollTop` instead.
- Styles assuming a fixed-height main region (`height: 100%` on direct
  children of `AppLayout.Main`, for example) will no longer be bounded
  by the viewport. Use `min-h-dvh` or remove the constraint.
