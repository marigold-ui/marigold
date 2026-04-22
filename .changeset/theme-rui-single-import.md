---
'@marigold/theme-rui': major
---

refactor(theme-rui): single-import theme with granular composition and typography opt-in

Every piece of the theme is now its own file. Two entry points compose
them so consumers import exactly one CSS file per setup:

| Path | Contents |
| --- | --- |
| `theme.css` | Composed Tailwind entry (preflight + tokens + utilities + variants + typography + RAC plugin) |
| `styles.css` | Pre-built scoped bundle (preflight + tokens + utilities + variants; no typography) |
| `tokens.css` | Design tokens only (`@theme static`) |
| `utilities.css` | `ui-*` utility classes (renamed from `ui.css`) |
| `variants.css` | Custom Tailwind variants |
| `preflight.css` | Peer-dependency fixes on `<html>` / `<body>` |
| `global.css` | Brand typography on `<body>` |

**Tailwind setup** — unchanged, one import:

```css
@import 'tailwindcss';
@import '@marigold/theme-rui/theme.css';
```

`theme.css` composes design tokens, `ui-*` utilities, variants,
peer-dependency fixes and brand typography.

**Pre-built / standalone setup** — one import, typography now opt-in:

```tsx
import '@marigold/theme-rui/styles.css';
```

Pre-scoped to `[data-theme="rui"]`. Carries peer-dependency fixes
un-scoped so they still reach `<html>` / `<body>`. Does **not** include
brand typography — touching `<body>` typography from an embedded widget
would be hostile to the host app. Opt in separately:

```tsx
import '@marigold/theme-rui/global.css';
```

**Breaking changes**

- Standalone users lose implicit brand typography. Add the `global.css`
  import above if you want it applied to `<body>`.
- `ui.css` is renamed to `utilities.css`. The file was never an exported
  path, but anyone reaching into the package internals (`dist/ui.css`,
  direct `src/` imports) must update the name.

**Additions**

- New granular exports: `tokens.css`, `utilities.css`, `variants.css`,
  `preflight.css`. Useful for advanced setups that need a subset (for
  example, design tokens in a non-Marigold context, or rearranging the
  base rules under your own entry point).
