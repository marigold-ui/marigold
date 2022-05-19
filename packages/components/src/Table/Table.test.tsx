import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Table } from './Table';

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

test('renders contens correctly', () => {
  render(
    <Table aria-label="Example table">
      <Table.Header columns={columns}>
        {column => <Table.Column>{column.name}</Table.Column>}
      </Table.Header>
      <Table.Body items={rows}>
        {item => (
          <Table.Row>
            {columnKey => <Table.Cell>{item[columnKey]}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );

  // Renders Header
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Firstname')).toBeInTheDocument();

  // Renders Content
  expect(screen.getByText('Potter')).toBeInTheDocument();
  expect(screen.getByText('Harry')).toBeInTheDocument();

  expect(screen.getByText('Malfoy')).toBeInTheDocument();
  expect(screen.getByText('Draco')).toBeInTheDocument();
});

test('supports theme with parts', () => {
  render(
    <ThemeProvider theme={theme}>
      <Table aria-label="Example table" selectionMode="single">
        <Table.Header columns={columns}>
          {column => <Table.Column>{column.name}</Table.Column>}
        </Table.Header>
        <Table.Body items={rows}>
          {item => (
            <Table.Row>
              {columnKey => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
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

test('supports selectionMode single', () => {
  render(
    <ThemeProvider theme={theme}>
      <Table aria-label="Example table" selectionMode="single">
        <Table.Header columns={columns}>
          {column => <Table.Column>{column.name}</Table.Column>}
        </Table.Header>
        <Table.Body items={rows}>
          {item => (
            <Table.Row>
              {columnKey => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
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
        <Table.Header columns={columns}>
          {column => <Table.Column>{column.name}</Table.Column>}
        </Table.Header>
        <Table.Body items={rows}>
          {item => (
            <Table.Row>
              {columnKey => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </ThemeProvider>
  );

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

test('supports colspans', () => {
  render(
    <ThemeProvider theme={theme}>
      <Table aria-label="Example table for nested columns">
        <Table.Header>
          <Table.Column title="Name">
            <Table.Column isRowHeader>First Name</Table.Column>
            <Table.Column isRowHeader>Last Name</Table.Column>
          </Table.Column>
          <Table.Column title="Information">
            <Table.Column>Age</Table.Column>
            <Table.Column>Birthday</Table.Column>
          </Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Sam</Table.Cell>
            <Table.Cell>Smith</Table.Cell>
            <Table.Cell>36</Table.Cell>
            <Table.Cell>May 3</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </ThemeProvider>
  );

  const nameHeader = screen.getByText('Name');
  expect(nameHeader).toHaveAttribute('colspan', '2');

  const informationHeader = screen.getByText('Information');
  expect(informationHeader).toHaveAttribute('colspan', '2');
});
