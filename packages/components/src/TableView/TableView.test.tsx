import { render, screen } from '@testing-library/react';
import { TableView } from './TableView';

test('renders table element', () => {
  render(
    <TableView aria-label="Test table">
      <TableView.Header>
        <TableView.Column>Name</TableView.Column>
        <TableView.Column>Type</TableView.Column>
      </TableView.Header>
      <TableView.Body>
        <TableView.Row>
          <TableView.Cell>Item 1</TableView.Cell>
          <TableView.Cell>Type A</TableView.Cell>
        </TableView.Row>
        <TableView.Row>
          <TableView.Cell>Item 2</TableView.Cell>
          <TableView.Cell>Type B</TableView.Cell>
        </TableView.Row>
      </TableView.Body>
    </TableView>
  );

  const table = screen.getByRole('grid');
  expect(table instanceof HTMLTableElement).toBeTruthy();
});

test('renders column headers', () => {
  render(
    <TableView aria-label="Test table">
      <TableView.Header>
        <TableView.Column>Name</TableView.Column>
        <TableView.Column>Type</TableView.Column>
      </TableView.Header>
      <TableView.Body>
        <TableView.Row>
          <TableView.Cell>Item 1</TableView.Cell>
          <TableView.Cell>Type A</TableView.Cell>
        </TableView.Row>
      </TableView.Body>
    </TableView>
  );

  expect(
    screen.getByRole('columnheader', { name: 'Name' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('columnheader', { name: 'Type' })
  ).toBeInTheDocument();
});

test('renders table rows and cells', () => {
  render(
    <TableView aria-label="Test table">
      <TableView.Header>
        <TableView.Column>Name</TableView.Column>
      </TableView.Header>
      <TableView.Body>
        <TableView.Row>
          <TableView.Cell>Item 1</TableView.Cell>
        </TableView.Row>
        <TableView.Row>
          <TableView.Cell>Item 2</TableView.Cell>
        </TableView.Row>
      </TableView.Body>
    </TableView>
  );

  expect(screen.getByRole('row', { name: 'Item 1' })).toBeInTheDocument();
  expect(screen.getByRole('row', { name: 'Item 2' })).toBeInTheDocument();
});

test('has table element with proper role', () => {
  render(
    <TableView aria-label="Test table">
      <TableView.Header>
        <TableView.Column>Name</TableView.Column>
      </TableView.Header>
      <TableView.Body>
        <TableView.Row>
          <TableView.Cell>Item 1</TableView.Cell>
        </TableView.Row>
      </TableView.Body>
    </TableView>
  );

  expect(screen.getByRole('table')).toBeInTheDocument();
});

test('supports selection mode', () => {
  render(
    <TableView aria-label="Test table" selectionMode="multiple">
      <TableView.Header>
        <TableView.Column>Name</TableView.Column>
      </TableView.Header>
      <TableView.Body>
        <TableView.Row>
          <TableView.Cell>Item 1</TableView.Cell>
        </TableView.Row>
      </TableView.Body>
    </TableView>
  );

  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes.length).toBeGreaterThan(0);
});
