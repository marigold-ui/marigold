import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Table } from './Table';
import {
  Basic,
  DragAndDrop,
  DragPreview,
  DynamicData,
  Empty,
  Links,
  ScrollableAndSticky,
  Sorting,
  VerticalAlignment,
  WidthsAndOverflow,
  WithActions,
} from './Table.stories';
import { renderDragPreview } from './TableDragPreview';
import { TableDropIndicator, renderDropIndicator } from './TableDropIndicator';

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

    // eslint-disable-next-line testing-library/no-node-access
    const totalCell = screen.getByText('Total').closest('td');

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

    const sortableHeaders = screen
      .getAllByRole('columnheader')
      .filter(header => header.getAttribute('aria-sort') !== null);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(sortableHeaders.length).toBeGreaterThan(0);
  });

  test('renders table with drag and drop support', () => {
    render(<DragAndDrop.Component />);

    const checkboxes = screen.getAllByRole('checkbox');

    expect(screen.getByText('Hans Müller')).toBeInTheDocument();
    expect(checkboxes.length).toBeGreaterThan(0);
  });
});

describe('Content', () => {
  test('renders table with action menus', () => {
    render(<WithActions.Component />);

    const actionMenus = screen.getAllByRole('button', { name: /Actions/i });

    expect(screen.getByText('Hans Müller')).toBeInTheDocument();
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
    render(<WidthsAndOverflow.Component />);

    const cells = screen.getAllByRole('gridcell');
    // eslint-disable-next-line testing-library/no-node-access
    const innerDiv = cells[0].querySelector('div');

    expect(innerDiv).toHaveClass('wrap-break-word');
  });

  test('defaults to wrap overflow', () => {
    render(<Basic.Component />);

    const cell = screen.getAllByRole('gridcell')[0];
    // eslint-disable-next-line testing-library/no-node-access
    const innerDiv = cell.querySelector('div');

    expect(innerDiv).toHaveClass('wrap-break-word');
  });

  test('applies verticalAlign prop to cells', () => {
    render(<VerticalAlignment.Component />);

    const cells = screen.getAllByRole('gridcell');
    // eslint-disable-next-line testing-library/no-node-access
    const innerDiv = cells[0].querySelector('div');

    expect(innerDiv).toHaveClass('align-top');
  });

  test('defaults to middle vertical alignment', () => {
    render(<Basic.Component />);

    const cell = screen.getAllByRole('gridcell')[0];
    // eslint-disable-next-line testing-library/no-node-access
    const innerDiv = cell.querySelector('div');

    expect(innerDiv).toHaveClass('align-middle');
  });

  test('cell-level verticalAlign overrides table-level', () => {
    render(<VerticalAlignment.Component verticalAlign="top" />);

    // eslint-disable-next-line testing-library/no-node-access
    const overrideCell = screen.getByText('Override').closest('td');
    // eslint-disable-next-line testing-library/no-node-access
    const innerDiv = overrideCell?.querySelector('div');

    expect(innerDiv).toHaveClass('align-bottom');
    expect(innerDiv).not.toHaveClass('align-top');
  });
});

describe('Accessibility', () => {
  test('applies aria-label to table', () => {
    render(<Basic.Component />);

    const table = screen.getByRole('grid', { name: 'label' });

    expect(table).toBeInTheDocument();
  });

  test('renders with selection mode multiple', () => {
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
    // eslint-disable-next-line testing-library/no-node-access
    const innerDiv = balanceCells[0].querySelector('div');

    expect(innerDiv).toHaveClass('text-right');
  });

  test('defaults to left alignment', () => {
    render(<Basic.Component />);

    const cells = screen.getAllByRole('gridcell');
    const nameCell = cells[0];
    // eslint-disable-next-line testing-library/no-node-access
    const innerDiv = nameCell.querySelector('div');

    expect(innerDiv).toHaveClass('text-left');
  });

  test('outer cell retains only theme classes, inner div has styling classes', () => {
    render(<Basic.Component />);

    const cell = screen.getAllByRole('gridcell')[0];
    // eslint-disable-next-line testing-library/no-node-access
    const innerDiv = cell.querySelector('div');

    expect(cell).not.toHaveClass('text-left');
    expect(cell).not.toHaveClass('align-middle');
    expect(cell).not.toHaveClass('wrap-break-word');
    expect(innerDiv).toHaveClass('text-left');
    expect(innerDiv).toHaveClass('align-middle');
    expect(innerDiv).toHaveClass('wrap-break-word');
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
    render(<Basic.Component />);

    const columnHeader = screen.getByRole('columnheader', { name: 'Name' });
    // eslint-disable-next-line testing-library/no-node-access
    const header = columnHeader.closest('thead');

    expect(header).not.toHaveClass('sticky');
  });
});

