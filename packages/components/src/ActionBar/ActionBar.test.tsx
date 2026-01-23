import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import {
  AllSelected,
  Basic,
  NoSelection,
  WithoutClearButton,
} from './ActionBar.stories';

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

test('calls onClearSelection when clear button is clicked', () => {
  const onClearSelection = vi.fn();

  render(<Basic.Component onClearSelection={onClearSelection} />);

  const clearButton = screen.getByRole('button', { name: /clear selection/i });
  fireEvent.click(clearButton);

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
