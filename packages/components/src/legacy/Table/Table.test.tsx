import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { SortDescriptor } from '@react-types/shared';
import { Theme, cva } from '@marigold/system';
import { setup } from '../../test.utils';
import { Table } from './Table';

const user = userEvent.setup();

// Setup
// ---------------
const theme: Theme = {
  name: 'test',
  components: {
    Checkbox: {
      checkbox: cva(),
      container: cva(),
      label: cva(),
      group: cva(),
    },
    LegacyTable: {
      table: cva('border-collapse'),
      thead: cva(),
      header: cva('p-4'),
      headerRow: cva('border-b'),
      body: cva('bg-white'),
      row: cva('bg-blue-700'),
      cell: cva('p-10'),
    },
    Field: cva(''),
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
        {column => <Table.Column key={column.key}>{column.name}</Table.Column>}
      </Table.Header>
      <Table.Body items={rows}>
        {item => (
          <Table.Row key={item.id}>
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

test('renders empty state when collection is empty', () => {
  render(
    <Table aria-label="Example table" emptyState={() => 'Empty'}>
      <Table.Header columns={columns}>
        {column => <Table.Column key={column.key}>{column.name}</Table.Column>}
      </Table.Header>
      <Table.Body>{[]}</Table.Body>
    </Table>
  );

  expect(screen.getByText('Empty')).toBeInTheDocument();
});

test('renders no empty state when collection has items', async () => {
  render(
    <Table aria-label="Example table" emptyState={() => 'Empty'}>
      <Table.Header columns={columns}>
        {column => <Table.Column key={column.key}>{column.name}</Table.Column>}
      </Table.Header>
      <Table.Body items={rows}>
        {item => (
          <Table.Row key={item.id}>
            {columnKey => <Table.Cell>{item[columnKey]}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );

  await expect(screen.findByText('Empty')).rejects.toThrow();
});

test('supports theme with parts', async () => {
  render(
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
  );

  const table = screen.getAllByRole('grid');
  expect(table[0]).toHaveClass('border-collapse');

  const [tableHead, tableBody] = within(table[0]).getAllByRole('rowgroup');

  const tableHeaderRow = within(tableHead).getByRole('row');
  expect(tableHeaderRow).toHaveClass('border-b');

  const tableHeader = screen.getAllByRole('columnheader');
  expect(tableHeader[0]).toHaveClass('p-4');

  expect(tableBody).toHaveClass('bg-white');

  const tableRows = screen.getAllByRole('row');
  await user.click(tableRows[1]);
  expect(tableRows[1]).toHaveClass('bg-blue-700');

  const tableCells = screen.getAllByRole('gridcell');
  expect(tableCells[0]).toHaveClass('p-10');
});

test('supports selectionMode single', async () => {
  render(
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
  );
  const firstRow = screen.getAllByRole('row')[1];
  await user.click(firstRow);
  expect(firstRow).toHaveAttribute('aria-selected', 'true');
  expect(firstRow).toHaveClass(`bg-blue-700`);
});

test('supports selectionMode multiple', async () => {
  render(
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
  );

  // select two rows
  const tableRows = screen.getAllByRole('row');
  await user.click(tableRows[1]);
  expect(tableRows[1]).toHaveAttribute('aria-selected', 'true');
  await user.click(tableRows[2]);
  expect(tableRows[2]).toHaveAttribute('aria-selected', 'true');

  // unselect one row
  await user.click(tableRows[1]);
  expect(tableRows[1]).toHaveAttribute('aria-selected', 'false');
});

test('supports colspans', () => {
  render(
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
  );

  const nameHeader = screen.getByText('Name');
  expect(nameHeader).toHaveAttribute('colspan', '2');

  const informationHeader = screen.getByText('Information');
  expect(informationHeader).toHaveAttribute('colspan', '2');
});

test('sorting', async () => {
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
    const [descriptor, setDescriptor] = useState<SortDescriptor>({
      column: '',
      direction: 'ascending',
    });
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
  await user.click(rows[0].firstChild! as Element);
  // eslint-disable-next-line testing-library/no-node-access
  await user.click(rows[0].firstChild! as Element);

  // eslint-disable-next-line testing-library/no-node-access
  const header = rows[0].querySelector('[aria-sort]');
  expect(header).toBeInTheDocument();
  expect(header?.textContent).toContain('Name');

  const sortedRows = screen.getAllByRole('row');
  expect(sortedRows[1].textContent).toContain('Orange');
  expect(sortedRows[2].textContent).toContain('Banana');
  expect(sortedRows[3].textContent).toContain('Apple');
});

test('allows to stretch to fit container', () => {
  render(
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

  expect(rows[1]).toHaveClass('cursor-text');
  expect(rows[2]).toHaveClass('cursor-text'); // Disabled, but still selectable text
});

test('supports table columns alignment', () => {
  render(
    <Table aria-label="Table columns alignment">
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column align="right">Age</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key="Alice">
          <Table.Cell>Alice</Table.Cell>
          <Table.Cell>30</Table.Cell>
        </Table.Row>
        <Table.Row key="Jane">
          <Table.Cell>Jane</Table.Cell>
          <Table.Cell>22</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );

  const ageNumber = screen.getByText('22');
  const ageHeader = screen.getByText('Age');

  expect(ageNumber).toHaveAttribute('align', 'right');
  expect(ageHeader).toHaveAttribute('align', 'right');
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
  expect(rows[1]).toHaveClass('cursor-pointer');
  expect(rows[2]).toHaveClass('cursor-default');
});

test('Table cell mouse down will not be selectable', async () => {
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
  await user.pointer({ target: cell, keys: '[MouseLeft>]' });

  const row = screen.getAllByRole('row');
  expect(row[0]).not.toHaveAttribute('aria-selected');
});

test('Table cell pointer down will not be selectable', async () => {
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
  await user.pointer({ target: cell, keys: '[MouseLeft>]' });

  const row = screen.getAllByRole('row');
  expect(row[0]).not.toHaveAttribute('aria-selected');
});
