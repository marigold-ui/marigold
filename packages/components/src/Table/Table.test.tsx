import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  Table,
} from '@marigold/components';
import { ThemeProvider } from '@marigold/system';

// Setup
// ---------------
const theme = {
  space: {
    none: 'none',
    small: '4px',
    large: '16px',
  },
  ...{
    components: {
      Table: {
        base: {
          table: { borderCollapse: 'collapse' },
          header: {
            p: 'small',
          },
          row: { backgroundColor: 'blue' },
          cell: {
            p: 'large',
          },
        },
      },
    },
  },
};

const columns = [
  { name: 'Name', key: 'name' },
  { name: 'Firstname', key: 'firstname' },
];

const rows: { [key: string]: string }[] = [
  {
    id: '1',
    name: 'Potter',
    firstname: 'Harry',
  },
  {
    id: '2',
    name: 'Malfoy',
    firstname: 'Draco',
  },
];

test('supports parts from componentStyles', () => {
  render(
    <ThemeProvider theme={theme}>
      <Table aria-label="Example table" selectionMode="single">
        <TableHeader columns={columns}>
          {column => <Column>{column.name}</Column>}
        </TableHeader>
        <TableBody items={rows}>
          {item => <Row>{columnKey => <Cell>{item[columnKey]}</Cell>}</Row>}
        </TableBody>
      </Table>
    </ThemeProvider>
  );
  const table = screen.getAllByRole(/grid/);
  expect(table[0]).toHaveStyle(`border-collapse: collapse`);

  const tableHeader = screen.getAllByRole(/columnheader/);
  expect(tableHeader[0]).toHaveStyle(`padding: 4px`);

  const tableRows = screen.getAllByRole('row');
  fireEvent.click(tableRows[1]);
  expect(tableRows[1]).toHaveStyle(`background-color: blue`);

  const tableCells = screen.getAllByRole(/gridcell/);
  expect(tableCells[0]).toHaveStyle(`padding: 16px`);
});

test('supports default align prop', () => {
  render(
    <Table aria-label="Example table">
      <TableHeader columns={columns}>
        {column => <Column>{column.name}</Column>}
      </TableHeader>
      <TableBody items={rows}>
        {item => <Row>{columnKey => <Cell>{item[columnKey]}</Cell>}</Row>}
      </TableBody>
    </Table>
  );
  const tableCells = screen.getAllByRole(/rowheader/);
  expect(tableCells[0]).toHaveStyle(`textAlign: left`);
});

test('supports custom align prop center', () => {
  render(
    <Table aria-label="Example table" align="center">
      <TableHeader columns={columns}>
        {column => <Column>{column.name}</Column>}
      </TableHeader>
      <TableBody items={rows}>
        {item => <Row>{columnKey => <Cell>{item[columnKey]}</Cell>}</Row>}
      </TableBody>
    </Table>
  );
  const tableCells = screen.getAllByRole(/rowheader/);
  expect(tableCells[0]).toHaveStyle(`textAlign: center`);
});

test('supports custom align prop right', () => {
  render(
    <Table aria-label="Example table" align="right">
      <TableHeader columns={columns}>
        {column => <Column>{column.name}</Column>}
      </TableHeader>
      <TableBody items={rows}>
        {item => <Row>{columnKey => <Cell>{item[columnKey]}</Cell>}</Row>}
      </TableBody>
    </Table>
  );
  const tableCells = screen.getAllByRole(/rowheader/);
  expect(tableCells[0]).toHaveStyle(`textAlign: right`);
});

test('supports default alignHeader prop', () => {
  render(
    <Table aria-label="Example table">
      <TableHeader columns={columns}>
        {column => <Column>{column.name}</Column>}
      </TableHeader>
      <TableBody items={rows}>
        {item => <Row>{columnKey => <Cell>{item[columnKey]}</Cell>}</Row>}
      </TableBody>
    </Table>
  );
  const tableHeader = screen.getAllByRole(/columnheader/);
  expect(tableHeader[0]).toHaveStyle(`textAlign: left`);
});

test('supports custom alignHeader prop center', () => {
  render(
    <Table aria-label="Example table" alignHeader="center">
      <TableHeader columns={columns}>
        {column => <Column>{column.name}</Column>}
      </TableHeader>
      <TableBody items={rows}>
        {item => <Row>{columnKey => <Cell>{item[columnKey]}</Cell>}</Row>}
      </TableBody>
    </Table>
  );
  const tableHeader = screen.getAllByRole(/columnheader/);
  expect(tableHeader[0]).toHaveStyle(`textAlign: center`);
});

test('supports custom alignHeader prop right', () => {
  render(
    <Table aria-label="Example table" alignHeader="right">
      <TableHeader columns={columns}>
        {column => <Column>{column.name}</Column>}
      </TableHeader>
      <TableBody items={rows}>
        {item => <Row>{columnKey => <Cell>{item[columnKey]}</Cell>}</Row>}
      </TableBody>
    </Table>
  );
  const tableHeader = screen.getAllByRole(/columnheader/);
  expect(tableHeader[0]).toHaveStyle(`textAlign: right`);
});

test('supports selectionMode single', () => {
  render(
    <ThemeProvider theme={theme}>
      <Table aria-label="Example table" selectionMode="single">
        <TableHeader columns={columns}>
          {column => <Column>{column.name}</Column>}
        </TableHeader>
        <TableBody items={rows}>
          {item => <Row>{columnKey => <Cell>{item[columnKey]}</Cell>}</Row>}
        </TableBody>
      </Table>
    </ThemeProvider>
  );
  const firstRow = screen.getAllByRole('row')[1];
  fireEvent.click(firstRow);
  expect(firstRow).toHaveAttribute('aria-selected', 'true');
  expect(firstRow).toHaveStyle(`background-color: blue`);
});

test('supports selectionMode multiple', () => {
  render(
    <ThemeProvider theme={theme}>
      <Table aria-label="Example table" selectionMode="multiple">
        <TableHeader columns={columns}>
          {column => <Column>{column.name}</Column>}
        </TableHeader>
        <TableBody items={rows}>
          {item => <Row>{columnKey => <Cell>{item[columnKey]}</Cell>}</Row>}
        </TableBody>
      </Table>
    </ThemeProvider>
  );
  // Are the Checkboxes rendered?
  const tableHeaderCheckbox = screen.getAllByRole(/columnheader/)[0];
  // eslint-disable-next-line testing-library/no-node-access
  expect(tableHeaderCheckbox.firstChild instanceof HTMLInputElement).toBe(true);
  const tableRowCheckbox = screen.getAllByRole(/gridcell/)[0];
  // eslint-disable-next-line testing-library/no-node-access
  expect(tableRowCheckbox.firstChild instanceof HTMLInputElement).toBe(true);

  // select two rows
  const tableRows = screen.getAllByRole('row');
  fireEvent.click(tableRows[1]);
  expect(tableRows[1]).toHaveAttribute('aria-selected', 'true');
  fireEvent.click(tableRows[2]);
  expect(tableRows[2]).toHaveAttribute('aria-selected', 'true');

  // unselect one row
  fireEvent.click(tableRows[1]);
  expect(tableRows[1]).toHaveAttribute('aria-selected', 'false');
});
