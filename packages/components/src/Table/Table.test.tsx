import { fireEvent, screen } from '@testing-library/react';
import { useState } from 'react';

import { SortDescriptor } from '@react-types/shared';

import { Theme, cva } from '@marigold/system';

import { setup } from '../test.utils';
import { Table } from './Table';

// Setup
// ---------------
const theme: Theme = {
  name: 'test',
  components: {
    Checkbox: {
      checkbox: cva(),
      container: cva(),
      label: cva(),
    },
    Table: {
      table: cva('border-collapse'),
      header: cva('p-4'),
      row: cva('bg-blue-700 data-[disabled]:cursor-not-allowed'),
      cell: cva('p-10'),
    },
  },
};

const { render } = setup({ theme });

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
        {column => (
          <Table.Column isRowHeader id={(column as any).name}>
            {(column as any).name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rows}>
        {item => (
          <Table.Row id={(item as any).id}>
            <Table.Cell>{(item as any).name}</Table.Cell>
            <Table.Cell>{(item as any).firstname}</Table.Cell>
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
    <Table aria-label="Example table" selectionMode="single">
      <Table.Header columns={columns}>
        {column => (
          <Table.Column isRowHeader>{(column as any).name}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rows}>
        {item => (
          <Table.Row id={(item as any).id}>
            <Table.Cell>{(item as any).name}</Table.Cell>
            <Table.Cell>{(item as any).firstname}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
  const table = screen.getAllByRole('grid');
  expect(table[0]).toHaveClass(`border-collapse`);

  const tableHeader = screen.getAllByRole('columnheader');
  expect(tableHeader[0]).toHaveClass(`p-4`);

  const tableRows = screen.getAllByRole('row');
  fireEvent.click(tableRows[1]);
  expect(tableRows[1]).toHaveClass(`bg-blue-700`);

  const tableCells = screen.getAllByRole('gridcell');
  expect(tableCells[0]).toHaveClass(`p-10`);
});

test('supports selectionMode single', () => {
  render(
    <Table aria-label="Example table" selectionMode="single">
      <Table.Header columns={columns}>
        {column => (
          <Table.Column isRowHeader>{(column as any).name}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rows}>
        {item => (
          <Table.Row id={(item as any).id}>
            <Table.Cell>{(item as any).name}</Table.Cell>
            <Table.Cell>{(item as any).firstname}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
  const firstRow = screen.getAllByRole('row')[1];
  fireEvent.click(firstRow);
  expect(firstRow).toHaveAttribute('aria-selected', 'true');
  expect(firstRow).toHaveClass(`bg-blue-700`);
});

test('supports selectionMode multiple', () => {
  render(
    <Table aria-label="Example table" selectionMode="multiple">
      <Table.Header columns={columns}>
        {column => (
          <Table.Column isRowHeader>{(column as any).name}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rows}>
        {item => (
          <Table.Row id={(item as any).id}>
            <Table.Cell>{(item as any).name}</Table.Cell>
            <Table.Cell>{(item as any).firstname}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
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
    <Table aria-label="Example table for nested columns">
      <Table.Header>
        <Table.Column id="name" title="Name" isRowHeader>
          <Table.Column id="first" isRowHeader>
            First Name
          </Table.Column>
          <Table.Column id="last" isRowHeader>
            Last Name
          </Table.Column>
        </Table.Column>
        <Table.Column id="info" title="Information">
          <Table.Column id="age">Age</Table.Column>
          <Table.Column id="day">Birthday</Table.Column>
        </Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row id="sam">
          <Table.Cell id={1}>Sam</Table.Cell>
          <Table.Cell id={2}>Smith</Table.Cell>
          <Table.Cell id={3}>36</Table.Cell>
          <Table.Cell id={4}>May 3</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );

  const nameHeader = screen.getByText('Name');
  expect(nameHeader).toHaveAttribute('colspan', '2');

  const informationHeader = screen.getByText('Information');
  expect(informationHeader).toHaveAttribute('colspan', '2');
});

test('sorting', () => {
  const SortingTable = () => {
    const data = [
      {
        name: 'Apple',
        amount: 32,
      },
      { name: 'Orange', amount: 11 },
      { name: 'Banana', amount: 24 },
    ];
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
          <Table.Column id="name" isRowHeader allowsSorting>
            Name
          </Table.Column>
          <Table.Column id="amount" allowsSorting>
            Amount
          </Table.Column>
        </Table.Header>
        <Table.Body items={list}>
          {item => (
            <Table.Row id={(item as any).name}>
              <Table.Cell>{(item as any).name}</Table.Cell>
              <Table.Cell>{(item as any).amount}</Table.Cell>
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

  const cells = screen.getAllByRole('rowheader');
  expect(cells[0].textContent).toContain('Orange');
  expect(cells[1].textContent).toContain('Banana');
  expect(cells[2].textContent).toContain('Apple');
});

test('allows to stretch to fit container', () => {
  render(
    <Table aria-label="Streched table" stretch>
      <Table.Header>
        <Table.Column isRowHeader>Name</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Alice</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );

  const table = screen.getAllByRole('grid');
  expect(table[0]).toHaveClass(`w-full`);
});

test('supports non-interactive table', async () => {
  render(
    <Table
      aria-label="Non-interactive table"
      selectionMode="none"
      disabledKeys={['Jane']}
    >
      <Table.Header>
        <Table.Column isRowHeader>Name</Table.Column>
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

  expect(rows[1]).toHaveClass('cursor-text');
  expect(rows[2]).toHaveClass('cursor-text'); // Disabled, but still selectable text
});

test('cursor indicates interactivity', async () => {
  render(
    <Table
      aria-label="Interactive table"
      selectionMode="single"
      disabledKeys={['Jane']}
    >
      <Table.Header>
        <Table.Column isRowHeader>Name</Table.Column>
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

  expect(rows[1]).toHaveClass('cursor-pointer');
  expect(rows[2]).toHaveClass('data-[disabled]:cursor-not-allowed');
});

test('Table cell mouse down will not be selectable', () => {
  render(
    <Table aria-label="table" selectionMode="none">
      <Table.Header>
        <Table.Column isRowHeader>Name</Table.Column>
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
        <Table.Column isRowHeader>Name</Table.Column>
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
