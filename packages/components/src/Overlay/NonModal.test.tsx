import { render, screen } from '@testing-library/react';
import type { UserEvent } from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import {
  Button,
  Dialog,
  DialogTrigger,
  Pressable,
} from 'react-aria-components';
import { vi } from 'vitest';
import { OverlayContainerProvider } from '../Provider';
import type { NonModalProps } from './NonModal';
import { NonModal } from './NonModal';

let user: UserEvent;
let onPressOutie: jest.Mock;

beforeEach(() => {
  // @ts-ignore
  onPressOutie = vi.fn();
  user = userEvent.setup();
});

const Component = (props: NonModalProps) => (
  <>
    <Button onPress={onPressOutie}>Outie</Button>
    <DialogTrigger>
      <Button>Toggle</Button>
      <NonModal {...props}>
        <Dialog>
          <p>Non-modal</p>
          <Button slot="close">Close</Button>
        </Dialog>
      </NonModal>
    </DialogTrigger>
    <input type="text" data-testid="input" />
  </>
);

test('renders nothing if isOpen is not set', function () {
  render(<Component />);
  expect(screen.queryByRole('dialog')).toBeNull();
});

test('works with a dialog', async () => {
  render(<Component />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeInTheDocument();

  const close = screen.getByRole('button', { name: 'Close' });
  await user.click(close);

  expect(dialog).not.toBeInTheDocument();
});

test('handles focus', async () => {
  render(<Component />);

  const button = screen.getByRole('button', { name: 'Toggle' });

  await user.tab();
  await user.tab();
  expect(button).toHaveFocus();

  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveFocus();
});

test('does not close when clicked outside', async () => {
  render(<Component />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeInTheDocument();

  await user.click(document.body);
  expect(dialog).toBeInTheDocument();
});

test('can be closed with esc key', async () => {
  render(<Component />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeInTheDocument();

  await user.keyboard('{Escape}');
  expect(dialog).not.toBeInTheDocument();
});

test('disable closing via esc key', async () => {
  render(<Component keyboardDismissable={false} />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeInTheDocument();

  await user.keyboard('{Escape}');
  expect(dialog).toBeInTheDocument();
});

test('can be closed using the dialog close button', async () => {
  render(<Component />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeInTheDocument();

  const close = screen.getByRole('button', { name: 'Close' });
  await user.click(close);

  expect(dialog).not.toBeInTheDocument();
});

test('able to interact with elements when non-modal is open', async () => {
  render(<Component />);

  const toggle = screen.getByRole('button', { name: 'Toggle' });
  await user.click(toggle);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeInTheDocument();

  const outie = screen.getByRole('button', { name: 'Outie' });
  await user.click(outie);

  expect(onPressOutie).toHaveBeenCalled();

  const input = screen.getByTestId('input');
  await user.type(input, 'hello');

  expect(input).toHaveValue('hello');

  // Still open!
  expect(dialog).toBeInTheDocument();
});

test('supports render props', async () => {
  render(
    <DialogTrigger>
      <Button />
      <NonModal>
        {({ state }) => (
          <Dialog>Dialog is {state.isOpen ? 'open' : 'closed'}</Dialog>
        )}
      </NonModal>
    </DialogTrigger>
  );

  const button = screen.getByRole('button');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveTextContent('Dialog is open');
});

test('isOpen and defaultOpen override state from context', async () => {
  const onOpenChange = vi.fn();

  render(
    <>
      <DialogTrigger>
        <Button />
        <NonModal defaultOpen onOpenChange={onOpenChange}>
          <Dialog>A non-modal Dialog</Dialog>
        </NonModal>
      </DialogTrigger>
    </>
  );

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveTextContent('A non-modal Dialog');

  await user.keyboard('{Escape}');
  expect(dialog).not.toBeInTheDocument();

  expect(onOpenChange).toHaveBeenCalledTimes(1);
  expect(onOpenChange).toHaveBeenCalledWith(false);
});

test('supports isEntering and isExiting props', async () => {
  const { rerender } = render(<Component isEntering />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  const popover = screen
    .getByRole('dialog')
    .closest('.react-aria-NonModalOverlay');
  expect(popover).toHaveAttribute('data-entering');

  rerender(<Component />);
  expect(popover).not.toHaveAttribute('data-entering');

  rerender(<Component isExiting />);
  await user.click(button);

  expect(popover).toBeInTheDocument();
  expect(popover).toHaveAttribute('data-exiting');

  rerender(<Component />);
  expect(popover).not.toBeInTheDocument();
});

test('supports custom portal container', async () => {
  render(
    <>
      <OverlayContainerProvider value="custom-container">
        <DialogTrigger>
          <Button>Toggle</Button>
          <NonModal>
            <Dialog>
              <p>Non-modal</p>
              <Button slot="close">Close</Button>
            </Dialog>
          </NonModal>
        </DialogTrigger>
      </OverlayContainerProvider>
      <div id="custom-container" data-testid="custom-container" />
    </>
  );

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  expect(
    screen.getByRole('dialog').closest('[data-testid="custom-container"]')
  ).toBe(screen.getByTestId('custom-container'));
});

test('supports custom <Pressable> trigger', async () => {
  render(
    <DialogTrigger>
      <Pressable>
        <span role="button">Trigger</span>
      </Pressable>
      <NonModal>
        <Dialog>Popover</Dialog>
      </NonModal>
    </DialogTrigger>
  );

  const button = screen.getByRole('button');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeInTheDocument();
});
