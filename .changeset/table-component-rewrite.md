---
'@marigold/components': major
'@marigold/theme-rui': minor
'@marigold/theme-docs': minor
---

**BREAKING CHANGE**: Comprehensive Table component rewrite with modern features

This release introduces a complete rewrite of the `Table` component built on react-aria-components, providing enhanced accessibility, modern features, and improved developer experience.

## Breaking Changes

The old `Table` component has been moved to `@marigold/components/legacy`. The main `Table` export now refers to the new implementation.

### Changed API Structure

**Migration Required:**

```typescript
// Before (old Table)
import { Table } from '@marigold/components';

// After - Option 1: Use legacy export (temporary)
import { Table } from '@marigold/components/legacy';

// After - Option 2: Migrate to new Table API (recommended)
import { Table } from '@marigold/components';

<Table>
  <Table.Header>
    <Table.Column>Name</Table.Column>
    <Table.Column>Email</Table.Column>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>John Doe</Table.Cell>
      <Table.Cell>john@example.com</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

### Empty State Prop Location

The `emptyState` prop has been moved from the `Table` component to `Table.Body`. This change provides better composition and follows react-aria-components patterns.

**Migration Required:**

```typescript
// Before (old Table)
<Table emptyState={<EmptyMessage />}>
  <Table.Header>
    <Table.Column>Name</Table.Column>
  </Table.Header>
  <Table.Body>
    {/* rows */}
  </Table.Body>
</Table>

// After (new Table)
<Table>
  <Table.Header>
    <Table.Column>Name</Table.Column>
  </Table.Header>
  <Table.Body emptyState={<EmptyMessage />}>
    {/* rows */}
  </Table.Body>
</Table>
```

### Form Fields in Table Cells

Inlining form fields directly in table cells is no longer supported. This approach broke accessibility patterns and keyboard navigation as it created conflicting focus management between the table's row selection and form inputs.

**Migration Required:**

```typescript
// Before (old Table) - NOT ACCESSIBLE
<Table>
  <Table.Header>
    <Table.Column>Name</Table.Column>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        <TextField />  {/* This breaks keyboard navigation */}
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>

// After (new Table) - Use TableEditableCell
<Table>
  <Table.Header>
    <Table.Column>Name</Table.Column>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.EditableCell
        field={<TextField name="name" defaultValue={value} />}
        onSubmit={handleSubmit}
      >
        {value}
      </Table.EditableCell>
    </Table.Row>
  </Table.Body>
</Table>
```

### Cell Alignment Prop

The `align` prop on `Table.Column`, `Table.Cell`, and `Table.EditableCell` has been renamed to `alignX` for consistency with other Marigold layout components.

**Migration Required:**

```typescript
// Before
<Table.Column align="right">Balance</Table.Column>
<Table.Cell align="right">{value}</Table.Cell>

// After
<Table.Column alignX="right">Balance</Table.Column>
<Table.Cell alignX="right">{value}</Table.Cell>
```

### Column Width Values

Tailwind CSS width classes are no longer supported on `Table.Column`. Column widths now use pixel values or CSS grid units, which provides better content-fitting behavior and more predictable layouts.

**Migration Required:**

```typescript
// Before (old Table)
<Table.Column width="w-32">Name</Table.Column>
<Table.Column width="w-full">Description</Table.Column>