describe('TableDragPreview Component', () => {
  test('renders single item with text and count', () => {
    render(<DragPreview.Component />);

    const counters = screen.getAllByText('1');

    expect(screen.getByText('Single Item')).toBeInTheDocument();
    expect(counters.length).toBeGreaterThan(0);
  });

  test('renders multiple items with first item text and count', () => {
    render(<DragPreview.Component />);

    const items = screen.getAllByText('Item 1');
    const counters = screen.getAllByText('3');

    expect(items.length).toBeGreaterThan(0);
    expect(counters.length).toBeGreaterThan(0);
  });

  test('shows fallback text when text/plain is empty or missing', () => {
    render(<DragPreview.Component />);

    const fallbackTexts = screen.getAllByText(/items/i);

    expect(fallbackTexts.length).toBeGreaterThan(0);
  });
});

describe('renderDragPreview Hook', () => {
  test('returns TableDragPreview component for multiple items', () => {
    const items = [{ 'text/plain': 'Item 1' }, { 'text/plain': 'Item 2' }];

    const preview = renderDragPreview!(items);

    expect(preview).not.toBeUndefined();
    expect(preview).toBeTruthy();
  });

  test('returns undefined for single item to use default preview', () => {
    const items = [{ 'text/plain': 'Single Item' }];

    const preview = renderDragPreview!(items);

    expect(preview).toBeUndefined();
  });

  test('returns undefined for empty items array', () => {
    const items: Record<string, string>[] = [];

    const preview = renderDragPreview!(items);

    expect(preview).toBeUndefined();
  });

  test('handles two items correctly', () => {
    const items = [{ 'text/plain': 'First' }, { 'text/plain': 'Second' }];

    const preview = renderDragPreview!(items);

    expect(preview).not.toBeUndefined();
    expect(preview).toBeTruthy();
  });

  test('handles large number of items', () => {
    const items = Array.from({ length: 100 }, (_, i) => ({
      'text/plain': `Item ${i + 1}`,
    }));

    const preview = renderDragPreview!(items);

    expect(preview).not.toBeUndefined();
    expect(preview).toBeTruthy();
  });

  test('returns component for multiple items with mixed properties', () => {
    const items: Record<string, string>[] = [
      { 'text/plain': 'Item 1', 'application/json': '{}' },
      { 'text/plain': 'Item 2', 'text/html': '<div></div>' },
      { 'application/json': '[]' },
    ];

    const preview = renderDragPreview!(items);

    expect(preview).not.toBeUndefined();
    expect(preview).toBeTruthy();
  });

  test('boundary case: exactly one item returns undefined', () => {
    const items = [{ 'text/plain': 'Only One', other: 'data' }];

    const preview = renderDragPreview!(items);

    expect(preview).toBeUndefined();
  });

  test('boundary case: exactly two items returns component', () => {
    const items = [{ 'text/plain': 'First' }, { 'text/plain': 'Second' }];

    const preview = renderDragPreview!(items);

    expect(preview).not.toBeUndefined();
  });
});

describe('TableDropIndicator Integration', () => {
  test('renders in drag and drop table', () => {
    render(<DragAndDrop.Component />);

    const table = screen.getByRole('grid');

    expect(table).toBeInTheDocument();
  });

  test('table uses renderDropIndicator for drag and drop', () => {
    render(<DragAndDrop.Component />);

    const rows = screen.getAllByRole('row');
    const dataRows = rows.slice(1);

    expect(dataRows[0]).toHaveAttribute('draggable', 'true');
  });
});

