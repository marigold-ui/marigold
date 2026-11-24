import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { vi } from 'vitest';
import { isAppleDevice } from '@react-aria/utils';
import { renderWithOverlay } from '../test.utils';
import {
  AsyncSearch,
  Basic,
  MoreWithoutPrefix,
  PreviousResultsWhileLoading,
} from './CommandPalette.stories';

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

// Typing without user-event
// ---------------
// When the row the input points at goes away, RAC blurs the input (virtual
// focus) from an effect, then points the input at the next row. user-event
// answers the blur of an edited input with a `change` wrapped in `act`, which
// React rejects mid-commit ("Should not already be working"). The effect
// stops there, and the input keeps pointing at the row that is gone, which
// no browser does. This file never sets up user-event, so the keys here are
// real events: `beforeinput` tells RAC the text was typed forward, the native
// setter and `input` let React see the new value.
const setValue = Object.getOwnPropertyDescriptor(
  HTMLInputElement.prototype,
  'value'
)!.set!;

const press = (input: HTMLInputElement, type: string, key: string) =>
  input.dispatchEvent(
    new KeyboardEvent(type, { key, bubbles: true, cancelable: true })
  );

const type = (input: HTMLInputElement, text: string) => {
  for (const char of text) {
    act(() => {
      press(input, 'keydown', char);
      input.dispatchEvent(
        new InputEvent('beforeinput', {
          inputType: 'insertText',
          data: char,
          bubbles: true,
          cancelable: true,
        })
      );
      setValue.call(input, input.value + char);
      input.dispatchEvent(
        new InputEvent('input', {
          inputType: 'insertText',
          data: char,
          bubbles: true,
        })
      );
      press(input, 'keyup', char);
    });
  }
};

const deleteBackward = (input: HTMLInputElement) =>
  act(() => {
    press(input, 'keydown', 'Backspace');
    input.dispatchEvent(
      new InputEvent('beforeinput', {
        inputType: 'deleteContentBackward',
        bubbles: true,
        cancelable: true,
      })
    );
    setValue.call(input, input.value.slice(0, -1));
    input.dispatchEvent(
      new InputEvent('input', {
        inputType: 'deleteContentBackward',
        bubbles: true,
      })
    );
    press(input, 'keyup', 'Backspace');
  });

const arrowDown = (input: HTMLInputElement) => {
  act(() => press(input, 'keydown', 'ArrowDown'));
  act(() => press(input, 'keyup', 'ArrowDown'));
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
  fireEvent.click(screen.getByRole('button', { name: /go to|search/i }));
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

test('keeps the first result active as async results change', async () => {
  renderWithOverlay(<AsyncSearch.Component />);
  fireEvent.click(screen.getByRole('button', { name: /search characters/i }));
  const input = await screen.findByRole<HTMLInputElement>('searchbox');

  // Typing activates the first result.
  type(input, 'r2');
  await expectFirstRowActive('R2-D2');

  // Deleting activates the first of the new results.
  deleteBackward(input);
  await expectFirstRowActive('Luke Skywalker');

  // New results reset a row that was moved down.
  arrowDown(input);
  arrowDown(input);
  await waitFor(() =>
    expect(input).toHaveAttribute(
      'aria-activedescendant',
      screen.getAllByRole('menuitem')[2].id
    )
  );
  type(input, '5');
  await expectFirstRowActive('R5-D4');
});
