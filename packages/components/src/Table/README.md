# TableView

A table component for displaying data in rows and columns, built on top of `react-aria-components`' Table.

## Features

- Built on react-aria-components for excellent accessibility
- Keyboard navigation
- Row selection (single or multiple)
- Sortable columns
- Empty state support
- Dynamic content rendering

## Usage

### Basic Table

```tsx
import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  TableView,
} from '@marigold/components';

<TableView aria-label="Files">
  <TableHeader>
    <Column>Name</Column>
    <Column>Type</Column>
    <Column>Size</Column>
  </TableHeader>
  <TableBody>
    <Row>
      <Cell>document.pdf</Cell>
      <Cell>PDF</Cell>
      <Cell>2.5 MB</Cell>
    </Row>
    <Row>
      <Cell>image.png</Cell>
      <Cell>Image</Cell>
      <Cell>1.2 MB</Cell>
    </Row>
  </TableBody>
</TableView>;
```

### With Selection

```tsx
<TableView
  aria-label="Files"
  selectionMode="multiple"
  selectedKeys={selectedKeys}
  onSelectionChange={setSelectedKeys}
>
  <TableHeader>
    <Column>Name</Column>
    <Column>Type</Column>
  </TableHeader>
  <TableBody>
    <Row id="1">
      <Cell>document.pdf</Cell>
      <Cell>PDF</Cell>
    </Row>
  </TableBody>
</TableView>
```

### With Sorting

```tsx
<TableView aria-label="Files">
  <TableHeader>
    <Column allowsSorting>Name</Column>
    <Column allowsSorting>Type</Column>
  </TableHeader>
  <TableBody>
    <Row>
      <Cell>document.pdf</Cell>
      <Cell>PDF</Cell>
    </Row>
  </TableBody>
</TableView>
```

### Dynamic Content

```tsx
const files = [
  { id: 1, name: 'document.pdf', type: 'PDF' },
  { id: 2, name: 'image.png', type: 'Image' },
];

<TableView aria-label="Files">
  <TableHeader>
    <Column>Name</Column>
    <Column>Type</Column>
  </TableHeader>
  <TableBody items={files}>
    {item => (
      <Row id={item.id}>
        <Cell>{item.name}</Cell>
        <Cell>{item.type}</Cell>
      </Row>
    )}
  </TableBody>
</TableView>;
```

## Props

See [react-aria-components Table documentation](https://react-spectrum.adobe.com/react-aria/Table.html) for complete prop documentation.

## TODO

- Add styling variants (default, bordered, striped)
- Add size variants (small, medium, large)
- Add theme integration
