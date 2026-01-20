# AI Agent Guidelines

## 1. Project Context

**Summary**: A monorepo for the Marigold Design System - a React component library built on react-aria and Tailwind CSS.

**Architecture**:

- **Frontend**: React 19.x with TypeScript 5.9.x
- **Components**: React Aria Components (accessible React components)
- **Styling**: Tailwind CSS 4.x (utility-first CSS framework)
- **Testing**: Vitest with Testing Library and Playwright for Storybook tests
- **Documentation**: Next.js 16.x with App Router
- **Monorepo Management**: pnpm workspaces with Turbo
- **Build Tools**: tsdown for component builds, Vite for testing

**Monorepo Structure**:

- `packages/components` - Core React components
- `packages/system` - Design system utilities and hooks
- `packages/icons` - Icon components
- `packages/types` - Shared TypeScript types
- `themes/theme-docs` - Documentation theme
- `themes/theme-rui` - RUI theme
- `docs` - Next.js documentation site
- `.storybook` - Storybook configuration

## 2. Core Directives (The "Golden Rules")

- **Brevity**: Provide complete, functional code. Explain only when explicitly asked.
- **Language**: TypeScript only. Strict typing is required - no `any` types.
- **Components**: Functional components using React 19 patterns. Use `forwardRef` when components need ref forwarding.
- **Styling**: Use Tailwind CSS utility classes exclusively via the `@marigold/system` theming utilities.
- **Accessibility**: All components must be accessible. Use react-aria-components as foundation.
- **Error Handling**: Early returns preferred. Always handle edge cases explicitly.
- **Testing**: Write tests using Vitest and Testing Library. Reference Storybook stories in tests.

## 3. Tech Stack & Versions

- **Node**: 22.x
- **Package Manager**: pnpm 10.x
- **React**: 19.x
- **TypeScript**: 5.x
- **React Aria Components**: 1.x
- **Tailwind CSS**: 4.x
- **Next.js**: 16.x (for docs)
- **Vitest**: 4.x
- **Storybook**: 10.x

**Important**: This project uses **pnpm workspaces**, not npm or yarn. Always use `pnpm` commands.

## 4. Commands

*Always use these specific commands to run/test:*

**Development**:

- Start documentation: `pnpm start` (or `pnpm --filter @marigold/docs dev`)
- Start Storybook: `pnpm sb`
- Watch component builds: `pnpm --filter @marigold/components watch`

**Building**:

- Build components & themes: `pnpm build`
- Build docs: `pnpm build:docs`
- Build Storybook: `pnpm build:sb`
- Build themes only: `pnpm build:themes`
- Build component props: `pnpm build:component-props`

**Testing**:

- Run all tests: `pnpm test`
- Run unit tests: `pnpm test:unit`
- Run Storybook tests: `pnpm test:sb`
- Run with coverage: `pnpm test:coverage`

**Code Quality**:

- Lint: `pnpm lint`
- Format: `pnpm format`
- Format & fix: `pnpm format:fix`
- Type check: `pnpm typecheck`
- Type check only: `pnpm typecheck:only`

**Utilities**:

- Clean all: `pnpm clean`
- Clean builds: `pnpm clean:build`
- Generate registry: `pnpm registry`
- Changesets: `pnpm changeset`

## 5. Coding Standards (Do's and Don'ts)

### DO:

- Use `const` over `let`. Never use `var`.
- Name component files in `PascalCase` (e.g., `Button.tsx`, `DatePicker.tsx`).
- Name utility files in `camelCase` (e.g., `fileUtils.ts`, `useNonModal.ts`).
- Use arrow functions for component definitions (except when using `forwardRef`).
- Use the `useClassNames` hook from `@marigold/system` for theming.
- Follow the pattern: rename react-aria props like `isDisabled` to `disabled`, `isPending` to `loading`.
- Define component interfaces with removed props using: `Omit<RAC.ComponentProps, 'isDisabled' | 'className'>`.
- Import types with `import type` for better tree-shaking.
- Use Tailwind utility classes through the theming system (never inline `className`).
- Write tests that reference Storybook stories (e.g., `import { Basic } from './Button.stories'`).
- Add `data-testid` for test selectors when needed.
- Export components with named exports.
- Use React Context for component composition (see `AccordionContext`, `DrawerContext` patterns).
- Maintain accessibility with ARIA attributes from react-aria.

