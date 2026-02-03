# PR Review Checklist

Detailed checklist with code examples for reviewing Marigold Design System pull requests.

## TypeScript Standards

### No `any` Types

**Rule**: Never use `any` type. Use `unknown` or proper types instead.

```typescript
// Bad
const handleData = (data: any) => { ... }

// Good
const handleData = (data: unknown) => { ... }
const handleData = (data: Record<string, unknown>) => { ... }
const handleData = (data: MyDataType) => { ... }
```

**Exception**: `@ts-expect-error` with explanation is acceptable when truly necessary.

### Use `import type` for Type-Only Imports

**Rule**: Separate type imports for better tree-shaking.

```typescript
// Bad
import { ButtonProps, Button } from './Button';

// Good
import type { ButtonProps } from './Button';
import { Button } from './Button';

// Also good (combined)
import { Button, type ButtonProps } from './Button';
```

### Proper Interface Definitions

**Rule**: Define explicit interfaces for component props.

```typescript
// Bad
export const Button = (props: { label: string; onClick: () => void }) => { ... }

// Good
export interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button = ({ label, onClick }: ButtonProps) => { ... }
```

## Component Patterns

### Use `forwardRef` for DOM-Wrapping Components

**Rule**: All components wrapping DOM elements must forward refs.

```typescript
// Bad
export const Button = (props: ButtonProps) => {
  return <button {...props} />;
};

// Good
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <button ref={ref} {...props} />;
  }
);
```

### Rename RAC Props

**Rule**: Map React Aria Component props to cleaner API names.

| RAC Prop | Marigold Prop |
|----------|---------------|
| `isDisabled` | `disabled` |
| `isPending` | `loading` |
| `isReadOnly` | `readOnly` |
| `isRequired` | `required` |
| `isInvalid` | `error` |

```typescript
// Type definition
type RemovedProps = 'isDisabled' | 'isPending' | 'className' | 'style';

export interface ButtonProps extends Omit<RAC.ButtonProps, RemovedProps> {
  disabled?: RAC.ButtonProps['isDisabled'];
  loading?: RAC.ButtonProps['isPending'];
}

// Component implementation
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled, loading, ...props }, ref) => {
    return (
      <RAC.Button
        ref={ref}
        isDisabled={disabled}
        isPending={loading}
        {...props}
      />
    );
  }
);
```

### Do Not Expose `className` or `style` Props

**Rule**: Components should not accept `className` or `style` directly. Use `variant`/`size` for theming.

```typescript
// Bad
export interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
}

// Good
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | (string & {});
  size?: 'default' | 'small' | (string & {});
}
```

### Use `useClassNames` Hook for Theming

**Rule**: Apply styles through the theming system, not directly.

```typescript
// Bad
return <button className="bg-blue-500 text-white p-2" />;

// Good
const classNames = useClassNames({
  component: 'Button',
  variant,
  size,
});

return <button className={classNames} />;
```

## React Best Practices

### Functional Components Only

**Rule**: Never use class components.

```typescript
// Bad
class Button extends React.Component { ... }

// Good
const Button = () => { ... };
```

### Proper Hook Usage

**Rule**: Hooks must be called unconditionally at the top level.

```typescript
// Bad
const Component = ({ enabled }) => {
  if (enabled) {
    const [state, setState] = useState(false); // Hook inside conditional
  }
  return <div />;
};

// Good
const Component = ({ enabled }) => {
  const [state, setState] = useState(false);
  if (!enabled) return null;
  return <div />;
};
```

### Early Returns for Error Handling

**Rule**: Use early returns instead of nested conditionals.

```typescript
// Bad
const Component = ({ data }) => {
  if (data) {
    if (data.items) {
      return <List items={data.items} />;
    } else {
      return <Empty />;
    }
  } else {
    return <Loading />;
  }
};

// Good
const Component = ({ data }) => {
  if (!data) return <Loading />;
  if (!data.items) return <Empty />;
  return <List items={data.items} />;
};
```

## Testing Standards

### Use Vitest (Not Jest)