// After (new Table)
<Table.Column width="200px">Name</Table.Column>
<Table.Column width="1fr">Description</Table.Column>  {/* Default: 1fr */}
```

By default, columns use `1fr` as their width, which distributes available space evenly. You can now specify exact pixel widths for columns that need fixed sizing, or use CSS grid units like `2fr` for proportional layouts.

## New Features

The new `Table` component includes:

### Core Features
- **Enhanced Accessibility**: Built on react-aria with full ARIA pattern compliance, keyboard navigation, and screen reader support
- **Sorting**: Click column headers to sort ascending/descending with visual indicators (`SortAscending`, `SortDescending` icons)
- **Selection**: Single or multiple row selection with checkboxes and keyboard support
- **Row Actions**: Support for action menus and interactive elements within rows

### Advanced Features
- **Editable Cells**: Inline cell editing with `TableEditableCell` component supporting text inputs, selects, and custom editors
- **Drag and Drop**: Reorder rows with visual drag preview and drop indicators
- **Sticky Headers**: Keep table headers visible while scrolling through data
- **Empty States**: Built-in support for displaying empty state messages
- **Links**: Clickable cells and proper link handling within table rows

### Layout & Styling
- **Text Overflow Control**: Choose between truncation and wrapping for cell content
- **Text Selection**: Enable/disable text selection within table cells
- **Cell Alignment**: Flexible horizontal (`alignX`) and vertical (`verticalAlign`) text alignment options
- **Responsive Design**: Better handling of different viewport sizes
- **Column Width Control**: Support for fixed and flexible column widths

## New Components

This release adds several new subcomponents:

- `Table.Column` - Define table columns with sorting, alignment, and width options
- `Table.EditableCell` - Editable table cells with inline editing support
- `Table.SelectableCell` - Checkbox cells for row selection
- `Table.DragPreview` - Visual preview during drag operations
- `Table.DropIndicator` - Visual indicator for valid drop targets

## New Icons

- `Pencil` - Indicates editable cells
- `SortAscending` - Ascending sort indicator
- `SortDescending` - Descending sort indicator

## Theme Updates

- New theme styles for the modern `Table` component in `@marigold/theme-rui`
- Legacy `Table` styles preserved as `LegacyTable.styles.ts`
- Updated documentation theme (`@marigold/theme-docs`) with new Table styles

## Documentation

Comprehensive documentation updates including:
- Complete API reference with all new props and features
- Interactive demos for all features (sorting, selection, editing, drag-drop, etc.)
- Anatomy diagram showing component structure
- Migration guide from legacy Table
- Accessibility guidelines

## Backward Compatibility

The legacy `Table` component remains available at `@marigold/components/legacy` for backward compatibility. However, it is now considered deprecated and will receive maintenance updates only. We strongly recommend migrating to the new `Table` component to benefit from:

- Better accessibility and ARIA compliance
- Modern features (sorting, selection, editing)
- Improved performance
- Active development and new features
- Better React 19 compatibility

## Examples

### Basic Table
```tsx
<Table>
  <Table.Header>
    <Table.Column>Name</Table.Column>
    <Table.Column>Email</Table.Column>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>John Doe</Table.Cell>
      <Table.Cell>john@example.com</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

### Sortable Table
```tsx
<Table>
  <Table.Header>
    <Table.Column allowsSorting>Name</Table.Column>
    <Table.Column allowsSorting>Email</Table.Column>
  </Table.Header>
  <Table.Body>
    {/* rows */}
  </Table.Body>
</Table>
```

### Selectable Table
```tsx
<Table selectionMode="multiple">
  <Table.Header>
    <Table.Column>Name</Table.Column>
    <Table.Column>Email</Table.Column>
  </Table.Header>
  <Table.Body>
    {/* rows with selection */}
  </Table.Body>
</Table>
```

### Editable Table
```tsx
<Table>
  <Table.Header>
    <Table.Column>Name</Table.Column>
    <Table.Column>Email</Table.Column>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.EditableCell>{name => <TextField value={name} />}</Table.EditableCell>
      <Table.EditableCell>{email => <TextField value={email} />}</Table.EditableCell>
    </Table.Row>
  </Table.Body>
</Table>
```

## Technical Details

- Built on `react-aria-components` v1.5.0+
- Fully typed with TypeScript
- Comprehensive test coverage (unit + browser tests)
- Follows WCAG 2.1 AA accessibility standards
- Compatible with React 19
- Supports both controlled and uncontrolled modes
