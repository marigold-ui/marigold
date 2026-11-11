---
paths:
  - 'packages/components/src/**'
  - 'packages/system/src/**'
---

# Component rules

Loaded when you touch component or system source. The nearest existing component is the
template: read one of similar shape before writing (`Badge` for a plain element, `Button` for a
RAC wrapper, `Dialog` for a compound).

## Public API is the product

Every prop, export and default here is consumed by many product apps. A removed or renamed prop
or export, a changed default, or a changed DOM/ARIA contract is **breaking**. Stop and ask before
making one: it needs a `major` changeset and a migration path, and it does not land on `main`.

Breaking work goes to the next major's branch, `v<current major + 1>`. Find it before asking:

```bash
node -p "require('./packages/components/package.json').version"   # 18.3.1 → look for v19
git ls-remote --heads origin v19
```

- The branch exists: ask whether to target it.
- It does not: ask whether to create it from `main`. Do not create or push it unasked.
- `.changeset/pre.json` exists: `main` is itself in prerelease for a major, so the rule above
  does not apply. Ask where the change goes.

## Shape

```
packages/components/src/<Name>/
  <Name>.tsx           component and its `<Name>Props` interface
  <Name>.stories.tsx   stories, with `.test()` interaction tests
  <Name>.test.tsx      unit tests that import the stories
  Context.ts(x)        only if parts share state
```

- Export from `packages/components/src/index.ts` (named exports, value and `type` separately).
- Theme styles live in `themes/theme-rui/src/components/<Name>.styles.ts`, and the slot names
  are typed in `packages/system/src/types/theme.ts`.

## Props

```tsx
type RemovedProps = 'isDisabled' | 'isPending' | 'className' | 'style';

export interface ButtonProps extends Omit<RAC.ButtonProps, RemovedProps> {
  variant?: 'primary' | 'secondary' | (string & {});
  size?: 'default' | 'small' | (string & {});
  /** Disables the button. @default false */
  disabled?: RAC.ButtonProps['isDisabled'];
  loading?: RAC.ButtonProps['isPending'];
  ref?: Ref<HTMLButtonElement>;
}
```

- **Rename RAC booleans** and omit the original: `isDisabled`→`disabled`, `isPending`→`loading`,
  `isInvalid`→`error`, `isReadOnly`→`readOnly`, `isRequired`→`required`, `isOpen`→`open`,
  `isSelected`→`selected`.
- **Never expose `className` or `style`.** Appearance is `variant` and `size`, both ending in
  `(string & {})` so a theme can add values.
- **`ref` is a prop** (React 19). Do not use `forwardRef`: no component here does, and
  `@eslint-react/no-forward-ref` flags it.
- **JSDoc every public prop.** The docs props table is generated from these types, so the
  comment is the documentation. Use `@default`.
- No `any`. Use `unknown` or a real type. `@ts-expect-error` with a reason, never `@ts-ignore`.

## Implementation

- Build on `react-aria-components`. Import values from the subpath
  (`react-aria-components/Button`) and types via `import type RAC from 'react-aria-components'`.
  When RAC re-exports an API, take it from RAC and not from `@react-aria/*`
  (`pnpm check:rac-imports`, ADR-0001).
- Style through `useClassNames({ component, variant, size })` from `@marigold/system`, combined
  with `cn()`. Tailwind utilities only: no CSS imports, no inline styles, no hard-coded
  appearance classes in the component.
- Accessibility is not optional: every interactive element needs an accessible name, keyboard
  support and a visible focus state. RAC gives most of it, so do not replace a RAC primitive
  with a raw element. Warn in development when a required name is missing, as `Dialog` does.

## Composition

- **Compound parts** are static properties on the parent (`Dialog.Trigger`, `Panel.Header`).
  `Object.assign(Base, { Trigger, Title })` is the common form.
- **No mode booleans.** `showFooter`, `isCompact` and friends switch what a component renders
  and double its state space. Booleans are for binary state (`disabled`, `loading`, `open`).
  Appearance goes in `variant`/`size`, structure in compound parts.
- **Children over render props.** Never a `renderHeader`-style callback.
- **Shared state through context**, not threaded props. Follow
  `packages/components/src/Sidebar/Context.tsx`: `createContext<T | null>(null)` plus a
  `useX()` hook that throws outside its provider.
- **Lift state into a provider** when something outside the subtree needs it.

## Z-index

Stacking order is a convention applied **in component source**, never in a theme style file
(`pnpm check:theme-zindex`, ADR-0003). Plain Tailwind utilities, no tokens:

| Utility | Layer                                                         |
| ------- | ------------------------------------------------------------- |
| `z-0`   | Holds a part behind its siblings                              |
| `z-1`   | Sticky content in a scroll container                          |
| `z-10`  | Lifts one item above its immediate siblings                   |
| `z-30`  | Floating: anchored to a trigger (popover, tooltip, ActionBar) |
| `z-50`  | Overlay: modal surfaces and their underlay                    |
| `z-80`  | Notification: must stay above a modal                         |

There is deliberately no `z-20`. `z-100` exists once, on the `ui-touch-hitbox` utility in
`themes/theme-rui/src/ui.css`. To see who sits where: `grep -rnE '\bz-[0-9]' packages/components/src`.

## Barrel exports

An export is **internal** when it exists for other Marigold packages and not for consumers.
Mark it with a bare `/** @internal */` on the line above, one export per tagged statement, **in
the barrel** (`src/index.ts`). The Insights scanner reads only the barrel, so a tag in the
component file does not register. Documented exports are public.

## Decisions already made

ADRs in `.memory/adr/` carry `applies_to` globs. Before a structural change, find the ones that
govern the file: `grep -l "<Name>" .memory/adr/*.md`. Four apply to every component: RAC-first
imports (0001), stacking order (0003), slot configs (0004), CSS placement over rearranging
children (0005). Terms such as "slot config" and "role primitive" are defined in
`.memory/CONTEXT.md`.
