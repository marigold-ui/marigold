import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import {
  AllSelected,
  Basic,
  IntegratedWithTable,
  NoSelection,
  WithoutClearButton,
} from './ActionBar.stories';

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

// actionBar integration tests (using stories for theme provider)
test('Table with actionBar shows ActionBar when items selected', async () => {
  render(<IntegratedWithTable.Component />);

  // Select a row to trigger the ActionBar
  const row = screen.getByRole('row', { name: /Charizard/i });
  await user.click(row);

  expect(screen.getByText('1 selected')).toBeInTheDocument();
  expect(
    screen.getByRole('toolbar', { name: /bulk actions/i })
  ).toBeInTheDocument();
  expect(screen.getByText('Edit')).toBeInTheDocument();
});

test('clear selection hides ActionBar via actionBar', async () => {
  render(<IntegratedWithTable.Component />);

  // Select a row to trigger the ActionBar
  const row = screen.getByRole('row', { name: /Charizard/i });
  await user.click(row);

  // ActionBar should be visible
  expect(screen.getByText('1 selected')).toBeInTheDocument();

  // Click clear selection
  const clearButton = screen.getByRole('button', { name: /clear selection/i });
  await user.click(clearButton);

  // ActionBar should be hidden
  expect(
    screen.queryByRole('toolbar', { name: /bulk actions/i })
  ).not.toBeInTheDocument();
});
