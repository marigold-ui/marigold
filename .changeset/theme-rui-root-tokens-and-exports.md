---
'@marigold/theme-rui': patch
---

refactor(theme-rui): split tokens from entry points and align body paint with mount model

Two goals: make the theme drop in cleanly for both Tailwind-native and
standalone consumers, and make the file layout legible so it is clear
what each file does.

**File layout**

- `tokens.css` (new) — the `@plugin` declaration and every design
  token in one place. Easy to find, easy to extend.
- `shared.css` (new) — the common base both entry points build on:
  `preflight.css` + `tokens.css` + `ui.css` + `variants.css`.
- `theme.css` (Tailwind-native entry) — imports `shared.css` and
  paints `body` directly. No `[data-theme]` attribute required.
- `styles.css` (pre-compiled entry) — imports `shared.css` and
  paints `[data-theme="rui"]`. The consumer places the attribute
  on `<html>`, `<body>`, or a wrapper `<div>` to control scope.
- `global.css` (removed) — the body paint now lives inline in the
  two entry points that actually need it, so a shared file with
  ambiguous semantics is no longer necessary.

**Tokens at `:root`**

`postcss-prefix-selector` previously rewrote `@theme`'s output from
`:root, :host` to `[data-theme="rui"], [data-theme="rui"] :host`,
which meant any unscoped rule could not resolve
`var(--color-background)` because the variables were only declared
inside the `[data-theme="rui"]` scope. The prefixer now excludes
`:root`, `:host`, and `[data-theme="rui"]` in addition to
`html`/`body`, so design tokens are emitted globally while utility
classes remain scoped.

**Two clean mental models**

- Use `theme.css` with your own Tailwind build when Marigold is the
  whole app. Body paints automatically, tokens live at `:root`,
  utilities tree-shake against your content.
- Use `styles.css` as a pre-compiled drop-in when Marigold is an
  island or you are not running Tailwind. Place `data-theme="rui"`
  wherever Marigold should paint.

**CSS exports carry a `style` condition**

Tailwind v4's CSS resolver uses `conditionNames: ["style"]`.
Bare-string export entries without a matching condition fail under
strict resolvers, so every `.css` subpath now declares both `style`
and `default` targets. The unused `./*` JS catchall is removed.