### DON'T:

- Do NOT use `any` type in TypeScript. Use `unknown` or proper types.
- Do NOT write inline styles or use `className` prop directly on components.
- Do NOT use class components.
- Do NOT expose internal react-aria prop names (like `isDisabled`) - rename to user-friendly names.
- Do NOT import CSS files. Use Tailwind utilities only.
- Do NOT use npm or yarn - always use pnpm.
- Do NOT create components without TypeScript interfaces.
- Do NOT skip accessibility considerations.
- Do NOT bypass the theming system with custom CSS.

## 6. Component Architecture Patterns

### Component Structure:

```typescript
import type RAC from 'react-aria-components';
import { ComponentName } from 'react-aria-components';
import { useClassNames } from '@marigold/system';

// Props with removed internal names
type RemovedProps = 'isDisabled' | 'className' | 'style';

export interface ComponentProps extends Omit<RAC.ComponentProps, RemovedProps> {
  variant?: 'default' | 'primary' | (string & {});
  size?: 'small' | 'default' | 'large' | (string & {});
  disabled?: RAC.ComponentProps['isDisabled'];
}

export const Component = ({
  variant,
  size,
  disabled,
  children,
  ...props
}: ComponentProps) => {
  const classNames = useClassNames({ component: 'Component', variant, size });

  return (
    <ComponentName {...props} isDisabled={disabled} className={classNames.container}>
      {children}
    </ComponentName>
  );
};
```

### Context Pattern for Composition:

```typescript
// Context.tsx
import { createContext } from 'react';

interface ContextValue {
  classNames: ReturnType<typeof useClassNames>;
  // other shared state
}

export const Context = createContext<ContextValue>({} as ContextValue);
export const Provider = Context.Provider;
```

### Testing Pattern:

```typescript
import { render, screen } from '@testing-library/react';
import { Basic, WithIcon } from './Component.stories';

test('renders component', () => {
  render(<Basic.Component />);

  const element = screen.getByText(/Expected/);

  expect(element).toBeInTheDocument();
});
```

## 7. File Organization

**Component Directory Structure**:

```
packages/components/ComponentName/
- ComponentName.tsx          # Main component
- ComponentName.test.tsx     # Unit tests (apply the Testing pattern)
- ComponentName.stories.tsx  # Storybook stories
- ComponentChild.tsx         # Sub-components (if needed)
- Context.tsx                # Context (if needed)
```

```
themes/theme-rui/src/components/ComponentName/
- ComponentName.styles.ts    # Main style file for component
```

```
packages/system/src/types/theme.ts # Theme interface
```

## 8. Monorepo Workflow

- Changes to `@marigold/components` require rebuilding: `pnpm --filter @marigold/components build`
- Changes to themes require: `pnpm build:themes`
- Documentation hot-reloads automatically
- Use workspace protocol for internal dependencies: `workspace:*`
- Turbo handles caching and parallel builds

## 9. Accessibility Requirements

- All interactive components must be keyboard accessible
- Use semantic HTML and ARIA attributes from react-aria
- Support screen readers with proper labels and descriptions
- Ensure proper focus management
- Test with Storybook a11y addon

## 10. Common Gotchas

- **Build before test**: Components must be built before running docs locally
- **pnpm only**: Do NOT use npm or yarn commands
- **React 19**: This project uses React 19 patterns (newer than many examples online)
- **Workspace dependencies**: Changes to system/icons require rebuilding dependent packages
- **Strict TypeScript**: The project enforces strict type checking

## 11. Version Control & Releases

- Use conventional commits
- Changes tracked via `@changesets/cli`: run `pnpm changeset` for versioning
- Main branch: `main`
- Follow GitHub Flow for PRs
- Add tests for new features
- Update documentation for API changes
