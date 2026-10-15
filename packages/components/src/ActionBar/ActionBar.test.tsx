import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import {
  Basic,
  DisabledAndLoading,
  IntegratedWithTable,
  MenuLocalVariant,
  NoSelection,
  TableWithPagination,
  WithMenu,
  WithoutClearButton,
} from './ActionBar.stories';
import { useActionBar } from './useActionBar';

const user = userEvent.setup();

test('renders ActionBar with selected count', () => {
  render(<Basic.Component />);

  expect(screen.getByText('3 selected')).toBeInTheDocument();
});

test('renders ActionBar with "all" selected', () => {
  render(<Basic.Component selectedItemCount="all" />);

  expect(screen.getByText('All items selected')).toBeInTheDocument();
});

test('hides ActionBar when selectedItemCount is 0', () => {
  render(<NoSelection.Component />);

  const toolbar = screen.queryByRole('toolbar', { name: /bulk actions/i });

  expect(toolbar).not.toBeInTheDocument();
});

test('renders clear button when onClearSelection is provided', () => {
  render(<Basic.Component />);

  const clearButton = screen.getByRole('button', { name: /clear selection/i });

  expect(clearButton).toBeInTheDocument();
});

test('calls onClearSelection when clear button is clicked', async () => {
  const onClearSelection = vi.fn();

  render(<Basic.Component onClearSelection={onClearSelection} />);

  const clearButton = screen.getByRole('button', { name: /clear selection/i });
  await user.click(clearButton);

  expect(onClearSelection).toHaveBeenCalledTimes(1);
});

test('does not render clear button when onClearSelection is not provided', () => {
  render(<WithoutClearButton.Component />);

  const clearButton = screen.queryByRole('button', {
    name: /clear selection/i,
  });

  expect(clearButton).not.toBeInTheDocument();
});

test('renders action buttons', () => {
  render(<Basic.Component />);

  expect(screen.getByText('Edit')).toBeInTheDocument();
  expect(screen.getByText('Delete')).toBeInTheDocument();
});

test('has proper accessibility attributes', () => {
  render(<Basic.Component />);

  const toolbar = screen.getByRole('toolbar', { name: /bulk actions/i });

  expect(toolbar).toBeInTheDocument();
});

test('keeps aria-label on icon-only action buttons', () => {
  render(<NoSelection.Component selectedItemCount={3} />);

  expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
});

test('keeps an enabled action operable next to inactive ones', () => {
  render(<DisabledAndLoading.Component />);

  expect(screen.getByRole('button', { name: 'Edit' })).toBeEnabled();
});

test('renders a disabled action as not operable', () => {
  render(<DisabledAndLoading.Component />);

  expect(screen.getByRole('button', { name: 'Copy' })).toBeDisabled();
});

test('marks a loading action as pending rather than disabled', () => {
  render(<DisabledAndLoading.Component />);

  // Queried by state rather than by name: `loading` swaps the label for a
  // `visibility: hidden` copy, so a pending Button currently has *no*
  // accessible name (WCAG 4.1.2). That is a Button-level defect, tracked
  // separately — asserting the name here would lock the bug in.
  const pending = screen
    .getAllByRole('button')
    .find(button => button.hasAttribute('data-pending'))!;

  // `loading` maps to RAC's `isPending`, which keeps the button focusable and
  // marks it `aria-disabled` rather than removing it from the tree.
  expect(pending).toHaveAttribute('aria-disabled', 'true');
  expect(pending).toHaveAttribute('tabindex', '0');
});

test('a Menu trigger takes the cascaded ghost variant like a sibling Button', () => {
  render(<WithMenu.Component />);

  const button = screen.getByRole('button', { name: 'Edit' });
  const trigger = screen.getByRole('button', { name: 'More actions' });

  expect(button).toHaveClass('hover:ui-state-hover-ghost', 'h-control');
  expect(trigger).toHaveClass('hover:ui-state-hover-ghost', 'h-control');
  expect(trigger).not.toHaveClass('ui-soft');
});

test('a local Menu variant wins over the cascaded ghost', () => {
  render(<MenuLocalVariant.Component />);

  const trigger = screen.getByRole('button', { name: 'More actions' });

  expect(trigger).toHaveClass('ui-soft');
  expect(trigger).not.toHaveClass('hover:ui-state-hover-ghost');
});

test('calls onClearSelection when Escape is pressed', async () => {
  const onClearSelection = vi.fn();

  render(
    <Basic.Component
      selectedItemCount={3}
      onClearSelection={onClearSelection}
    />
  );

  // Focus the clear selection button inside the toolbar, then press Escape
  const clearButton = screen.getByRole('button', { name: /clear selection/i });

  act(() => clearButton.focus());
  await user.keyboard('{Escape}');

  expect(onClearSelection).toHaveBeenCalledTimes(1);
});

