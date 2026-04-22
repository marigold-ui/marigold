---
'@marigold/components': major
'@marigold/theme-rui': major
---

feat(AppLayout): switch to page-level scroll and simplify theme setup

### AppLayout: page-level scroll

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

**Known trade-offs**

- Pure app-shell look via `position: sticky` can flicker on iOS
  Safari momentum scroll. Cosmetic, usually acceptable.
- Sticky elements may show a brief re-paint when overlays close.
  Not a correctness bug.

### `@marigold/theme-rui`: single-import setup

The theme now ships one CSS entry point per setup. Peer-dependency
fixes for `<html>`/`<body>` ride inside both bundles — the prefixer
excludes `html`/`body` so they stay un-scoped while the rest of the
theme stays scoped to `[data-theme="rui"]`.

**Tailwind setup** — one import:

```css
@import 'tailwindcss';
@import '@marigold/theme-rui/theme.css';
```

`theme.css` composes design tokens, `ui-*` utilities, variants,
peer-dependency fixes and brand typography.

**Pre-built / standalone setup** — one import:

```tsx
import '@marigold/theme-rui/styles.css';
```

Pre-scoped to `[data-theme="rui"]`. Carries peer-dependency fixes
un-scoped so they still reach `<html>`/`<body>`. Does **not** include
brand typography — touching `<body>` typography from an embedded
widget would be hostile. Opt in separately:
`@import '@marigold/theme-rui/global.css'`.

**File layout inside `@marigold/theme-rui`**

| Path | Contents |
| --- | --- |
| `theme.css` | Composed Tailwind entry (tokens + utilities + variants + preflight + global + RAC plugin) |
| `styles.css` | Pre-built scoped bundle with un-scoped preflight |
| `tokens.css` | Design tokens only (`@theme static`) |
| `utilities.css` | `ui-*` utility classes (renamed from `ui.css`) |
| `variants.css` | Custom Tailwind variants |
| `preflight.css` | Peer-dependency fixes on `<html>`/`<body>` |
| `global.css` | Brand typography on `<body>` |

**Removed**

- `@marigold/theme-rui/page-scrollbar.css` — deleted. Page-level
  scrollbar styling forced a 12 px always-visible scrollbar in
  WebKit/Blink, overrode user OS preferences, and gave no effect in
  Firefox. The `ui-scrollbar` utility remains for container
  scrollbars inside Marigold components (Tables, ScrollAreas, Menus).

**Migration**

Existing apps replace:

```css
/* before */
@import 'tailwindcss';
@import '@marigold/theme-rui/preflight.css';
@import '@marigold/theme-rui/theme.css';
@import '@marigold/theme-rui/global.css';      /* optional */
@import '@marigold/theme-rui/page-scrollbar.css'; /* optional */
```

with:

```css
/* after */
@import 'tailwindcss';
@import '@marigold/theme-rui/theme.css';
```

Standalone users replace:

```tsx
/* before */
import '@marigold/theme-rui/preflight.css';
import '@marigold/theme-rui/styles.css';
```

with:

```tsx
/* after */
import '@marigold/theme-rui/styles.css';
```
