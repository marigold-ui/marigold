import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { isAppleDevice } from '@react-aria/utils';
import { renderWithOverlay } from '../test.utils';
import {
  Basic,
  MoreWithoutPrefix,
  PreviousResultsWhileLoading,
} from './CommandPalette.stories';
import { press, typeChar } from './realEvents';

afterEach(() => {
  vi.restoreAllMocks();
});

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
    isAppleDevice() ? 'Meta+K' : 'Control+K'
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
});

// Typing without user-event, see `realEvents`. Each key in its own `act`, so
// React renders between them.
const type = (input: HTMLInputElement, text: string) => {
  for (const char of text) act(() => typeChar(input, char));
};

const pressEnter = (input: HTMLInputElement) => {
  act(() => press(input, 'keydown', 'Enter'));
  act(() => press(input, 'keyup', 'Enter'));
};

const pause = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

// The input points at the first row with `aria-activedescendant`.
const expectFirstRowActive = (name: string) =>
  waitFor(() => {
    const [first] = screen.getAllByRole('menuitem');
    expect(first).toHaveTextContent(name);
    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'aria-activedescendant',
      first.id
    );
  });

test('Enter runs the row on top after the previous rows went away', async () => {
  const user = userEvent.setup();
  const onAction = vi.fn();
  renderWithOverlay(
    <PreviousResultsWhileLoading.Component defaultOpen onAction={onAction} />
  );

  // A first search leaves its rows behind.
  let input = await screen.findByRole<HTMLInputElement>('searchbox');
  type(input, 'jazz');
  await expectFirstRowActive('Jazz Night');
  pressEnter(input);
  await waitFor(() => expect(onAction).toHaveBeenCalledWith('event-42'));
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());

  // The next search shows them until its answer replaces them.
  await user.click(screen.getByRole('button', { name: /go to|search/i }));
  input = await screen.findByRole<HTMLInputElement>('searchbox');
  type(input, 'ord');
  await waitFor(() =>
    expect(screen.queryByRole('menuitem', { name: /Jazz/ })).toBeNull()
  );

  // RAC points the input at a row 500ms after a keystroke.
  await pause(800);
  await expectFirstRowActive('Orders');
  pressEnter(input);
  await waitFor(() => expect(onAction).toHaveBeenLastCalledWith('orders'));
});

test('Enter while results load runs the first new row once and closes', async () => {
  const onAction = vi.fn();
  renderWithOverlay(
    <PreviousResultsWhileLoading.Component defaultOpen onAction={onAction} />
  );

  // Enter right after typing, before the answer arrives.
  const input = await screen.findByRole<HTMLInputElement>('searchbox');
  type(input, 'jazz');
  pressEnter(input);
  expect(onAction).not.toHaveBeenCalled();

  await waitFor(() => expect(onAction).toHaveBeenCalledWith('event-42'));
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  expect(onAction).toHaveBeenCalledTimes(1);
});

test('a pointer on a row drops an Enter that waits for results', async () => {
  const onAction = vi.fn();
  renderWithOverlay(
    <PreviousResultsWhileLoading.Component defaultOpen onAction={onAction} />
  );

  const input = await screen.findByRole<HTMLInputElement>('searchbox');
  type(input, 'jazz');
  pressEnter(input);
  const [row] = screen.getAllByRole('menuitem');
  act(() => {
    row.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }));
  });

  await screen.findByRole('menuitem', { name: /Jazz Night/ });
  await pause(300);
  expect(onAction).not.toHaveBeenCalled();
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});
