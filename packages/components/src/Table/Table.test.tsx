import { render, renderHook, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { theme } from '@marigold/theme-rui';
import { mockMatchMedia } from '../test.utils';
import { useTableContext } from './Context';
import { Table } from './Table';
import {
  Basic,
  ExpandableRows,
  ExpandableRowsDynamic,
  ExpandableRowsLazyChildren,
  FooterTotals,
  ScrollableAndSticky,
  VerticalAlignment,
  WidthsAndOverflow,
} from './Table.stories';
import { renderDragPreview } from './TableDragPreview';
import { TableDropIndicator, renderDropIndicator } from './TableDropIndicator';

const smallScreenQuery = `(width < ${theme.screens!.sm})`;

window.matchMedia = mockMatchMedia([smallScreenQuery]);

describe('Edge cell padding', () => {
  test('derives from --bleed-px only, never from --panel-px', () => {
    render(<Basic.Component />);

    const table = screen.getByRole('grid', { name: 'label' });

    // `--panel-px` inherits into non-bled content, so reading it would offset
    // those edge cells twice.
    expect(table.className).toContain(
      '[--cell-edge-padding:var(--bleed-px,var(--cell-x-padding))]'
    );
    expect(table.className).not.toContain('--panel-px');
  });
});

describe('Basic Rendering', () => {
  test('applies colspans to cells', () => {
    render(<WidthsAndOverflow.Component />);

    // eslint-disable-next-line testing-library/no-node-access
    const totalCell = screen.getByText('Total').closest('td');

    expect(totalCell).toBeInTheDocument();
    expect(totalCell).toHaveAttribute('colspan', '4');
  });
});

describe('Advanced Features', () => {
  test('renders scrollable table with sticky header', () => {
    render(<ScrollableAndSticky.Component />);

    const table = screen.getByRole('grid');

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

  test('applies alignY prop to cells', () => {
    render(<VerticalAlignment.Component />);

    const cells = screen.getAllByRole('gridcell');

    expect(cells[0]).toHaveClass('align-top');
  });

  test('defaults to middle vertical alignment', () => {
    render(<Basic.Component alignY={undefined} />);

    const cell = screen.getAllByRole('gridcell')[0];

    expect(cell).toHaveClass('align-middle');
  });
});

describe('Accessibility', () => {
  test('applies aria-label to table', () => {
    render(<Basic.Component />);

    const table = screen.getByRole('grid', { name: 'label' });

    expect(table).toBeInTheDocument();
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
    expect(cell).toHaveClass('align-middle');
    expect(cell).not.toHaveClass('wrap-break-word');
    expect(innerDiv).toHaveClass('text-left');
    expect(innerDiv).not.toHaveClass('align-middle');
    expect(innerDiv).toHaveClass('wrap-break-word');
  });
});

describe('Sticky Header', () => {
  test('applies sticky class to header', () => {
    render(<ScrollableAndSticky.Component />);

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

describe('Footer', () => {
  test('renders a semantic footer with the row content', () => {
    render(<FooterTotals.Component />);

    // eslint-disable-next-line testing-library/no-node-access
    const footer = screen.getByText('Total').closest('tfoot');

    expect(footer).toBeInTheDocument();
  });

  test('respects colSpan on footer cells', () => {
    render(<FooterTotals.Component />);

    // eslint-disable-next-line testing-library/no-node-access
    const totalCell = screen.getByText('Total').closest('td');

    expect(totalCell).toHaveAttribute('colspan', '4');
  });

  test('footer without sticky prop does not have sticky class', () => {
    render(<FooterTotals.Component />);

    // eslint-disable-next-line testing-library/no-node-access
    const footer = screen.getByText('Total').closest('tfoot');

    expect(footer).not.toHaveClass('sticky');
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

  test('Table has all drag and drop related exports', () => {
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

test('useTableContext throws outside Table', () => {
  expect(() => renderHook(() => useTableContext())).toThrow(
    'useTableContext must be used within a <Table> component'
  );
});

describe('Expandable rows', () => {
  const EXPAND_CONTROL = /expand|collapse/i;

  const rowOf = (text: string) =>
    // eslint-disable-next-line testing-library/no-node-access
    screen.getByText(text).closest('tr')!;

  test('setting treeColumn turns the table into a treegrid', () => {
    render(<ExpandableRows.Component />);

    expect(screen.getByRole('treegrid')).toBeInTheDocument();
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
  });

  test('a table without treeColumn stays a plain grid', () => {
    render(<Basic.Component />);

    expect(screen.getByRole('grid')).toBeInTheDocument();
    expect(screen.queryByRole('treegrid')).not.toBeInTheDocument();
  });

  test('group rows announce their collapsed state, leaf rows do not', () => {
    render(<ExpandableRows.Component />);

    expect(rowOf('Settlement run 1 Jul 2026')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(rowOf('CLR-10240')).not.toHaveAttribute('aria-expanded');
  });

  test('collapsed child rows are not rendered at all', () => {
    render(<ExpandableRows.Component />);

    expect(screen.queryByText('CLR-10231')).not.toBeInTheDocument();
  });

  test('expanded child rows are real rows with tree semantics', () => {
    render(<ExpandableRowsDynamic.Component />);

    // `defaultExpandedKeys` pre-expands the June settlement run.
    const child = rowOf('CLR-10188');

    expect(child).toHaveAttribute('aria-level', '2');
    expect(child).toHaveAttribute('aria-posinset', '1');
    expect(child).toHaveAttribute('aria-setsize', '3');
    expect(child).toHaveAttribute('data-level', '2');
  });

  test('exactly one cell per row is marked as the tree column', () => {
    render(<ExpandableRowsDynamic.Component />);

    const child = rowOf('CLR-10188');
    // eslint-disable-next-line testing-library/no-node-access
    const cells = Array.from(child.querySelectorAll('[data-tree-column]'));

    expect(cells).toHaveLength(1);
    expect(cells[0]).toHaveTextContent('CLR-10188');
  });

  test('Table.ExpandableRows renders nothing for a row without children', () => {
    render(<ExpandableRowsDynamic.Component />);

    // The standalone clearing has no `children`, so it stays a leaf.
    expect(rowOf('CLR-10240')).not.toHaveAttribute('aria-expanded');
    expect(rowOf('CLR-10240')).toHaveAttribute('aria-level', '1');
  });

  test('selecting a group row leaves its children alone', async () => {
    render(<ExpandableRowsDynamic.Component selectionMode="multiple" />);

    // June is pre-expanded, so its children are there to check.
    const group = rowOf('Settlement run 1 Jun 2026');
    await userEvent.click(within(group).getByRole('checkbox'));

    expect(group).toHaveAttribute('aria-selected', 'true');
    expect(rowOf('CLR-10188')).toHaveAttribute('aria-selected', 'false');
    // No partial state either: `mixed` would promise a cascade that we don't do.
    expect(
      within(rowOf('CLR-10188')).getByRole<HTMLInputElement>('checkbox')
        .indeterminate
    ).toBe(false);
  });

  test('select-all yields the all sentinel and covers collapsed rows', async () => {
    // Easy to get backwards: select-all never enumerates keys, so the rows
    // missing from the DOM are covered anyway.
    const onSelectionChange = vi.fn();
    render(
      <ExpandableRowsDynamic.Component
        selectionMode="multiple"
        onSelectionChange={onSelectionChange}
      />
    );

    await userEvent.click(
      screen.getByRole('checkbox', { name: /select all/i })
    );

    expect(onSelectionChange).toHaveBeenCalledWith('all');

    // July was collapsed while select-all ran.
    const collapsed = rowOf('Settlement run 1 Jul 2026');
    await userEvent.click(
      within(collapsed).getByRole('button', { name: EXPAND_CONTROL })
    );

    expect(rowOf('CLR-10231')).toHaveAttribute('aria-selected', 'true');
  });

  test('expandable drives both the visuals and aria-expanded', () => {
    // `hasChildItems` drives the visuals, `hasChildRows` drives `aria-expanded`
    // — see TableRow. Both have to survive.
    render(<ExpandableRowsLazyChildren.Component />);

    const row = rowOf('Settlement run 1 May 2026');

    expect(row).toHaveAttribute('aria-expanded', 'false');
    expect(row).toHaveAttribute('data-has-child-items', 'true');
  });
});