test('announces actions available for screen readers', () => {
  render(<Basic.Component />);

  const announcement = screen.getByRole('status');

  expect(announcement).toHaveTextContent('Actions available.');
});

// actionBar integration tests (using stories for theme provider)
test('Table with actionBar shows ActionBar when items selected', async () => {
  render(<IntegratedWithTable.Component />);

  // The story has 2 default selected keys, so ActionBar should already be visible
  expect(screen.getByText('2 selected')).toBeInTheDocument();
  expect(
    screen.getByRole('toolbar', { name: /bulk actions/i })
  ).toBeInTheDocument();
  expect(screen.getByText('Edit')).toBeInTheDocument();
});

// useActionBar hook tests
test('useActionBar returns empty Set when no args provided', () => {
  const { result } = renderHook(() => useActionBar({}));

  expect(result.current.selectedKeys).toEqual(new Set());
  expect(result.current.actionBarOverlay).toBeNull();
});

test('useActionBar initializes from defaultSelectedKeys', () => {
  const initial = new Set(['a', 'b']);
  const { result } = renderHook(() =>
    useActionBar({ defaultSelectedKeys: initial })
  );

  expect(result.current.selectedKeys).toEqual(new Set(['a', 'b']));
});

test('useActionBar uncontrolled state updates via onSelectionChange', () => {
  const { result } = renderHook(() => useActionBar({}));

  act(() => {
    result.current.onSelectionChange(new Set(['x']));
  });

  expect(result.current.selectedKeys).toEqual(new Set(['x']));
});

test('useActionBar controlled mode uses provided selectedKeys', () => {
  const controlled = new Set(['c']);
  const { result } = renderHook(() =>
    useActionBar({ selectedKeys: controlled })
  );

  expect(result.current.selectedKeys).toBe(controlled);

  // Calling onSelectionChange should NOT change selectedKeys in controlled mode
  act(() => {
    result.current.onSelectionChange(new Set(['d']));
  });

  expect(result.current.selectedKeys).toBe(controlled);
});

test('useActionBar fires onSelectionChange callback', () => {
  const onChange = vi.fn();
  const { result } = renderHook(() =>
    useActionBar({ onSelectionChange: onChange })
  );

  act(() => {
    result.current.onSelectionChange(new Set(['a']));
  });

  expect(onChange).toHaveBeenCalledWith(new Set(['a']));
});

test('useActionBar actionBarOverlay is non-null when actionBar prop is provided', () => {
  const { result } = renderHook(() =>
    useActionBar({ actionBar: () => <div>bar</div> })
  );

  expect(result.current.actionBarOverlay).not.toBeNull();
});

// Interactive Table integration tests
test('clicking a row checkbox increments selection count', async () => {
  render(<IntegratedWithTable.Component />);

  // Start with 2 selected
  expect(screen.getByText('2 selected')).toBeInTheDocument();

  // Find an unselected row checkbox and click it
  const checkboxes = screen.getAllByRole('checkbox');
  // First checkbox is select-all, then each row has a checkbox
  // Rows with pre-selected keys will already be checked
  const uncheckedCheckbox = checkboxes.find(
    cb => !(cb as HTMLInputElement).checked && cb !== checkboxes[0]
  )!;
  await user.click(uncheckedCheckbox);

  expect(screen.getByText('3 selected')).toBeInTheDocument();
});

test('deselecting all rows hides ActionBar', async () => {
  render(<IntegratedWithTable.Component />);

  expect(screen.getByText('2 selected')).toBeInTheDocument();

  // Find and uncheck the two pre-selected row checkboxes
  const checkboxes = screen.getAllByRole('checkbox');
  const checkedBoxes = checkboxes.filter(
    cb => (cb as HTMLInputElement).checked && cb !== checkboxes[0]
  );

  for (const cb of checkedBoxes) {
    await user.click(cb);
  }

  await waitFor(() =>
    expect(
      screen.queryByRole('toolbar', { name: /bulk actions/i })
    ).not.toBeInTheDocument()
  );
});

/* eslint-disable testing-library/no-node-access */
const getBar = (toolbar: HTMLElement) =>
  toolbar.closest('[data-actionbar]') as HTMLElement;
const getScroller = (el: HTMLElement) => {
  let node = el.parentElement;
  while (
    node &&
    node !== document.body &&
    !/auto|scroll/.test(getComputedStyle(node).overflowY)
  ) {
    node = node.parentElement;
  }
  return node!;
};
// The Table's content wrapper, which exposes no role.
const getTableContainer = () => screen.getByRole('grid').parentElement!;
/* eslint-enable testing-library/no-node-access */

// The gap the Table keeps between its last row and the bar.
const GAP = 8;

