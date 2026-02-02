import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import {
  Basic,
  CellOverrideTableTruncate,
  DragAndDrop,
  DynamicData,
  EditableCell,
  Empty,
  Links,
  ScrollableAndSticky,
  Sorting,
  VerticalAlignment,
  WidthsAndOverflow,
  WithActions,
} from './Table.stories';

const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

describe('Basic Rendering', () => {
  test('renders table element with proper structure', () => {
    render(<Basic.Component />);

    const table = screen.getByRole('grid');
    expect(table instanceof HTMLTableElement).toBeTruthy();
  });

  test('renders column headers', () => {
    render(<Basic.Component />);

    expect(
      screen.getByRole('columnheader', { name: 'Name' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Email' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Location' })
    ).toBeInTheDocument();
  });

  test('renders table rows with data', () => {
    render(<Basic.Component />);

    expect(screen.getByText('Hans Müller')).toBeInTheDocument();
    expect(screen.getByText('Fritz Schneider')).toBeInTheDocument();
  });

  test('applies colspans to cells', () => {
    render(<WidthsAndOverflow.Component />);

    const totalCell = screen.getByRole('gridcell', { name: 'Total' });
    expect(totalCell).toBeInTheDocument();
    expect(totalCell).toHaveAttribute('colspan', '4');
  });
});

describe('Data Handling', () => {
  test('supports dynamic data with selection mode', () => {
    render(<DynamicData.Component />);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);

    expect(screen.getByText('Harry')).toBeInTheDocument();
    expect(screen.getByText('Draco')).toBeInTheDocument();
  });

  test('displays empty state when no data', () => {
    render(<Empty.Component />);

    expect(screen.getByText('No results found.')).toBeInTheDocument();
    expect(
      screen.getByText('Try adjusting your search or filters.')
    ).toBeInTheDocument();
  });
});

describe('Column Configuration', () => {
  test('renders table with custom column widths', () => {
    render(<WidthsAndOverflow.Component />);

    expect(screen.getByText('Hans Müller')).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'ID' })
    ).toBeInTheDocument();
  });
});

