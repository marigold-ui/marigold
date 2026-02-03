# Demo File Patterns

Patterns and examples for creating `.demo.tsx` files.

## Naming Convention

```
{component}-{feature}.demo.tsx
```

**Rules:**
- Lowercase with hyphens
- Component name first
- Feature/variant name second
- Always end with `.demo.tsx`

**Examples:**
- `button-icon.demo.tsx` - Icon button examples
- `checkbox-indeterminate.demo.tsx` - Indeterminate checkbox state
- `table-dynamic.demo.tsx` - Dynamic table data
- `dialog-controlled.demo.tsx` - Controlled dialog state

## Demo Types

### 1. Appearance Demo

**Purpose:** Show all variants/sizes for the Appearance section.

**Pattern:**
```tsx
import type { ComponentProps } from '@marigold/components';
import { Component } from '@marigold/components';

export default (props: ComponentProps) => (
  <Component {...props}>
    {props.size === 'icon' ? <Icon /> : 'Label'}
  </Component>
);
```

**Key features:**
- Accepts props from AppearanceDemo switcher
- Handles different variants/sizes
- Minimal content
- One component instance

**Example:**
```tsx
import { Save } from 'lucide-react';
import type { ButtonProps } from '@marigold/components';
import { Button } from '@marigold/components';

export default (props: ButtonProps) => (
  <Button {...props}>{props.size === 'icon' ? <Save /> : 'Press me'}</Button>
);
```

### 2. Feature Demo

**Purpose:** Demonstrate a specific feature or use case.

**Pattern:**
```tsx
import { Component, LayoutComponent } from '@marigold/components';
import { Icon } from '@marigold/icons';

export default () => (
  <LayoutComponent space={4}>
    <Component feature="value">Example 1</Component>
    <Component feature="other">Example 2</Component>
  </LayoutComponent>
);
```

**Key features:**
- No props accepted (self-contained)
- Shows specific feature in action
- May use layout components (Inline, Stack)
- Multiple component instances if needed

**Example:**
```tsx
import { Button, Inline } from '@marigold/components';
import { Edit } from '@marigold/icons';

export default () => (
  <Inline space={5} alignY="center" alignX="center">
    <Button variant="primary">Edit</Button>
    <Button variant="primary">
      <Edit size={16} /> Edit
    </Button>
    <Button variant="icon" aria-label="Edit">
      <Edit />
    </Button>
  </Inline>
);
```

### 3. Interactive/Stateful Demo

**Purpose:** Show component with state management.

**Pattern:**
```tsx
import { useState } from 'react';
import { Component } from '@marigold/components';

export default () => {
  const [state, setState] = useState(initialValue);

  return (
    <Component
      value={state}
      onChange={setState}
    >
      Content
    </Component>
  );
};
```

**Key features:**
- Uses React hooks for state
- Shows realistic user interaction
- Handles events (onChange, onPress, etc.)
- Self-contained

**Example:**
```tsx
import { useState } from 'react';
import { Button, Dialog } from '@marigold/components';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Title>Example Dialog</Dialog.Title>
        <Dialog.Content>
          Dialog content goes here.
        </Dialog.Content>
      </Dialog>
    </>
  );
};
```

### 4. Complex/Realistic Demo

**Purpose:** Show real-world usage with multiple features.

**Pattern:**
```tsx
import { Component, Related, Stack } from '@marigold/components';

const data = [
  // Realistic data
];

export default () => (
  <Stack space={4}>
    <Component>
      {data.map(item => (
        <Related key={item.id}>{item.content}</Related>
      ))}
    </Component>
  </Stack>
);
```

**Key features:**
- Shows complete, realistic example
- May include sample data
- Demonstrates component composition
- Still focused on one primary concept

**Example:**
```tsx
import { Table } from '@marigold/components';

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'User' },
];

export default () => (
  <Table>
    <Table.Header>
      <Table.Column>Name</Table.Column>
      <Table.Column>Email</Table.Column>
      <Table.Column>Role</Table.Column>
    </Table.Header>
    <Table.Body>
      {users.map(user => (
        <Table.Row key={user.id}>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
```

