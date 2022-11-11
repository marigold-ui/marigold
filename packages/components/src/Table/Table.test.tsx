import React, { useState } from 'react';
import { SortDescriptor } from '@react-types/shared';
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

test('sorting', () => {
  const data = [
    {
      name: 'Apple',
      amount: 32,
    },
    { name: 'Orange', amount: 11 },
    { name: 'Banana', amount: 24 },
  ];

  const SortingTable = () => {
    const [list, setList] = useState(data);
    const [descriptor, setDescriptor] = useState<SortDescriptor>({});
    const sort = ({ column, direction }: SortDescriptor) => {
      const result = list.sort((a: any, b: any) => {
        const first = a[column!];
        const second = b[column!];
        let cmp =
          (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
        if (direction === 'descending') {
          cmp *= -1;
        }
        return cmp;
      });
      setDescriptor({ column, direction });
      setList(result);
    };

    return (
      <Table
        aria-label="Example table with client side sorting"
        sortDescriptor={descriptor}
        onSortChange={sort}
      >
        <Table.Header>
          <Table.Column key="name" allowsSorting>
            Name
          </Table.Column>
          <Table.Column key="amount" allowsSorting>
            Amount
          </Table.Column>
        </Table.Header>
        <Table.Body items={list}>
          {item => (
            <Table.Row key={item.name}>
              {columnKey => <Table.Cell>{(item as any)[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  };

  render(<SortingTable />);

  const rows = screen.getAllByRole('row');

  // Unsorted
  expect(rows[1].textContent).toContain('Apple');
  expect(rows[2].textContent).toContain('Orange');
  expect(rows[3].textContent).toContain('Banana');

  // Sort by name
  // eslint-disable-next-line testing-library/no-node-access
  fireEvent.click(rows[0].firstChild!);
  // eslint-disable-next-line testing-library/no-node-access
  fireEvent.click(rows[0].firstChild!);

  // eslint-disable-next-line testing-library/no-node-access
  const header = rows[0].querySelector('[aria-sort]');
  expect(header).toBeInTheDocument();
  expect(header?.textContent).toContain('Name');

  const sortedRows = screen.getAllByRole('row');
  expect(sortedRows[1].textContent).toContain('Orange');
  expect(sortedRows[2].textContent).toContain('Banana');
  expect(sortedRows[3].textContent).toContain('Apple');
});

test('allows to strecht to fit container', () => {
  render(
    <ThemeProvider theme={theme}>
      <Table aria-label="Streched table" stretch>
        <Table.Header>
          <Table.Column>Name</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Alice</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </ThemeProvider>
  );

  const table = screen.getAllByRole(/grid/);
  expect(table[0]).toHaveStyle(`width: 100%`);
});

test('supports non-interactive table', async () => {
  render(
    <Table
      aria-label="Non-interactive table"
      selectionMode="none"
      disabledKeys={['Jane']}
    >
      <Table.Header>
        <Table.Column>Name</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key="Alice">
          <Table.Cell>Alice</Table.Cell>
        </Table.Row>
        <Table.Row key="Jane">
          <Table.Cell>Jane</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );

  const rows = screen.getAllByRole('row');
  expect(rows[1]).toHaveStyle('cursor: text');
  expect(rows[2]).toHaveStyle('cursor: text'); // Disabled, but still selectable text
});

test('cursor indicates interactivity', async () => {
  render(
    <Table
      aria-label="Interactive table"
      selectionMode="single"
      disabledKeys={['Jane']}
    >
      <Table.Header>
        <Table.Column>Name</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key="Alice">
          <Table.Cell>Alice</Table.Cell>
        </Table.Row>
        <Table.Row key="Jane">
          <Table.Cell>Jane</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );

  const rows = screen.getAllByRole('row');
  expect(rows[1]).toHaveStyle('cursor: pointer');
  expect(rows[2]).toHaveStyle('cursor: default');
});

test('Table cell mouse down will not be selectable', () => {
  render(
    <Table aria-label="table" selectionMode="none">
      <Table.Header>
        <Table.Column>Name</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key="Alice">
          <Table.Cell key="cell">Alice</Table.Cell>
        </Table.Row>
        <Table.Row key="Jane">
          <Table.Cell>Jane</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );

  const cell = screen.getByText('Alice');
  fireEvent.mouseDown(cell);

  const row = screen.getAllByRole('row');
  expect(row[0]).not.toHaveAttribute('aria-selected');
});

test('Table cell pointer down will not be selectable', () => {
  render(
    <Table aria-label="table" selectionMode="none">
      <Table.Header>
        <Table.Column>Name</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key="Alice">
          <Table.Cell key="cell">Alice</Table.Cell>
        </Table.Row>
        <Table.Row key="Jane">
          <Table.Cell>Jane</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );

  const cell = screen.getByText('Alice');
  fireEvent.pointerDown(cell);

  const row = screen.getAllByRole('row');
  expect(row[0]).not.toHaveAttribute('aria-selected');
});
