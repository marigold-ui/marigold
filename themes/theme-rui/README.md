# `@marigold/theme-rui`

The RUI theme for [Marigold](https://www.marigold-ui.io), the Reservix design system. It holds the design tokens and the styles of every component in [`@marigold/components`](https://www.npmjs.com/package/@marigold/components).

```sh
pnpm add @marigold/components @marigold/system @marigold/theme-rui
```

With Tailwind CSS v4, import the theme in your global stylesheet and pass it to the provider. `npx @marigold/cli init` does this for you in a Vite or Next.js project.

```css
@import 'tailwindcss';
@import '@marigold/theme-rui/theme.css';

/* Adjust the path so it points at node_modules from this file. */
@source '../node_modules/@marigold';
```

```tsx
import { MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-rui';

export const App = () => (
  <MarigoldProvider theme={theme}>{/* your app */}</MarigoldProvider>
);
```

Without Tailwind, import the pre-built `@marigold/theme-rui/styles.css` instead and set `data-theme="rui"` on the element Marigold should style. Both setups are described in the [installation guide](https://www.marigold-ui.io/getting-started/installation).

## What the package exports

| Import                              | What                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------ |
| `@marigold/theme-rui`               | The theme object for `<MarigoldProvider theme>`                                |
| `@marigold/theme-rui/appearances`   | The `variant` and `size` values every component accepts in this theme, as data |
| `@marigold/theme-rui/theme.css`     | Tokens and utilities for a Tailwind CSS v4 build                               |
| `@marigold/theme-rui/styles.css`    | Pre-built CSS for apps without Tailwind, scoped to `[data-theme="rui"]`        |
| `@marigold/theme-rui/tokens.css`    | The design tokens alone                                                        |
| `@marigold/theme-rui/preflight.css` | Base rules Marigold needs on `html` and `body`                                 |
| `@marigold/theme-rui/ui.css`        | The `ui-*` utilities the component styles are built from                       |
| `@marigold/theme-rui/variants.css`  | The custom Tailwind variants the component styles use                          |

`theme.css` and `styles.css` already import `preflight.css`, `ui.css` and `variants.css`. Import those three on their own only when you assemble the theme's CSS yourself.

Tokens are documented at <https://www.marigold-ui.io/foundations/token-overview>.
