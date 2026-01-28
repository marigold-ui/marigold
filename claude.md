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

## Core Directives

- **Brevity**: Provide complete, functional code. Explain only when explicitly asked.
- **TypeScript**: Strict typing required - no `any` types, use `unknown` or proper types.
- **Components**: Functional components using React 19 patterns with `forwardRef` when needed.
- **Styling**: Use Tailwind CSS utility classes exclusively via `@marigold/system` theming.
- **Accessibility**: All components must be accessible. Use react-aria-components as foundation.
- **Error Handling**: Early returns preferred. Always handle edge cases explicitly.

## Code Style

### DO:

- Use `const` over `let`. Never use `var`.
- Name component files in `PascalCase` (e.g., `Button.tsx`)
- Name utility files in `camelCase` (e.g., `useNonModal.ts`)
- Use the `useClassNames` hook from `@marigold/system` for theming
- Rename react-aria props: `isDisabled` → `disabled`, `isPending` → `loading`
- Import types with `import type` for better tree-shaking
- Export components with named exports
- Use React Context for component composition (see `AccordionContext` patterns)

### DON'T:

- Use `any` type - use `unknown` or proper types
- Write inline styles or use `className` prop directly
- Use class components
- Expose internal react-aria prop names (like `isDisabled`)
- Import CSS files - use Tailwind utilities only
- Use npm or yarn - always use pnpm
- Create components without TypeScript interfaces
- Bypass the theming system with custom CSS

## Testing

- **Test runner**: Vitest (not Jest)
- **Run tests**: `pnpm test` (all), `pnpm test:unit` (unit), `pnpm test:sb` (Storybook)
- **Browser tests**: Playwright integration via `@vitest/browser-playwright`
- **Coverage**: `pnpm test:coverage` (requires 90% statements, functions, lines; 85% branches)

### Testing Pattern:

```typescript
import { render, screen } from '@testing-library/react';
import { Basic, WithIcon } from './Component.stories';

test('renders component', () => {
  // Arrange
  render(<Basic.Component />);

  // Act
  const element = screen.getByText(/Expected/);

  // Assert
  expect(element).toBeInTheDocument();
});
```

## Workflow

- **Typecheck**: Run `pnpm typecheck:only` after code changes
- **Lint**: Run `pnpm lint` to check code style
- **Format**: Run `pnpm format` before committing
- **Branch from**: `main` (use GitHub Flow)
- **Changesets**: Use `pnpm changeset` for version management
- **Storybook**: Run `pnpm sb` to preview components locally

## Monorepo Structure

- `packages/components` - Core React components
- `packages/system` - Design system utilities and hooks
- `packages/icons` - Icon components
- `packages/types` - Shared TypeScript types
- `themes/*` - Theme packages (theme-docs, theme-rui)
- `docs` - Documentation site (Next.js)
- `.storybook` - Storybook configuration

## Specialized Agents

- **component-scaffold**: Creates new components with all required files (component, tests, stories, theme styles)
- **a11y-audit**: Audits components for WCAG 2.1 AA accessibility compliance

## Common Gotchas

- Components depend on `@marigold/system` - rebuild system package if making system changes
- Docs depend on `@marigold/theme-rui` - rebuild theme package for changes to be visible in docs
- Storybook uses source folders directly (not dist) - no build needed for stories
- Git hooks run lint-staged on commit via Husky
- Node.js 22.x required (check `.node-version`)
- **Build before test**: Components must be built before running docs locally
- **React 19**: This project uses React 19 patterns (newer than many examples online)
- **Strict TypeScript**: The project enforces strict type checking
