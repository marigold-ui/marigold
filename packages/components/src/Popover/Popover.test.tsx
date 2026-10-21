import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithOverlay } from '../test.utils';
import { Popover } from './Popover';
import { Basic, Notifications, SearchableList } from './Popover.stories';

const user = userEvent.setup();

test('renders only the trigger until opened', () => {
  renderWithOverlay(<Basic.Component />);

  expect(
    screen.getByRole('button', { name: 'Event details' })
  ).toBeInTheDocument();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('calls onOpenChange when the trigger is pressed', async () => {
  const onOpenChange = vi.fn();
  renderWithOverlay(<Basic.Component onOpenChange={onOpenChange} />);

  await user.click(screen.getByRole('button', { name: 'Event details' }));

  expect(onOpenChange).toHaveBeenCalledWith(true);
});

test('opens controlled via `open`', () => {
  renderWithOverlay(<Basic.Component open />);

  expect(
    screen.getByRole('dialog', { name: 'Summer Open Air' })
  ).toBeInTheDocument();
});

test('applies the width token to the dialog', () => {
  renderWithOverlay(<Notifications.Component open />);

  expect(screen.getByRole('dialog', { name: 'Notifications' })).toHaveAttribute(
    'data-large'
  );
});

test('labels the search field by its aria-label', () => {
  renderWithOverlay(<SearchableList.Component open />);

  expect(
    screen.getByRole('searchbox', { name: 'Search people' })
  ).toBeInTheDocument();
});

test('throws a helpful error outside of a <Popover>', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

  expect(() =>
    render(<Popover.Content aria-label="Orphan">Content</Popover.Content>)
  ).toThrow('Popover sub-components must be used within a <Popover>');

  spy.mockRestore();
});
