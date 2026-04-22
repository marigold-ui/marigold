---
'@marigold/components': major
'@marigold/theme-rui': minor
---

feat(AppLayout): switch to page-level scroll

`AppLayout` no longer owns an interior scroll container. The document
(`<html>`/`<body>`) scrolls the whole page; the sidebar sticks via
`position: sticky` and the top header stays pinned through
`TopNavigation`'s own sticky positioning.

**Why page-level scroll**

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

**Breaking changes**

- Code reading `mainRef.current.scrollTop` (or similar) will no
  longer see user scroll. Read `window.scrollY` /
  `document.documentElement.scrollTop` instead.
- Styles assuming a fixed-height main region (`height: 100%` on
  direct children of `<AppLayout.Main>`, for example) will no
  longer be bounded by the viewport. Use `min-h-dvh` or remove the
  constraint.

**Theme**

`@marigold/theme-rui` ships a new `preflight.css` with two peer-dependency
fixes that page-level scroll needs on the real `<html>` / `<body>`:

- `html { scrollbar-gutter: stable }` — prevents a 1 px reflow when
  `@react-aria/overlays` locks the page (it sets `overflow: hidden`
  on `<html>` and compensates scrollbar width).
- `body { position: relative; overflow-x: clip }` — contains the
  `@react-aria/live-announcer` portal (mounted at `top: -10000px;
  left: -10000px`) so it cannot expand the document's scrollable
  area. `clip` (not `hidden`) keeps `position: sticky` on descendants
  working.

These rules ride inside both `theme.css` and the pre-built `styles.css`
— the prefixer excludes `html` / `body` selectors so the rules reach
the document root while the rest of the bundle stays scoped to
`[data-theme="rui"]`. Existing consumers do not need to change their
imports.

`ui-scrollbar`'s track is now transparent so the themed scrollbar
blends into any surface.

**Known trade-offs**

- Pure app-shell look via `position: sticky` can flicker on iOS
  Safari momentum scroll. Cosmetic, usually acceptable.
- Sticky elements may show a brief re-paint when overlays close.
  Not a correctness bug.