## Import Patterns

### Components
```tsx
// From @marigold/components
import { Button, Stack, Inline } from '@marigold/components';

// TypeScript types
import type { ButtonProps } from '@marigold/components';
```

### Icons
```tsx
// From @marigold/icons (Marigold icon set)
import { Edit, Delete } from '@marigold/icons';

// From lucide-react (external icons)
import { Save, Download } from 'lucide-react';
```

### React hooks
```tsx
import { useState, useEffect } from 'react';
```

## Best Practices

### Keep It Minimal

**Do:**
```tsx
export default () => (
  <Button variant="primary">Submit</Button>
);
```

**Don't:**
```tsx
export default () => {
  // Unnecessary complexity
  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <div className="wrapper">
      <Button variant="primary" onPress={handleClick}>
        Submit
      </Button>
    </div>
  );
};
```

### Focus on One Thing

**Do:**
```tsx
// Shows icon usage
export default () => (
  <Button variant="icon" aria-label="Edit">
    <Edit />
  </Button>
);
```

**Don't:**
```tsx
// Mixing too many concepts
export default () => (
  <Stack>
    <Button variant="icon" loading aria-label="Edit">
      <Edit />
    </Button>
    <Button variant="primary" disabled>
      Save
    </Button>
  </Stack>
);
```

### Use Layout Components

**Do:**
```tsx
export default () => (
  <Inline space={4} alignY="center">
    <Button>Cancel</Button>
    <Button variant="primary">Submit</Button>
  </Inline>
);
```

**Don't:**
```tsx
export default () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Button>Cancel</Button>
    <Button variant="primary">Submit</Button>
  </div>
);
```

### Include Accessibility

**Do:**
```tsx
export default () => (
  <Button variant="icon" aria-label="Edit user profile">
    <Edit />
  </Button>
);
```

**Don't:**
```tsx
export default () => (
  <Button variant="icon">
    <Edit />
  </Button>
);
```

## Common Demo Patterns

### Button Examples
```tsx
// Icon button
import { Button } from '@marigold/components';
import { Edit } from '@marigold/icons';

export default () => (
  <Button variant="icon" aria-label="Edit">
    <Edit />
  </Button>
);
```

### Form Examples
```tsx
import { TextField, Stack } from '@marigold/components';

export default () => (
  <Stack space={3}>
    <TextField label="Name" placeholder="Enter your name" />
    <TextField
      label="Email"
      type="email"
      description="We'll never share your email."
    />
  </Stack>
);
```

### Dialog Examples
```tsx
import { useState } from 'react';
import { Button, Dialog } from '@marigold/components';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Title>Example</Dialog.Title>
        <Dialog.Content>Content here.</Dialog.Content>
      </Dialog>
    </>
  );
};
```

### Table Examples
```tsx
import { Table } from '@marigold/components';

const data = [
  { id: 1, name: 'Item 1', status: 'Active' },
  { id: 2, name: 'Item 2', status: 'Inactive' },
];

export default () => (
  <Table>
    <Table.Header>
      <Table.Column>Name</Table.Column>
      <Table.Column>Status</Table.Column>
    </Table.Header>
    <Table.Body>
      {data.map(item => (
        <Table.Row key={item.id}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.status}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
```

## TypeScript Considerations

### Props Type
```tsx
// When accepting props (appearance demos)
import type { ButtonProps } from '@marigold/components';

export default (props: ButtonProps) => (
  <Button {...props}>Label</Button>
);
```

### Event Handlers
```tsx
import type { PressEvent } from '@marigold/components';

export default () => {
  const handlePress = (e: PressEvent) => {
    console.log('Pressed:', e.type);
  };

  return <Button onPress={handlePress}>Press me</Button>;
};
```

### State Types
```tsx
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState<string>('');

  return <TextField value={value} onChange={setValue} />;
};
```
