import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import {
  Basic,
  IntegratedWithTable,
  NoSelection,
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

  clearButton.focus();
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

  expect(
    screen.queryByRole('toolbar', { name: /bulk actions/i })
  ).not.toBeInTheDocument();
});
