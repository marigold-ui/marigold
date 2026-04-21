---
'@marigold/components': major
'@marigold/theme-rui': minor
---

feat(AppLayout): switch to page-level scroll

`AppLayout` no longer owns an interior scroll container. The document
(`<html>`/`<body>`) scrolls the whole page; the sidebar sticks via
`position: sticky` and the top header stays pinned through
`TopNavigation`'s own sticky positioning.

### Why page-level scroll

- **Mobile URL bar collapses on scroll.** With interior scroll, Safari
  and Chrome mobile keep the URL bar expanded forever, wasting ~8% of
  the screen. Only document scroll lets the browser hide it.
- **Pull-to-refresh works.** Interior scroll disables it.
- **Browser scroll restoration** on back/forward only works reliably
  for the document, not interior containers. Interior scroll produces
  subtle "lost scroll position" bugs.
- **`Cmd+F` find-in-page** scrolls the document, not an interior
  container, so matches outside the viewport scroll into view
  correctly.
- **Anchor links (`#section`), iOS status-bar tap (scroll-to-top) and
  native keyboard nav** (`PgUp`/`PgDn`/`Space`/`Home`/`End`) all
  behave predictably.
- **`IntersectionObserver` with default root, scroll-snap, sticky
  elements, `scroll-margin-top`** — all simpler when there is one
  scroll container.

### Theme changes

`@marigold/theme-rui` adds two rules on `<html>` / `<body>` to make
page-level scroll behave under overlays:

- `html { scrollbar-gutter: stable }` — when `@react-aria/overlays`
  locks the page (sets `overflow: hidden` on `<html>` and
  compensates scrollbar width), reserving the gutter prevents the
  1 px reflow that would otherwise occur when overlays open and close.
- `body { position: relative; overflow-x: clip }` —
  `@react-aria/live-announcer` portals into `document.body` at
  `top: -10000px; left: -10000px`. With a static body, that absolute
  element can expand the document's scrollable area. `position:
  relative` contains it. `overflow-x: clip` (not `hidden`) prevents
  horizontal overflow without creating a new scroll context that
  would break `position: sticky` on descendants. `clip` is supported
  everywhere since 2022.

`ui-scrollbar`'s track is now transparent so the themed scrollbar
blends into any surface.

### Breaking changes

- Code reading `mainRef.current.scrollTop` (or similar) will no
  longer see user scroll. Read `window.scrollY` /
  `document.documentElement.scrollTop` instead.
- Styles assuming a fixed-height main region (`height: 100%` on
  direct children of `<AppLayout.Main>`, for example) will no
  longer be bounded by the viewport. Use `min-h-dvh` or remove the
  constraint.

### Known trade-offs

- Pure app-shell look via `position: sticky` can flicker on iOS
  Safari momentum scroll. Cosmetic, usually acceptable.
- Sticky elements may show a brief re-paint when overlays close.
  Not a correctness bug.
