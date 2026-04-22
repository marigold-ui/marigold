---
'@marigold/theme-rui': minor
---

feat(theme-rui): preflight fixes, file layout refactor, token and export corrections

A cohesive set of changes that (1) adds peer-dependency fixes needed
for page-level scroll, (2) splits the theme's CSS into files with
unambiguous roles, and (3) fixes a prefixer bug that stranded design
tokens inside the scoped bundle.

**New: `preflight.css`**

Two peer-dependency fixes on the real `<html>` / `<body>`:

- `html { scrollbar-gutter: stable }` — prevents a 1 px reflow when
  `@react-aria/overlays` locks the page (it sets `overflow: hidden`
  on `<html>` and compensates scrollbar width).
- `body { position: relative; overflow-x: clip }` — contains the
  `@react-aria/live-announcer` portal (mounted at `top: -10000px;
  left: -10000px`) so it cannot expand the document's scrollable
  area. `clip` (not `hidden`) keeps `position: sticky` on
  descendants working.

These rules ship inside both entry points; the prefixer excludes
`html`/`body` so the rules reach the document root while the rest
of the bundle stays scoped to `[data-theme="rui"]`.

**Scrollbar track**

`ui-scrollbar`'s track is now transparent so the themed scrollbar
blends into any surface.

**File layout refactor**

- `tokens.css` (new) — `@plugin` declaration and every design token
  in one place. Easy to find, easy to extend.
- `shared.css` (new) — the common base both entry points build on:
  `preflight.css` + `tokens.css` + `ui.css` + `variants.css`.
- `theme.css` (Tailwind-native entry) — imports `shared.css` and
  paints `<body>` directly. A Marigold-first app needs zero extra
  markup to get the theme's page background, text color, and font.
- `styles.css` (pre-compiled entry) — imports `shared.css` and
  paints `[data-theme="rui"]`. The consumer places the attribute on
  `<html>`, `<body>`, or a wrapper `<div>` to control where Marigold
  paints — whole-app or island.
- `global.css` (removed, never released) — the body paint now lives
  inline in the two entry points that actually need it, so a shared
  file with ambiguous semantics is no longer necessary.

**Two clean mental models**

- Use `theme.css` with your own Tailwind build when Marigold is the
  whole app. Body paints automatically, tokens live at `:root`,
  utilities tree-shake against your content.
- Use `styles.css` as a pre-compiled drop-in when Marigold is an
  island or you are not running Tailwind. Place `data-theme="rui"`
  wherever Marigold should paint.

**Tokens at `:root`**

`postcss-prefix-selector` previously rewrote `@theme`'s output from
`:root, :host` to `[data-theme="rui"], [data-theme="rui"] :host`,
which meant any unscoped rule could not resolve
`var(--color-background)` because the variables were only declared
inside the `[data-theme="rui"]` scope. The prefixer now excludes
`:root`, `:host`, and `[data-theme="rui"]` in addition to
`html`/`body`, so design tokens are emitted globally while utility
classes remain scoped. The `[data-theme="rui"]` exclude uses a
quote-agnostic regex so prettier round-trips don't reintroduce
double-prefixing.

**CSS exports carry a `style` condition**

Tailwind v4's CSS resolver uses `conditionNames: ["style"]`.
Bare-string export entries without a matching condition fail under
strict resolvers, so every `.css` subpath now declares both `style`
and `default` targets. The unused `./*` JS catchall is removed. New
subpath exports: `./tokens.css`, `./shared.css`, `./preflight.css`.

Existing documented imports (`theme.css`, `styles.css`) continue to
work.