const nextFrame = () =>
  new Promise(resolve =>
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  );

// The room slides open and closed, so measure once it has stopped moving.
const waitForStableHeight = (el: HTMLElement) =>
  waitFor(async () => {
    const height = el.offsetHeight;
    await nextFrame();
    expect(el.offsetHeight).toBe(height);
  });

const TOOLBAR = { name: /bulk actions/i };

const queryToolbar = () => screen.queryByRole('toolbar', TOOLBAR);

const waitForBarToSettle = async () => {
  const toolbar = await screen.findByRole('toolbar', TOOLBAR);
  await waitFor(() =>
    expect(getBar(toolbar)).not.toHaveAttribute('data-entering')
  );
  return toolbar;
};

// Room only for the bar and its gap: the extra `paddingBottom` under the bar
// left an empty strip in the consumer's panel (DST-1813). Reopening is a
// regression check: the measurement used to sit in the outer `ActionBar`, which
// renders `null` while nothing is selected, so the observer never attached.
test('makes room for the ActionBar and its gap, also after it reopens', async () => {
  render(<IntegratedWithTable.Component />);

  const container = getTableContainer();
  // Within a pixel: browsers round layout heights differently.
  const expectRoom = (room: number, barHeight: number) =>
    expect(Math.abs(room - (barHeight + GAP))).toBeLessThanOrEqual(1);

  const barHeight = getBar(await waitForBarToSettle()).offsetHeight;
  await waitForStableHeight(container);
  const withBar = container.offsetHeight;

  await user.click(screen.getByRole('button', { name: /clear selection/i }));
  await waitFor(() => expect(queryToolbar()).not.toBeInTheDocument());
  await waitForStableHeight(container);
  const withoutBar = container.offsetHeight;

  await user.click(screen.getAllByRole('checkbox')[1]);
  const reopenedHeight = getBar(await waitForBarToSettle()).offsetHeight;
  await waitForStableHeight(container);

  expectRoom(withBar - withoutBar, barHeight);
  expectRoom(container.offsetHeight - withoutBar, reopenedHeight);
  expect(container.style.paddingBottom).toBe('');
});

test('keeps the last row clear of the ActionBar at the end of the scroll container', async () => {
  render(<IntegratedWithTable.Component />);

  const toolbar = await waitForBarToSettle();
  const scroller = getScroller(getBar(toolbar));

  scroller.scrollTop = scroller.scrollHeight;
  await nextFrame();

  const lastRow = screen.getAllByRole('row').at(-1)!;

  expect(lastRow.getBoundingClientRect().bottom).toBeLessThanOrEqual(
    getBar(toolbar).getBoundingClientRect().top
  );
});

test('scrolls a focused row clear of the pinned ActionBar', async () => {
  render(<IntegratedWithTable.Component />);

  const toolbar = await waitForBarToSettle();
  const firstUnchecked = screen
    .getAllByRole('checkbox')
    .slice(1)
    .find(cb => !(cb as HTMLInputElement).checked)!;

  await user.click(firstUnchecked);
  await user.keyboard('{ArrowRight}');

  for (let i = 0; i < 12; i++) {
    await user.keyboard('{ArrowDown}');
    await nextFrame();

    // eslint-disable-next-line testing-library/no-node-access
    const row = document.activeElement!.closest('[role="row"]')!;

    expect(row.getBoundingClientRect().bottom).toBeLessThanOrEqual(
      getBar(toolbar).getBoundingClientRect().top
    );
  }
});

test('never covers the content right after the table', async () => {
  render(<TableWithPagination.Component />);

  const toolbar = await waitForBarToSettle();
  const pagination = screen.getByRole('navigation');

  await waitFor(() =>
    expect(getBar(toolbar).getBoundingClientRect().bottom).toBeLessThanOrEqual(
      pagination.getBoundingClientRect().top
    )
  );
});

// Never pad the scroll container itself: a scroller's own padding shrinks the
// rectangle its sticky children pin to, which lifts the bar off the bottom.
test('keeps the ActionBar pinned to the bottom of the scroll container', async () => {
  render(<IntegratedWithTable.Component />);

  // The bar slides in on a transform. Wait for the entering flag to clear, then
  // measure once: this has to hold always, and a `waitFor` around the assertion
  // would pass on any single frame that happened to satisfy it.
  const sticky = getBar(await waitForBarToSettle());
  const scroller = getScroller(sticky);

  expect(scroller).not.toBe(document.body);

  scroller.scrollTop = 0;

  const barBox = sticky.getBoundingClientRect();
  const gap = scroller.getBoundingClientRect().bottom - barBox.bottom;

  expect(gap).toBeGreaterThanOrEqual(0);
  expect(gap).toBeLessThan(barBox.height);
});
