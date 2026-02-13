import { render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import {
  AllSelected,
  Basic,
  NoSelection,
  WithoutClearButton,
} from './ActionBar.stories';
import { useActionBarTrigger } from './useActionBarTrigger';

const user = userEvent.setup();

test('renders ActionBar with selected count', () => {
  render(<Basic.Component />);

  expect(screen.getByText('3 selected')).toBeInTheDocument();
});

test('renders ActionBar with "all" selected', () => {
  render(<AllSelected.Component />);

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

// useActionBarTrigger hook tests
test('useActionBarTrigger: uncontrolled - starts with empty selection', () => {
  const { result } = renderHook(() => useActionBarTrigger());

  expect(result.current.selectedItemCount).toBe(0);
  expect(result.current.isOpen).toBe(false);
});

test('useActionBarTrigger: uncontrolled - starts with defaultSelectedKeys', () => {
  const { result } = renderHook(() =>
    useActionBarTrigger({ defaultSelectedKeys: new Set(['1', '2']) })
  );

  expect(result.current.selectedItemCount).toBe(2);
  expect(result.current.isOpen).toBe(true);
});

test('useActionBarTrigger: uncontrolled - onSelectionChange updates state', () => {
  const { result } = renderHook(() => useActionBarTrigger());

  act(() => {
    result.current.onSelectionChange(new Set(['1', '2', '3']));
  });

  expect(result.current.selectedItemCount).toBe(3);
  expect(result.current.isOpen).toBe(true);
});

test('useActionBarTrigger: clearSelection resets selection', () => {
  const { result } = renderHook(() =>
    useActionBarTrigger({ defaultSelectedKeys: new Set(['1']) })
  );

  expect(result.current.isOpen).toBe(true);

  act(() => {
    result.current.clearSelection();
  });

  expect(result.current.selectedItemCount).toBe(0);
  expect(result.current.isOpen).toBe(false);
});

test('useActionBarTrigger: controlled - uses provided selectedKeys', () => {
  const { result } = renderHook(() =>
    useActionBarTrigger({ selectedKeys: new Set(['1', '2']) })
  );

  expect(result.current.selectedItemCount).toBe(2);
  expect(result.current.isOpen).toBe(true);
});

test('useActionBarTrigger: controlled - calls onSelectionChange callback', () => {
  const onSelectionChange = vi.fn();
  const { result } = renderHook(() =>
    useActionBarTrigger({
      selectedKeys: new Set(['1']),
      onSelectionChange,
    })
  );

  act(() => {
    result.current.onSelectionChange(new Set(['1', '2']));
  });

  expect(onSelectionChange).toHaveBeenCalledWith(new Set(['1', '2']));
});

test('useActionBarTrigger: handles "all" selection', () => {
  const { result } = renderHook(() =>
    useActionBarTrigger({ selectedKeys: 'all' })
  );

  expect(result.current.selectedItemCount).toBe('all');
  expect(result.current.isOpen).toBe(true);
});
