import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { vi } from 'vitest';
import { renderWithOverlay } from '../test.utils';
import { Popover } from './Popover';
import { Basic, SearchableList } from './Popover.stories';

const user = userEvent.setup();

test('renders only the trigger until opened', () => {
  renderWithOverlay(<Basic.Component />);

  expect(
    screen.getByRole('button', { name: 'Show event details' })
  ).toBeInTheDocument();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('opens on press and is named by its title', async () => {
  renderWithOverlay(<Basic.Component />);

  await user.click(screen.getByRole('button', { name: 'Show event details' }));

  expect(
    screen.getByRole('dialog', { name: 'Summer Open Air' })
  ).toBeInTheDocument();
});

test('forwards the ref to the dialog', async () => {
  const ref = createRef<HTMLElement>();
  renderWithOverlay(<Basic.Component ref={ref} />);

  await user.click(screen.getByRole('button', { name: 'Show event details' }));

  expect(ref.current).toBe(
    screen.getByRole('dialog', { name: 'Summer Open Air' })
  );
});

test('labels the search field by its aria-label', async () => {
  renderWithOverlay(<SearchableList.Component />);

  await user.click(screen.getByRole('button', { name: 'Manage team' }));

  expect(
    screen.getByRole('searchbox', { name: 'Search team members' })
  ).toBeInTheDocument();
});

test('throws a helpful error for a part outside of a <Popover>', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

  expect(() => render(<Popover.Content>Content</Popover.Content>)).toThrow(
    'Popover sub-components must be used within a <Popover>'
  );

  spy.mockRestore();
});
