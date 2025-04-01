import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event';
import { Button, Dialog, DialogTrigger } from 'react-aria-components';
import { NonModal } from './NonModal';
import type { NonModalProps } from './NonModal';

let user: UserEvent;
let onPressOutie: jest.Mock;

beforeEach(() => {
  onPressOutie = jest.fn();
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
  </>
);

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
});

test('supports render props', async () => {
  let { getByRole } = render(
    <DialogTrigger>
      <Button />
      <NonModal>
        {({ state }) => (
          <Dialog>Dialog is {state.isOpen ? 'open' : 'closed'}</Dialog>
        )}
      </NonModal>
    </DialogTrigger>
  );

  const button = getByRole('button');
  await user.click(button);

  const dialog = getByRole('dialog');
  expect(dialog).toHaveTextContent('Dialog is open');
});

test('isOpen and defaultOpen override state from context', async () => {
  const onOpenChange = jest.fn();

  render(
    <>
      <DialogTrigger>
        <Button />
        <NonModal open onOpenChange={onOpenChange}>
          <Dialog>A non-modal Dialog</Dialog>
          <Button slot="close">Close</Button>
        </NonModal>
      </DialogTrigger>
    </>
  );

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveTextContent('A non-modal Dialog');

  const close = screen.getByRole('button', { name: 'Close' });
  await user.click(close);

  expect(onOpenChange).toHaveBeenCalledTimes(1);
  expect(onOpenChange).toHaveBeenCalledWith(false);
});
