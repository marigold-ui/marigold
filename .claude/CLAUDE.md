# Marigold Design System - Development Guide

See @README.md for project overview and @package.json for available pnpm commands.

## Quick Start

- **Documentation**: `pnpm start` → [localhost:3000](http://localhost:3000)
- **Storybook**: `pnpm sb` → [localhost:6006](http://localhost:6006)

## Build System

- This is a **pnpm workspace monorepo** managed by Turbo
- Always use `pnpm` (not npm or yarn) - required by `packageManager` field
- Run `pnpm install` after pulling changes (postinstall builds packages)
- Build components before testing: `pnpm build` or `turbo run build`
- Use `pnpm --filter <package>` to run commands in specific packages

## Code Style

- **TypeScript**: Required for all new code (strict mode enabled)
- **Imports**: Use ES modules syntax, destructure when possible
- **React**: Use React 19 with functional components and hooks
- **Components**: Built on react-aria for accessibility
- **Styling**: Tailwind CSS utility classes (Tailwind v4)
- **Formatting**: Prettier (run `pnpm format` before committing)

## Testing

- **Test runner**: Vitest (not Jest)
- **Run tests**: `pnpm test` (all), `pnpm test:unit` (unit tests), `pnpm test:sb` (story tests)
- **Story tests**: Add `play` functions with `tags: ['component-test']` - runs in real browser via Playwright
- **Unit tests**: Import stories (e.g., `<Basic.Component />`) instead of creating test fixtures
- **Coverage**: `pnpm test:coverage` (requires 90% statements, functions, lines; 85% branches)

## Workflow

- **Typecheck**: Run `pnpm typecheck:only` after code changes
- **Lint**: Run `pnpm lint` to check code style
- **Branch from**: `main` (use GitHub Flow)
- **Changesets**: Use `pnpm changeset` for version management
- **Storybook**: Run `pnpm sb` to preview components locally

## Monorepo Structure

- `packages/components` - Core React components
- `packages/system` - Design system utilities
- `packages/icons` - Icon components
- `packages/types` - Shared TypeScript types
- `themes/*` - Theme packages
- `docs` - Documentation site (Next.js)

## Do Not

### Testing
- **Don't create test fixtures/themes** - Import stories instead of using `setup()` or creating inline themes
- **Never use `fireEvent`** - Always use `userEvent` (from `storybook/test` in stories, or `@testing-library/user-event` in test files)
- **Never use Jest APIs** - Use Vitest equivalents (`vi.fn()`, `vi.spyOn()`, `vi.mock()` instead of `jest.*`)
- **Avoid `getByTestId`** - Prefer accessible queries: `getByRole`, `getByLabelText`, `getByText` (Testing Library best practice)
- **Don't wrap in `act()` unnecessarily** - `userEvent` and `render` already handle this
- **Don't import from `dist/`** - Always import from source packages (e.g., `@marigold/components` not `@marigold/components/dist`)

### Components
- **Don't expose `className` or `style` props** - Remove from RAC props interface; use `variant`/`size` for theming
- **Don't use `isDisabled`/`isPending`** - Map to `disabled`/`loading` for cleaner API (RAC naming convention)
- **Don't hardcode styles** - Use `useClassNames` hook for theme-driven styling
- **Don't skip `forwardRef`** - All components wrapping DOM elements must forward refs
- **Don't use npm or yarn** - Only pnpm is supported (enforced via `packageManager` field)

### TypeScript
- **Avoid `@ts-ignore`** - Use `@ts-expect-error` with explanation if truly necessary
- **Minimize `as any`** - Prefer proper typing; if unavoidable, add comment explaining why

## Component Patterns

### Wrapping React Aria Components (RAC)
```typescript
type RemovedProps = 'isDisabled' | 'isPending' | 'className' | 'style';

export interface ComponentProps extends Omit<RAC.ComponentProps, RemovedProps> {
  variant?: 'primary' | 'secondary' | (string & {});
  size?: 'default' | 'small' | (string & {});
  disabled?: RAC.ComponentProps['isDisabled'];
  loading?: RAC.ComponentProps['isPending'];
}
```

### Compound Components
```typescript
interface DialogComponent extends ForwardRefExoticComponent<DialogProps> {
  Trigger: typeof DialogTrigger;
  Title: typeof DialogTitle;
}

const _Dialog = forwardRef<HTMLElement, DialogProps>(...);
_Dialog.Trigger = DialogTrigger;
_Dialog.Title = DialogTitle;

export const Dialog = _Dialog as DialogComponent;
```

### Styling with useClassNames
```typescript
const classNames = useClassNames({
  component: 'Button',
  variant,
  size,
});

return <Button className={cn(classNames, fullWidth && 'w-full')} />;
```

## Testing Patterns

### Story Play Functions
Add `play` functions to stories for interaction testing. Runs in real browser via Playwright.

```typescript
import { expect, fn, userEvent } from 'storybook/test';
import preview from '.storybook/preview';

const meta = preview.meta({
  title: 'Components/Button',
  component: Button,
});

export const Basic = meta.story({
  tags: ['component-test'],  // Required for test runner
  args: {
    onPress: fn(),
  },
  render: args => <Button {...args}>Click me</Button>,
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onPress).toHaveBeenCalled();
  },
});
```

Run with `pnpm test:sb`.

### Unit Tests (Import Stories)
Use `.test.tsx` files for additional tests, but import stories instead of creating fixtures.

```typescript
import { render, screen } from '@testing-library/react';
import { Basic } from './Button.stories';

test('renders correctly', () => {
  render(<Basic.Component data-testid="button" />);
  expect(screen.getByTestId('button')).toBeInTheDocument();
});

test('supports custom props', () => {
  render(<Basic.Component variant="primary" />);
  // assertions...
});
```

Run with `pnpm test:unit`.

## Common Gotchas

- Components depend on `@marigold/system` - rebuild system package if making system changes
- Docs depend on `@marigold/theme-rui` - rebuild theme package for changes to be visible in docs
- Storybook uses source folders directly (not dist) - no build needed for stories
- Git hooks run lint-staged on commit via Husky
- Node.js 22.x required (check `.node-version`)
- Story tests run in a real browser (Firefox) via Playwright - use `pnpm test:sb`
- Stories tagged with `component-test` are picked up by the test runner
