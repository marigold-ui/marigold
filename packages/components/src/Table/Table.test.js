import React, { useState } from 'react';
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
const rows = [
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
    React.createElement(
      Table,
      { 'aria-label': 'Example table' },
      React.createElement(Table.Header, { columns: columns }, column =>
        React.createElement(Table.Column, null, column.name)
      ),
      React.createElement(Table.Body, { items: rows }, item =>
        React.createElement(Table.Row, null, columnKey =>
          React.createElement(Table.Cell, null, item[columnKey])
        )
      )
    )
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
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Table,
        { 'aria-label': 'Example table', selectionMode: 'single' },
        React.createElement(Table.Header, { columns: columns }, column =>
          React.createElement(Table.Column, null, column.name)
        ),
        React.createElement(Table.Body, { items: rows }, item =>
          React.createElement(Table.Row, null, columnKey =>
            React.createElement(Table.Cell, null, item[columnKey])
          )
        )
      )
    )
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
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Table,
        { 'aria-label': 'Example table', selectionMode: 'single' },
        React.createElement(Table.Header, { columns: columns }, column =>
          React.createElement(Table.Column, null, column.name)
        ),
        React.createElement(Table.Body, { items: rows }, item =>
          React.createElement(Table.Row, null, columnKey =>
            React.createElement(Table.Cell, null, item[columnKey])
          )
        )
      )
    )
  );
  const firstRow = screen.getAllByRole('row')[1];
  fireEvent.click(firstRow);
  expect(firstRow).toHaveAttribute('aria-selected', 'true');
  expect(firstRow).toHaveStyle(`background-color: blue`);
});
test('supports selectionMode multiple', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Table,
        { 'aria-label': 'Example table', selectionMode: 'multiple' },
        React.createElement(Table.Header, { columns: columns }, column =>
          React.createElement(Table.Column, null, column.name)
        ),
        React.createElement(Table.Body, { items: rows }, item =>
          React.createElement(Table.Row, null, columnKey =>
            React.createElement(Table.Cell, null, item[columnKey])
          )
        )
      )
    )
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
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Table,
        { 'aria-label': 'Example table for nested columns' },
        React.createElement(
          Table.Header,
          null,
          React.createElement(
            Table.Column,
            { title: 'Name' },
            React.createElement(
              Table.Column,
              { isRowHeader: true },
              'First Name'
            ),
            React.createElement(
              Table.Column,
              { isRowHeader: true },
              'Last Name'
            )
          ),
          React.createElement(
            Table.Column,
            { title: 'Information' },
            React.createElement(Table.Column, null, 'Age'),
            React.createElement(Table.Column, null, 'Birthday')
          )
        ),
        React.createElement(
          Table.Body,
          null,
          React.createElement(
            Table.Row,
            null,
            React.createElement(Table.Cell, null, 'Sam'),
            React.createElement(Table.Cell, null, 'Smith'),
            React.createElement(Table.Cell, null, '36'),
            React.createElement(Table.Cell, null, 'May 3')
          )
        )
      )
    )
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
    const [descriptor, setDescriptor] = useState({});
    const sort = ({ column, direction }) => {
      const result = list.sort((a, b) => {
        const first = a[column];
        const second = b[column];
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
    return React.createElement(
      Table,
      {
        'aria-label': 'Example table with client side sorting',
        sortDescriptor: descriptor,
        onSortChange: sort,
      },
      React.createElement(
        Table.Header,
        null,
        React.createElement(
          Table.Column,
          { key: 'name', allowsSorting: true },
          'Name'
        ),
        React.createElement(
          Table.Column,
          { key: 'amount', allowsSorting: true },
          'Amount'
        )
      ),
      React.createElement(Table.Body, { items: list }, item =>
        React.createElement(Table.Row, { key: item.name }, columnKey =>
          React.createElement(Table.Cell, null, item[columnKey])
        )
      )
    );
  };
  render(React.createElement(SortingTable, null));
  const rows = screen.getAllByRole('row');
  // Unsorted
  expect(rows[1].textContent).toContain('Apple');
  expect(rows[2].textContent).toContain('Orange');
  expect(rows[3].textContent).toContain('Banana');
  // Sort by name
  // eslint-disable-next-line testing-library/no-node-access
  fireEvent.click(rows[0].firstChild);
  // eslint-disable-next-line testing-library/no-node-access
  fireEvent.click(rows[0].firstChild);
  // eslint-disable-next-line testing-library/no-node-access
  const header = rows[0].querySelector('[aria-sort]');
  expect(header).toBeInTheDocument();
  expect(
    header === null || header === void 0 ? void 0 : header.textContent
  ).toContain('Name');
  const sortedRows = screen.getAllByRole('row');
  expect(sortedRows[1].textContent).toContain('Orange');
  expect(sortedRows[2].textContent).toContain('Banana');
  expect(sortedRows[3].textContent).toContain('Apple');
});
test('allows to strecht to fit container', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Table,
        { 'aria-label': 'Streched table', stretch: true },
        React.createElement(
          Table.Header,
          null,
          React.createElement(Table.Column, null, 'Name')
        ),
        React.createElement(
          Table.Body,
          null,
          React.createElement(
            Table.Row,
            null,
            React.createElement(Table.Cell, null, 'Alice')
          )
        )
      )
    )
  );
  const table = screen.getAllByRole(/grid/);
  expect(table[0]).toHaveStyle(`width: 100%`);
});
//# sourceMappingURL=Table.test.js.map