describe('Interactions', () => {
  test('supports sorting with sortable columns', () => {
    render(<Sorting.Component />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    const sortableHeaders = screen
      .getAllByRole('columnheader')
      .filter(header => header.getAttribute('aria-sort') !== null);
    expect(sortableHeaders.length).toBeGreaterThan(0);
  });

  test('renders table with drag and drop support', () => {
    render(<DragAndDrop.Component />);

    expect(screen.getByText('Hans Müller')).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });
});

describe('Content', () => {
  test('renders table with action menus', () => {
    render(<WithActions.Component />);

    expect(screen.getByText('Hans Müller')).toBeInTheDocument();
    const actionMenus = screen.getAllByRole('button', { name: /Actions/i });
    expect(actionMenus.length).toBeGreaterThan(0);
  });

  test('renders table with clickable row links', () => {
    render(<Links.Component />);

    expect(screen.getByText('Marigold')).toBeInTheDocument();
    expect(screen.getByText('Reservix')).toBeInTheDocument();
  });
});

describe('Advanced Features', () => {
  test('renders scrollable table with sticky header', async () => {
    render(<ScrollableAndSticky.Component />);

    // Wait for the async data to load
    const table = await screen.findByRole('grid');
    expect(table).toBeInTheDocument();
  });
});

describe('Props and Variants', () => {
  test('applies variant class to table', () => {
    render(<Basic.Component />);

    const table = screen.getByRole('grid');

    expect(table).toHaveClass('group/table');
  });

  test('applies overflow prop to cells', () => {
    // WidthsAndOverflow story has a switch to toggle between wrap and truncate
    render(<WidthsAndOverflow.Component />);

    const cells = screen.getAllByRole('gridcell');
    // Story defaults to wrap mode
    expect(cells[0]).toHaveClass('wrap-break-word');
  });

  test('defaults to wrap overflow', () => {
    render(<Basic.Component />);

    const cell = screen.getAllByRole('gridcell')[0];
    expect(cell).toHaveClass('wrap-break-word');
  });

  test('applies verticalAlign prop to cells', () => {
    // VerticalAlignment story has verticalAlign="top"
    render(<VerticalAlignment.Component />);

    const cells = screen.getAllByRole('gridcell');
    // First cell should have align-top from table prop
    expect(cells[0]).toHaveClass('align-top');
  });

  test('defaults to middle vertical alignment', () => {
    // Basic story doesn't set verticalAlign, should default to middle
    render(<Basic.Component />);

    const cell = screen.getAllByRole('gridcell')[0];
    expect(cell).toHaveClass('align-middle');
  });

  test('cell-level verticalAlign overrides table-level', () => {
    // VerticalAlignment story has table verticalAlign="top" but second row first cell has verticalAlign="bottom"
    render(<VerticalAlignment.Component />);

    const cells = screen.getAllByRole('gridcell');
    // Second row first cell (index 2) should have align-bottom override
    expect(cells[2]).toHaveClass('align-bottom');
    expect(cells[2]).not.toHaveClass('align-top');
  });
});

describe('Accessibility', () => {
  test('applies aria-label to table', () => {
    render(<Basic.Component />);

    const table = screen.getByRole('grid', { name: 'label' });
    expect(table).toBeInTheDocument();
  });

  test('renders with selection mode multiple', () => {
    // DynamicData story has selectionMode="multiple"
    render(<DynamicData.Component />);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  test('uses grid role for table', () => {
    render(<Basic.Component />);

    const grid = screen.getByRole('grid');
    expect(grid).toBeInstanceOf(HTMLTableElement);
  });
});

describe('Cell Alignment', () => {
  test('aligns cell content to the right', () => {
    render(<Basic.Component />);

    const balanceCells = screen
      .getAllByRole('gridcell')
      .filter(cell => cell.textContent?.includes('€'));
    expect(balanceCells[0]).toHaveClass('text-right');
  });

  test('defaults to left alignment', () => {
    render(<Basic.Component />);

    const cells = screen.getAllByRole('gridcell');
    const nameCell = cells[0];
    expect(nameCell).toHaveClass('text-left');
  });
});

describe('Sticky Header', () => {
  test('applies sticky class to header', async () => {
    render(<ScrollableAndSticky.Component />);

    await screen.findByRole('grid');

    const columnHeader = screen.getByRole('columnheader', { name: 'ID' });
    // eslint-disable-next-line testing-library/no-node-access
    const header = columnHeader.closest('thead');
    expect(header).toHaveClass('sticky');
    expect(header).toHaveClass('top-0');
  });

  test('header without sticky prop does not have sticky class', () => {
    // Basic story does not have sticky header
    render(<Basic.Component />);

    const columnHeader = screen.getByRole('columnheader', { name: 'Name' });
    // eslint-disable-next-line testing-library/no-node-access
    const header = columnHeader.closest('thead');
    expect(header).not.toHaveClass('sticky');
  });
});

describe('EditableCell', () => {
  test('renders editable cell with edit button', () => {
    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    expect(editButtons.length).toBeGreaterThan(0);
  });

  test('renders cell content', () => {
    render(<EditableCell.Component />);

    expect(screen.getByText('Hans Müller')).toBeInTheDocument();
  });
});

describe('Cell-Level Overflow', () => {
  test('cell with overflow="wrap" overrides table default (truncate)', () => {
    render(<CellOverrideTableTruncate.Component />);

    const cells = screen.getAllByRole('gridcell');
    expect(cells[0]).toHaveClass('truncate');
    expect(cells[0]).toHaveClass('max-w-0');

    expect(cells[1]).toHaveClass('wrap-break-word');
    expect(cells[1]).not.toHaveClass('truncate');
  });
});
