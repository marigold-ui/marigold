import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event';
import { Button, Dialog, DialogTrigger } from 'react-aria-components';
import { NonModal } from './NonModal';
import type { NonModalProps } from './NonModal';

const Component = (props: NonModalProps) => (
  <DialogTrigger>
    <Button>Toggle</Button>
    <NonModal {...props}>
      <Dialog>
        <p>Non-modal</p>
        <Button slot="close">Close</Button>
      </Dialog>
    </NonModal>
  </DialogTrigger>
);

let user: UserEvent;

beforeEach(() => {
  user = userEvent.setup();
});

test('works with a dialog', async () => {
  const { getByRole, queryByRole } = render(<Component />);

  const button = getByRole('button', { name: 'Toggle' });
  expect(queryByRole('dialog')).not.toBeInTheDocument();

  await user.click(button);

  const dialog = getByRole('dialog');
  expect(dialog).toBeInTheDocument();

  const close = getByRole('button', { name: 'Close' });
  await user.click(close);

  expect(dialog).not.toBeInTheDocument();
});

// does not close when clicked outside
// can interact with elements on the main page
// sets role by default
