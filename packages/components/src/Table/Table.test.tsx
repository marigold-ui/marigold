import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Table } from './Table';
import {
  Basic,
  CellOverrideTableTruncate,
  DragAndDrop,
  DragPreview,
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

  test('opens editing UI when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });
  });

  test('closes editing UI after clicking save', async () => {
    const user = userEvent.setup();
    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
    });
  });

  test('closes editing UI after clicking cancel', async () => {
    const user = userEvent.setup();
    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
    });
  });

  test('edits and saves cell value', async () => {
    const user = userEvent.setup();
    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText('Name');
    await user.clear(nameInput);
    await user.type(nameInput, 'New Name');

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('New Name')).toBeInTheDocument();
    });
  });

  test('canceling edit does not save changes', async () => {
    const user = userEvent.setup();
    render(<EditableCell.Component />);

    const originalName = screen.getByText('Hans Müller');
    expect(originalName).toBeInTheDocument();

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText('Name');
    await user.clear(nameInput);
    await user.type(nameInput, 'Changed Name');

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);

    await waitFor(() => {
      expect(screen.getByText('Hans Müller')).toBeInTheDocument();
      expect(screen.queryByText('Changed Name')).not.toBeInTheDocument();
    });
  });

  test('can edit email field', async () => {
    const user = userEvent.setup();
    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    // Email is the second editable cell (index 1)
    await user.click(editButtons[1]);

    await waitFor(() => {
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    const emailInput = screen.getByLabelText('Email');
    await user.clear(emailInput);
    await user.type(emailInput, 'newemail@example.com');

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('newemail@example.com')).toBeInTheDocument();
    });
  });

  test('can edit status field with Select', async () => {
    const user = userEvent.setup();
    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    // Status is the third editable cell (index 2 since location is not editable)
    await user.click(editButtons[2]);

    await waitFor(() => {
      expect(screen.getByLabelText('Status')).toBeInTheDocument();
    });

    // Verify Select is rendered
    const statusSelect = screen.getByLabelText('Status');
    expect(statusSelect).toBeInTheDocument();
  });

  test('small screen shows text buttons in dialog', async () => {
    const user = userEvent.setup();
    // Small screen is already set by default mockMatchMedia at ['(max-width: 600px)']
    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    // On small screens, buttons show text
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
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

describe('TableDragPreview Component', () => {
  test('renders single item with text and count', () => {
    render(<DragPreview.Component />);

    expect(screen.getByText('Single Item')).toBeInTheDocument();
    const counters = screen.getAllByText('1');
    expect(counters.length).toBeGreaterThan(0);
  });

  test('renders multiple items with first item text and count', () => {
    render(<DragPreview.Component />);

    const items = screen.getAllByText('Item 1');
    expect(items.length).toBeGreaterThan(0);
    const counters = screen.getAllByText('3');
    expect(counters.length).toBeGreaterThan(0);
  });

  test('shows fallback text when text/plain is empty or missing', () => {
    render(<DragPreview.Component />);

    const fallbackTexts = screen.getAllByText(/items/i);
    // Should have at least 1 fallback text (either empty text or no text/plain)
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

    // Verify the table has drag and drop functionality
    const rows = screen.getAllByRole('row');
    const dataRows = rows.slice(1); // Skip header row
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
    const dropIndicator1 = renderDropIndicator!(itemTarget);
    expect(dropIndicator1.props.target).toEqual(itemTarget);

    const rootTarget = { type: 'root' as const };
    const dropIndicator2 = renderDropIndicator!(rootTarget);
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

    // Verify it's a valid React element
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