**Rule**: Use Vitest APIs, not Jest.

```typescript
// Bad
import { jest } from '@jest/globals';
jest.fn();
jest.spyOn();

// Good
import { vi } from 'vitest';
vi.fn();
vi.spyOn();
```

### Use `userEvent` (Not `fireEvent`)

**Rule**: Always prefer `userEvent` for more realistic interactions.

```typescript
// Bad (in stories)
import { fireEvent } from '@testing-library/react';
fireEvent.click(button);

// Good (in stories)
import { userEvent } from 'storybook/test';
await userEvent.click(button);

// Good (in test files)
import { userEvent } from '@testing-library/user-event';
const user = userEvent.setup();
await user.click(button);
```

### Use Accessible Queries

**Rule**: Prefer accessible queries over test IDs.

```typescript
// Bad
screen.getByTestId('submit-button');

// Good (in order of preference)
screen.getByRole('button', { name: 'Submit' });
screen.getByLabelText('Email address');
screen.getByText('Welcome');
screen.getByPlaceholderText('Enter email');
```

### Story Tests Must Have Tags

**Rule**: Story tests need `tags: ['component-test']` to be picked up by the test runner.

```typescript
// Bad
export const Basic = {
  render: () => <Button>Click</Button>,
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button'));
  },
};

// Good
export const Basic = {
  tags: ['component-test'],
  render: () => <Button>Click</Button>,
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button'));
  },
};
```

### Import Stories in Unit Tests

**Rule**: Import stories instead of creating test fixtures.

```typescript
// Bad
test('renders correctly', () => {
  render(<Button>Test</Button>);
});

// Good
import { Basic } from './Button.stories';

test('renders correctly', () => {
  render(<Basic.Component />);
});
```

## Accessibility

### ARIA Attributes

**Rule**: Use proper ARIA attributes when native HTML semantics are insufficient.

```typescript
// Bad
<div onClick={handleClick}>Button</div>

// Good
<button onClick={handleClick}>Button</button>

// If must use div
<div role="button" tabIndex={0} onClick={handleClick} onKeyDown={handleKeyDown}>
  Button
</div>
```

### Keyboard Navigation

**Rule**: All interactive elements must be keyboard accessible.

Check for:
- `tabIndex` on custom interactive elements
- `onKeyDown`/`onKeyUp` handlers for keyboard interactions
- Focus management in modals and overlays
- Arrow key navigation in lists and menus

### Screen Reader Support

**Rule**: Ensure content is accessible to screen readers.

Check for:
- `aria-label` or `aria-labelledby` on elements without visible text
- `aria-describedby` for additional descriptions
- `aria-live` for dynamic content updates
- Hidden decorative content with `aria-hidden="true"`

## Code Style

### Use `const` Over `let`

**Rule**: Prefer `const` unless reassignment is necessary. Never use `var`.

```typescript
// Bad
var name = 'test';
let items = [];

// Good
const name = 'test';
const items: Item[] = [];
```

### File Naming

**Rule**: Follow naming conventions.

| File Type | Convention | Example |
|-----------|------------|---------|
| Components | PascalCase | `Button.tsx` |
| Utilities | camelCase | `useNonModal.ts` |
| Stories | Component.stories.tsx | `Button.stories.tsx` |
| Tests | Component.test.tsx | `Button.test.tsx` |

### Named Exports

**Rule**: Use named exports, not default exports.

```typescript
// Bad
export default function Button() { ... }

// Good
export const Button = () => { ... };
```

## Issue Severity Guide

### Critical (Must Fix)

- Security vulnerabilities
- `any` types without justification
- Missing `forwardRef` on DOM components
- Jest APIs in new code
- `fireEvent` usage
- Broken accessibility (missing ARIA, no keyboard support)
- Type errors

### Warnings (Should Fix)

- Missing `import type`
- Exposed `className`/`style` props
- `getByTestId` usage
- Missing story tags
- Class components
- Nested conditionals

### Suggestions (Nice to Have)

- Code organization improvements
- Performance optimizations
- Additional test coverage
- Documentation improvements