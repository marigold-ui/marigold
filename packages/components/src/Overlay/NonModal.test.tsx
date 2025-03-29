import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event';
import { Button, Dialog, DialogTrigger } from 'react-aria-components';
import { NonModal } from './NonModal';
import type { NonModalProps } from './NonModal';

const Component = (props: NonModalProps) => (
  <DialogTrigger>
    <Button />
    <NonModal {...props}>
      <Dialog>Non-modal</Dialog>
    </NonModal>
  </DialogTrigger>
);

let user: UserEvent;

beforeEach(() => {
  user = userEvent.setup();
});

test('works with a dialog', async () => {
  const { getByRole, queryByRole } = render(<Component />);

  const button = getByRole('button');
  expect(queryByRole('dialog')).not.toBeInTheDocument();

  await user.click(button);

  const dialog = getByRole('dialog');
  expect(dialog).toBeInTheDocument();

  await user.click(document.body);

  expect(dialog).not.toBeInTheDocument();
});

// does not close when clicked outside
// can interact with elements on the main page
// sets role by default
