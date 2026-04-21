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

`@marigold/theme-rui` splits global `<html>` / `<body>` styles into two
tiers: **required base rules** (peer-dependency correctness) and
**opinionated defaults** (typography, themed page scrollbar).

**Required base rules** live in a new `preflight.css` file, shipped as
its own entry point at `@marigold/theme-rui/preflight.css`. Every
consumer must import it once in their app's root stylesheet — it
cannot ride along inside `theme.css` or `styles.css` because those
bundles re-scope every selector to `[data-theme="rui"]` (so they can
be adopted on a subtree), which would strip these rules from the real
`<html>` / `<body>`. The rules are:

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

**Opinionated defaults** remain opt-in:

- `@marigold/theme-rui/global.css` — Marigold's brand typography on
  `<body>` (fonts, `text-foreground`, `bg-background`). Unchanged
  import path; previously also carried the base rules above, which
  now live in `preflight.css`.
- `@marigold/theme-rui/page-scrollbar.css` — new opt-in file that
  applies the themed scrollbar (mirrors the `ui-scrollbar` utility)
  directly to `<html>`. Import it in your root layout when you want
  Marigold-styled scrollbars on the document. Replaces the hand-rolled
  `docs/app/(examples)/scrollbar.css` duplication.

`ui-scrollbar`'s track is now transparent so the themed scrollbar
blends into any surface.

### Migration

Existing Marigold apps must add one import line to their root
stylesheet:

```css
@import '@marigold/theme-rui/preflight.css';
```

Without it, `@react-aria/overlays` will shift the page by 1 px on
open/close, and the `@react-aria/live-announcer` portal may expand
the document. See the Installation docs for the full list of required
rules and where to place the import.

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
