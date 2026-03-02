import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Basic,
  ControlledTable,
  Empty,
  NestedColumns,
  Sorting,
  Static,
  WithAlignedColumns,
} from './Table.stories';

const user = userEvent.setup();

test('renders contents correctly', () => {
  render(<Basic.Component />);

  // Renders Header from Basic story
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Email')).toBeInTheDocument();

  // Renders Content from Basic story
  expect(screen.getByText('Hans Müller')).toBeInTheDocument();
  expect(screen.getByText('hans.mueller@example.de')).toBeInTheDocument();
});

test('renders empty state when collection is empty', () => {
  render(<Empty.Component />);

  expect(screen.getByText('No data available')).toBeInTheDocument();
});

test('renders no empty state when collection has items', async () => {
  render(<Basic.Component />);

  // Basic story has items, so there should be no empty state
  expect(screen.queryByText('No data available')).not.toBeInTheDocument();
  // And we should see actual data
  expect(screen.getByText('Hans Müller')).toBeInTheDocument();
});

test('renders table structure correctly', async () => {
  render(<ControlledTable.Component />);

  const table = screen.getAllByRole('grid');
  expect(table[0]).toBeInTheDocument();

  const [tableHead, tableBody] = within(table[0]).getAllByRole('rowgroup');
  expect(tableHead).toBeInTheDocument();
  expect(tableBody).toBeInTheDocument();

  const tableHeaderRow = within(tableHead).getByRole('row');
  expect(tableHeaderRow).toBeInTheDocument();

  const tableHeader = screen.getAllByRole('columnheader');
  expect(tableHeader.length).toBeGreaterThan(0);

  const tableRows = screen.getAllByRole('row');
  await user.click(tableRows[1]);
  expect(tableRows[1]).toHaveAttribute('aria-selected', 'true');

  const tableCells = screen.getAllByRole('gridcell');
  expect(tableCells.length).toBeGreaterThan(0);
});

test('supports selectionMode single', async () => {
  // ControlledTable story has selectionMode="multiple", but we can override it
  render(<Basic.Component selectionMode="single" />);

  const firstRow = screen.getAllByRole('row')[1];
  await user.click(firstRow);
  expect(firstRow).toHaveAttribute('aria-selected', 'true');
});

test('supports selectionMode multiple', async () => {
  // ControlledTable story has selectionMode="multiple"
  render(<ControlledTable.Component />);

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
  render(<NestedColumns.Component />);

  const nameHeader = screen.getByText('Name');
  expect(nameHeader).toHaveAttribute('colspan', '2');

  const informationHeader = screen.getByText('Information');
  expect(informationHeader).toHaveAttribute('colspan', '2');
});

test('sorting', async () => {
  render(<Sorting.Component />);

  const rows = screen.getAllByRole('row');

  // Initial order from Sorting story
  expect(rows[1].textContent).toContain('Luke Skywalker');

  // Get the Name column header
  const nameHeader = screen.getByRole('columnheader', { name: 'Name' });
  expect(nameHeader).toHaveAttribute('aria-sort', 'none');

  // Click on Name header to sort
  await user.click(nameHeader);

  // Verify aria-sort changed after clicking
  expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
});

test('allows to stretch to fit container', () => {
  render(<Basic.Component stretch />);

  const table = screen.getAllByRole('grid');
  expect(table[0]).toHaveClass(`w-full`);
});

test('supports non-interactive table', async () => {
  // Static story has selectionMode="none"
  render(<Static.Component />);

  const rows = screen.getAllByRole('row');

  expect(rows[1]).toHaveClass('cursor-text');
  expect(rows[2]).toHaveClass('cursor-text');
});

test('supports table columns alignment', () => {
  render(<WithAlignedColumns.Component />);

  // WithAlignedColumns story has Price and Ticket Number columns aligned right
  const priceHeader = screen.getByText('Price');
  const ticketHeader = screen.getByText('Ticket Number');

  expect(priceHeader).toHaveAttribute('align', 'right');
  expect(ticketHeader).toHaveAttribute('align', 'right');
});

test('cursor indicates interactivity', async () => {
  // Basic story with selectionMode and disabledKeys
  render(
    <Basic.Component
      selectionMode="single"
      disabledKeys={['fritz.schneider@example.de']}
    />
  );

  const rows = screen.getAllByRole('row');
  // First data row (Hans Müller) should be clickable
  expect(rows[1]).toHaveClass('cursor-pointer');
  // Second data row (Fritz Schneider) is disabled
  expect(rows[2]).toHaveClass('cursor-default');
});

test('Table cell mouse down will not be selectable', async () => {
  // Static story has selectionMode="none"
  render(<Static.Component />);

  const cell = screen.getByText('Potter');
  await user.pointer({ target: cell, keys: '[MouseLeft>]' });

  const row = screen.getAllByRole('row');
  expect(row[0]).not.toHaveAttribute('aria-selected');
});

test('Table cell pointer down will not be selectable', async () => {
  // Static story has selectionMode="none"
  render(<Static.Component />);

  const cell = screen.getByText('Potter');
  await user.pointer({ target: cell, keys: '[MouseLeft>]' });

  const row = screen.getAllByRole('row');
  expect(row[0]).not.toHaveAttribute('aria-selected');
});
