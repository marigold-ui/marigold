---
paths:
  - 'packages/components/src/**/*.stories.tsx'
  - 'packages/components/src/**/*.test.tsx'
  - 'packages/components/src/**/*.test.ts'
  - 'packages/system/src/**/*.test.tsx'
  - 'packages/system/src/**/*.test.ts'
  - 'packages/icons/src/**/*.test.tsx'
---

# Testing rules

Vitest 4 in browser mode (Firefox, via Playwright). Two projects, both read package source, so
no build is needed. `packages/cli` and `docs` have their own node-mode suites
(`pnpm --filter <package> test`), and these rules do not describe them.

| What                    | Command                                                         |
| ----------------------- | --------------------------------------------------------------- |
| One component, unit     | `pnpm vitest run --project=unit-tests packages/components/src/<Name>`       |
| One component, stories  | `pnpm vitest run --project=storybook-tests packages/components/src/<Name>`  |
| Everything              | `pnpm vitest run` (about 4 minutes)                             |

Use `vitest run`. The bare `pnpm test*` scripts start watch mode in a terminal. With Storybook
running, the `run-story-tests` MCP tool does the same job for stories.

## Story tests

Attach interaction tests with `.test(name, options?, fn)`. Do not write `play` functions.

```tsx
import { expect, fn } from 'storybook/test';
import preview from '.storybook/preview';

const meta = preview.meta({ title: 'Components/Button', component: Button });

export const Basic = meta.story({
  tags: ['component-test'], // required for the runner, inherited by .test() children
  render: args => <Button {...args}>Click me</Button>,
});

Basic.test(
  'Calls onPress when clicked',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { onPress: fn() },
  },
  async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button'));

    await expect(args.onPress).toHaveBeenCalled();
  }
);
```

- Take `canvas`, `userEvent`, `args`, `step` from the test context. Never
  `within(canvasElement)`, never a module-scope `userEvent`.
- Per-test setup goes in `options` (`parameters`, `args`, `decorators`), not in the story.
- Default to `chromatic: { disableSnapshot: true }`. Use `false` only when the end state is a
  visual state worth guarding.
- Wrap each act-assert cycle in `step()` when a behaviour needs more than one.
- Never import from `vitest` in a story file. It breaks the Storybook preview, and ESLint
  rejects it. Use `storybook/test`.

## Unit tests

`.test.tsx` next to the component. Render the stories instead of building fixtures:

```tsx
import { render, screen } from '@testing-library/react';
import { Basic } from './Button.stories';

test('supports custom props', () => {
  render(<Basic.Component variant="primary" />);

  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

## Do not

- Use `fireEvent`. Use `userEvent` (`storybook/test` in stories, `@testing-library/user-event`
  in test files).
- Use Jest APIs. `vi.fn()`, `vi.spyOn()`, `vi.mock()`.
- Reach for `getByTestId` first. Prefer `getByRole`, `getByLabelText`, `getByText`.
- Create inline themes or `setup()` fixtures. Import a story.
- Wrap in `act()`. `render` and `userEvent` already do.
- Import from `dist/`.
- Skip, delete or loosen a failing test to get green. Fix the code or ask.

## What the suite does not catch

Accessibility checks run as `a11y.test: 'todo'` (`.storybook/preview.tsx`), so violations show
in the Storybook UI and **do not fail a test**. Assert accessible names and roles explicitly,
which querying by role does for free. CI gates merged coverage at 90% statements, functions and
lines and 85% branches.
