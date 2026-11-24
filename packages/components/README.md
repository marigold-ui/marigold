# `@marigold/components`

The React components of [Marigold](https://www.marigold-ui.io), the Reservix design system. They are built on [`react-aria-components`](https://react-spectrum.adobe.com/react-aria/) and styled with Tailwind CSS v4 through a theme.

## Install

```sh
pnpm add @marigold/components @marigold/system @marigold/theme-rui
```

The app also needs the theme's CSS and a `<MarigoldProvider>` around it. `npx @marigold/cli init` sets both up in a Vite or Next.js project. The manual steps are in the [installation guide](https://www.marigold-ui.io/getting-started/installation).

```tsx
import { Button, MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-rui';

export const App = () => (
  <MarigoldProvider theme={theme}>
    <Button variant="primary" onPress={() => console.log('saved')}>
      Save
    </Button>
  </MarigoldProvider>
);
```

## Documentation

| What you need                                  | Where                                                                                         |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| A component's usage, props and examples        | `npx @marigold/cli docs Button`, or `https://www.marigold-ui.io/components/<category>/<name>` |
| The right component for a job                  | `npx @marigold/cli search "date range"`                                                       |
| Every page as Markdown                         | Append `.md` to a docs URL. Index: <https://www.marigold-ui.io/llms.txt>                      |
| How components combine (forms, filters, lists) | `npx @marigold/cli examples list`                                                             |
| A check for code you wrote                     | `npx @marigold/cli validate src/MyView.tsx`                                                   |
| Upgrading across a major version               | `npx @marigold/cli migrate`                                                                   |

The prop types ship with JSDoc in `dist/<Name>/<Name>.d.mts`.

## What is different from other React libraries

These are the assumptions that most often go wrong, for people and for AI coding agents.

- **No `className` and no `style`.** Appearance is set with `variant` and `size`. The values come from the theme and are listed in the "Appearance" section of each component page. Spacing and arrangement come from the layout components (`Stack`, `Inline`, `Columns`, `Grid`, `Inset`).
- **React Aria's boolean props are renamed.** `isDisabled` is `disabled`, `isRequired` is `required`, `isReadOnly` is `readOnly`, `isInvalid` is `error`, `isOpen` is `open`, `isPending` is `loading` and `isSelected` is `selected` (on `Switch` and `ToggleButton`). `Checkbox` takes `checked` instead, and a `Radio` has no selected prop of its own: set `value` on its `Radio.Group`. A few collection items still use `isDisabled`, so check the props of `Menu.Item`, `Tabs.Item`, `Table.Row` and `Select.Option`.
- **Buttons and links use `onPress`**, not `onClick`.
- **`onChange` receives the value**, not an event: `<TextField onChange={value => setName(value)} />`.
- **Parts of a component are properties of it**: `Dialog.Trigger`, `Table.Row`, `Select.Option`, `Tabs.Item`. They are not separate imports.
- **Every form field needs a `label`**, or an `aria-label` when there is no visible one. Errors are shown with `error` and `errorMessage`.
- **Do not guess a prop.** If the docs or the types do not list it, it does not exist.