describe('renderDropIndicator Hook', () => {
  test('returns TableDropIndicator component', () => {
    const target = {
      type: 'item' as const,
      key: '1',
      dropPosition: 'before' as const,
    };

    const dropIndicator = renderDropIndicator!(target);

    expect(dropIndicator).toBeDefined();
    expect(dropIndicator.type).toBe(TableDropIndicator);
  });

  test('passes target prop correctly', () => {
    const target = {
      type: 'item' as const,
      key: 'test-key',
      dropPosition: 'before' as const,
    };

    const dropIndicator = renderDropIndicator!(target);

    expect(dropIndicator.props.target).toEqual(target);
  });

  test('handles different target types', () => {
    const itemTarget = {
      type: 'item' as const,
      key: '1',
      dropPosition: 'before' as const,
    };
    const rootTarget = { type: 'root' as const };

    const dropIndicator1 = renderDropIndicator!(itemTarget);
    const dropIndicator2 = renderDropIndicator!(rootTarget);

    expect(dropIndicator1.props.target).toEqual(itemTarget);
    expect(dropIndicator2.props.target).toEqual(rootTarget);
  });

  test('handles target with dropPosition', () => {
    const target = {
      type: 'item' as const,
      key: '1',
      dropPosition: 'before' as const,
    };

    const dropIndicator = renderDropIndicator!(target);

    expect(dropIndicator.props.target).toEqual(target);
  });

  test('creates React element with correct structure', () => {
    const target = {
      type: 'item' as const,
      key: 'test-id',
      dropPosition: 'after' as const,
    };

    const dropIndicator = renderDropIndicator!(target);

    expect(dropIndicator).toHaveProperty('type');
    expect(dropIndicator).toHaveProperty('props');
    expect(dropIndicator.props).toHaveProperty('target');
  });

  test('returned element has target property in props', () => {
    const target = {
      type: 'item' as const,
      key: 'complex-key',
      dropPosition: 'after' as const,
    };

    const dropIndicator = renderDropIndicator!(target);

    expect(dropIndicator.props.target.type).toBe('item');
    expect(dropIndicator.props.target.key).toBe('complex-key');
    expect(dropIndicator.props.target.dropPosition).toBe('after');
  });
});

describe('Table Static Properties - Drop Indicator', () => {
  test('Table.renderDropIndicator is accessible', () => {
    expect(Table.renderDropIndicator).toBeDefined();
    expect(typeof Table.renderDropIndicator).toBe('function');
  });

  test('Table.renderDropIndicator matches renderDropIndicator export', () => {
    expect(Table.renderDropIndicator).toBe(renderDropIndicator);
  });

  test('Table.DropIndicator component is accessible', () => {
    expect(Table.DropIndicator).toBeDefined();
    expect(Table.DropIndicator).toBe(TableDropIndicator);
  });

  test('Table has all drag and drop related exports', () => {
    expect(Table.DropIndicator).toBeDefined();
    expect(Table.DragPreview).toBeDefined();
    expect(Table.renderDropIndicator).toBeDefined();
    expect(Table.renderDragPreview).toBeDefined();
  });
});

describe('renderDropIndicator Function Signature', () => {
  test('accepts item target with key and dropPosition', () => {
    const dropIndicator = renderDropIndicator!({
      type: 'item',
      key: '123',
      dropPosition: 'before',
    });

    expect(dropIndicator).toBeDefined();
  });

  test('accepts root target without key', () => {
    const dropIndicator = renderDropIndicator!({ type: 'root' });

    expect(dropIndicator).toBeDefined();
  });

  test('preserves all target properties', () => {
    const complexTarget = {
      type: 'item' as const,
      key: 'item-1',
      dropPosition: 'before' as const,
    };

    const dropIndicator = renderDropIndicator!(complexTarget);

    expect(dropIndicator.props.target).toStrictEqual(complexTarget);
  });
});
