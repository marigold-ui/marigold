import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { ActionBar } from './ActionBar';

test('renders ActionBar with selected count', () => {
  render(
    <ActionBar selectedItemCount={3}>
      <ActionBar.Button>Edit</ActionBar.Button>
    </ActionBar>
  );

  expect(screen.getByText('3 selected')).toBeInTheDocument();
});

test('renders ActionBar with "all" selected', () => {
  render(
    <ActionBar selectedItemCount="all">
      <ActionBar.Button>Edit</ActionBar.Button>
    </ActionBar>
  );

  expect(screen.getByText('All items selected')).toBeInTheDocument();
});

test('hides ActionBar when selectedItemCount is 0', () => {
  const { container } = render(
    <ActionBar selectedItemCount={0}>
      <ActionBar.Button>Edit</ActionBar.Button>
    </ActionBar>
  );

  expect(container.firstChild).toBeNull();
});

test('renders clear button when onClearSelection is provided', () => {
  const onClearSelection = vi.fn();

  render(
    <ActionBar selectedItemCount={2} onClearSelection={onClearSelection}>
      <ActionBar.Button>Edit</ActionBar.Button>
    </ActionBar>
  );

  const clearButton = screen.getByRole('button', { name: /clear selection/i });
  expect(clearButton).toBeInTheDocument();
});

test('calls onClearSelection when clear button is clicked', () => {
  const onClearSelection = vi.fn();

  render(
    <ActionBar selectedItemCount={2} onClearSelection={onClearSelection}>
      <ActionBar.Button>Edit</ActionBar.Button>
    </ActionBar>
  );

  const clearButton = screen.getByRole('button', { name: /clear selection/i });
  fireEvent.click(clearButton);

  expect(onClearSelection).toHaveBeenCalledTimes(1);
});

test('does not render clear button when onClearSelection is not provided', () => {
  render(
    <ActionBar selectedItemCount={2}>
      <ActionBar.Button>Edit</ActionBar.Button>
    </ActionBar>
  );

  const clearButton = screen.queryByRole('button', {
    name: /clear selection/i,
  });
  expect(clearButton).not.toBeInTheDocument();
});

test('renders action buttons', () => {
  render(
    <ActionBar selectedItemCount={2}>
      <ActionBar.Button>Edit</ActionBar.Button>
      <ActionBar.Button>Delete</ActionBar.Button>
    </ActionBar>
  );

  expect(screen.getByText('Edit')).toBeInTheDocument();
  expect(screen.getByText('Delete')).toBeInTheDocument();
});

test('calls action button onPress handler', () => {
  const onPress = vi.fn();

  render(
    <ActionBar selectedItemCount={1}>
      <ActionBar.Button onPress={onPress}>Edit</ActionBar.Button>
    </ActionBar>
  );

  const button = screen.getByText('Edit');
  fireEvent.click(button);

  expect(onPress).toHaveBeenCalledTimes(1);
});

test('supports emphasized variant', () => {
  const { container } = render(
    <ActionBar selectedItemCount={2} isEmphasized>
      <ActionBar.Button>Edit</ActionBar.Button>
    </ActionBar>
  );

  const toolbar = container.querySelector('[role="toolbar"]');
  expect(toolbar).toHaveAttribute('data-emphasized');
});

test('has proper accessibility attributes', () => {
  render(
    <ActionBar selectedItemCount={2}>
      <ActionBar.Button>Edit</ActionBar.Button>
    </ActionBar>
  );

  const toolbar = screen.getByRole('toolbar', { name: /bulk actions/i });
  expect(toolbar).toBeInTheDocument();
});
