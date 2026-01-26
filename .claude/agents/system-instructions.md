---
name: system-instructions
description: |
  Use this agent to ensure that guidelines are adhered to during implementation.  Examples:

    <example>
    Context: User needs to build a new UI component
    user: "Create a reservation card component"
    assistant: "I'll implement the reservation card following design system patterns."
    </example>

    <example>
    Context: User needs to fix frontend styling or behavior
    user: "The modal isn't closing properly on mobile"
    assistant: "I'll investigate and fix the modal behavior, testing with Playwright to verify."
    </example>
model: inherit
color: cyan
tools: [ "Read", "Write", "MultiEdit"]
skills: git, testing-codequality-check, typescript-codequality-check
---
# AI Agent Guidelines
## Project Context

**Summary**: A monorepo for the Marigold Design System - a React component library built on react-aria and Tailwind CSS.

**Architecture**:

- **Frontend**: React with TypeScript
- **Components**: React Aria Components (accessible React components)
- **Styling**: Tailwind CSS (utility-first CSS framework)
- **Testing**: Vitest with Testing Library and Playwright for Storybook tests
- **Documentation**: Next.js with App Router
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

## Core Directives (The "Golden Rules")

- **Brevity**: Provide complete, functional code. Explain only when explicitly asked.
- **Language**: TypeScript only. Strict typing is required - no `any` types.
- **Components**: Functional components using React 19 patterns. Use `forwardRef` when components need ref forwarding.
- **Styling**: Use Tailwind CSS utility classes exclusively via the `@marigold/system` theming utilities.
- **Accessibility**: All components must be accessible. Use react-aria-components as foundation.
- **Error Handling**: Early returns preferred. Always handle edge cases explicitly.
- **Testing**: Write tests using Vitest and Testing Library. Reference Storybook stories in tests.

## Tech Stack & Versions

**Important**: This project uses **pnpm workspaces**, not npm or yarn. Always use `pnpm` commands. ALWAYS check `package.json` for exact versions.

## Coding Standards (Do's and Don'ts)

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
- **Important**:Write tests that reference Storybook stories (e.g., `import { Basic } from './Button.stories'`) and follow the pattern Arrange, Act, Assert.
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

## Component Architecture Patterns

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

## File Organization

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

## Monorepo Workflow

- Changes to `@marigold/components` require rebuilding: `pnpm --filter @marigold/components build`
- Changes to themes require: `pnpm build:themes`
- Documentation hot-reloads automatically
- Use workspace protocol for internal dependencies: `workspace:*`
- Turbo handles caching and parallel builds

## Accessibility Requirements

- All interactive components must be keyboard accessible
- Use semantic HTML and ARIA attributes from react-aria
- Support screen readers with proper labels and descriptions
- Ensure proper focus management
- Test with Storybook a11y addon

## Critical Guardrails

Before implementing any UI changes, you MUST verify:

1. **Design system first**: Check if Marigold/RUI provides the necessary component/ CSS tokens before custom implementation
2. **Accessibility required**: All changes must meet WCAG 2.1 AA - no exceptions
3. **Verify with Playwright**: Use browser automation to confirm changes work before marking complete
4. **CSS build required**: After CSS changes, run `docker exec core-react pnpm css:build`
5. **Code quality required**: Run `typescript-codequality-check` skill after TypeScript changes

## Common Gotchas

- **Build before test**: Components must be built before running docs locally
- **pnpm only**: Do NOT use npm or yarn commands
- **React 19**: This project uses React 19 patterns (newer than many examples online)
- **Workspace dependencies**: Changes to system/icons require rebuilding dependent packages
- **Strict TypeScript**: The project enforces strict type checking
- **Code quality required**: Run `typescript-codequality-check` skill after TypeScript changes
- **Testing required**: Run `testing-codequality-check` skill after TypeScript changes
