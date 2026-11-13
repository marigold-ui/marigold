import { render, screen, within } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithOverlay } from '../test.utils';
import { Basic, MoreWithoutPrefix } from './CommandPalette.stories';

test('opens by default with defaultOpen', async () => {
  renderWithOverlay(<Basic.Component defaultOpen />);

  expect(
    await screen.findByRole('dialog', { name: 'Command palette' })
  ).toBeInTheDocument();
});

test('the trigger announces the shortcut', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('button', { name: /go to/i })).toHaveAttribute(
    'aria-keyshortcuts',
    expect.stringMatching(/^(Meta|Control)\+K$/)
  );
});

test('the trigger hides the hint when the shortcut is disabled', () => {
  render(<Basic.Component shortcut={false} />);

  const trigger = screen.getByRole('button', { name: /go to/i });
  expect(trigger).not.toHaveAttribute('aria-keyshortcuts');
  expect(within(trigger).queryByText(/⌘K|Ctrl\+K/)).toBeNull();
});

test('warns when a group sets more without a prefix', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  renderWithOverlay(<MoreWithoutPrefix.Component defaultOpen />);

  await screen.findByRole('menuitem', { name: 'Jazz Night' });
  expect(warn).toHaveBeenCalledWith(
    expect.stringContaining('sets `more` without a `prefix`')
  );
  expect(screen.queryByRole('menuitem', { name: /More events/ })).toBeNull();
  warn.mockRestore();
});
