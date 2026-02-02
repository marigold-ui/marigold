---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

Introduce new `Table` component with improved features and accessibility.

This release adds a modern, accessible Table component built on react-aria. The new Table offers:

- Enhanced accessibility with ARIA patterns
- Sorting, selection, and row actions
- Editable cells with inline editing
- Drag and drop support
- Sticky headers
- Flexible text overflow handling (truncate/wrap)
- Text selection control

**Usage:**

```typescript
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

The legacy Table component remains available at `@marigold/components/legacy` for backward compatibility.
