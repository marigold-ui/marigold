# `@marigold/system`

The styling foundation of [Marigold](https://www.marigold-ui.io), the Reservix design system: the theme types, `useClassNames`, `cva`, `cn`, `extendTheme` and the formatters (`DateFormat`, `NumericFormat`).

App code mostly imports from [`@marigold/components`](https://www.npmjs.com/package/@marigold/components), which re-exports the formatters and `useTheme`. Import `cn`, `cva` and `extendTheme` from `@marigold/system` when you style your own component or extend a theme.

```sh
pnpm add @marigold/system
```

Documentation: <https://www.marigold-ui.io>, as Markdown through <https://www.marigold-ui.io/llms.txt>, or in the terminal with `npx @marigold/cli docs extendTheme`.
