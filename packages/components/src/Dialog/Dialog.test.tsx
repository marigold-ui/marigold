/* eslint-disable testing-library/no-node-access */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { MockInstance, vi } from 'vitest';
import { Theme, cva } from '@marigold/system';
import { Button } from '../Button/Button';
import { setup } from '../test.utils';
import { Dialog } from './Dialog';
import { VeryLongContent } from './Dialog.stories';

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva({}),
    CloseButton: cva({ base: 'size-7' }),
    Dialog: {
      container: cva({
        base: 'p-5',
        variants: {
          variant: {
            custom: 'bg-green-400',
          },
          size: {
            large: 'w-[400px]',
          },
        },
      }),
      closeButton: cva({
        base: 'p-1',
        variants: {
          variant: {
            custom: 'bg-black',
          },
        },
      }),
      header: cva({}),
      content: cva({}),
      actions: cva({}),
      title: cva({}),
    },
    Headline: cva({}),
    Underlay: cva({ base: 'bg-black opacity-5' }),
    Modal: cva({}),
  },
};

const user = userEvent.setup();
const { render } = setup({ theme });

let errorMock: MockInstance;

beforeEach(() => {
  errorMock = vi.spyOn(console, 'error').mockImplementation(() => null);
});

afterEach(() => {
  errorMock.mockRestore();
});

test('renders children correctly', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>
      <Dialog>
        <Dialog.Title>Headline</Dialog.Title>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  expect(button).toBeInTheDocument();

  await user.click(button);

  const headline = screen.getByText('Headline');
  expect(headline).toBeInTheDocument();

  const dialog = screen.getByText('Content');
  expect(dialog).toBeInTheDocument();
});

test('supports children as function', async () => {
  const spy = vi.fn().mockReturnValue(<div>I am a spy!</div>);
  render(
    <Dialog.Trigger>
      <Button>Open</Button>
      <Dialog>{spy}</Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  await user.click(button);

  expect(spy).toHaveBeenCalled();
});

test('dialog can be opened by button', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>
      <Dialog>
        <Dialog.Title>Headline</Dialog.Title>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByText('Content');
  expect(dialog).toBeVisible();
});

test('optionally renders a close button', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>

      <Dialog closeButton>
        <Dialog.Title>Headline</Dialog.Title>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  await user.click(button);
  const dialog = screen.getByText('Content');
  expect(dialog).toBeVisible();

  const closeButton = dialog.firstChild?.lastChild as HTMLButtonElement;
  expect(closeButton).toBeInTheDocument();

  await user.click(closeButton);
  expect(dialog).not.toBeVisible();
});

test('supports closing the dialog with escape key', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>

      <Dialog closeButton>
        <Dialog.Title>Headline</Dialog.Title>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByText('Content');
  await user.type(dialog, '{esc}');
  await waitFor(() => {
    expect(screen.queryByRole('Dialog')).not.toBeInTheDocument();
  });
});

test('close Dialog by clicking on the Underlay', async () => {
  render(
    <Dialog.Trigger dismissable>
      <Button>Open</Button>
      <Dialog closeButton>
        <Dialog.Title>Headline</Dialog.Title>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');

  await user.click(document.body);

  expect(dialog).not.toBeVisible();
});

test('close controlled Dialog by clicking on the Underlay', async () => {
  const Component = () => {
    const [open, setOpen] = useState(false);

    return (
      <Dialog.Trigger open={open} onOpenChange={setOpen} dismissable>
        <Button>Open</Button>
        <Dialog closeButton>
          <Dialog.Title>Headline</Dialog.Title>
          Content
        </Dialog>
      </Dialog.Trigger>
    );
  };

  render(<Component />);
  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');

  await user.click(document.body);

  expect(dialog).not.toBeVisible();
});

test('child function is passed a close function', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>
      <Dialog>
        {({ close }) => <button onClick={close}>Custom Close</button>}
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  const closeButton = screen.getByText('Custom Close');
  await user.click(closeButton);

  expect(dialog).not.toBeVisible();
});

test('supports title for accessibility reasons', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>

      <Dialog closeButton>
        <Dialog.Title>Headline</Dialog.Title>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-labelledby');

  const headline = screen.getByText('Headline');
  expect(headline).toHaveAttribute('id');

  expect(headline.id).toBe(dialog.getAttribute('aria-labelledby'));
});

test('supports dialog contents', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>
      <Dialog closeButton>
        <Dialog.Title>Headline</Dialog.Title>
        <Dialog.Content>Content</Dialog.Content>
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-labelledby');
  const dialogContent = screen.getByText('Content');
  expect(dialogContent).toBeInTheDocument();
});

test('supports dialog actions', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>
      <Dialog closeButton>
        <Dialog.Title>Headline</Dialog.Title>
        <Dialog.Actions>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Login</Button>
        </Dialog.Actions>
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  await user.click(button);

  const cancelButton = screen.getByText('Cancel');
  expect(cancelButton).toBeInTheDocument();

  const loginButton = screen.getByText('Login');
  expect(loginButton).toBeInTheDocument();
});

test('child function is passed an id for the dialog title (a11y)', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>
      <Dialog>
        <Dialog.Title>Custom Headline</Dialog.Title>
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  const headline = screen.getByText('Custom Headline');
  expect(headline).toBeInTheDocument();
  expect(dialog).toHaveAttribute(
    'aria-labelledby',
    headline.getAttribute('id')
  );
});

test('supports focus and open dialog with keyboard', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>

      <Dialog closeButton>
        <Dialog.Title>Headline</Dialog.Title>
        Content
      </Dialog>
    </Dialog.Trigger>
  );

  await user.tab();
  await user.keyboard('[Enter]');

  const dialog = screen.getByRole('dialog');
  await waitFor(() => {
    expect(dialog).toBeVisible();
  });
});

test('dialog has base classnames', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>

      <Dialog closeButton>
        <Dialog.Title>Headline</Dialog.Title>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();

  const closeButton = dialog.firstChild;

  expect(closeButton).toHaveClass('size-7 p-1');

  expect(dialog).toHaveClass(`p-5`);
});

test('dialog has variant classnames', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>

      <Dialog variant="custom" closeButton>
        <Dialog.Title>Headline</Dialog.Title>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();

  const closeButton = dialog.firstChild;

  expect(closeButton).toHaveClass('size-7 p-1 bg-black');
  expect(dialog.className).toMatch('bg-green-400');
});

test('dialog supports size', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>

      <Dialog size="large" closeButton>
        <Dialog.Title>Headline</Dialog.Title>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();
  expect(dialog).toHaveClass('w-[400px]');
});

test('renders nothing by default', () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>
      <Dialog>
        <Dialog.Title>Headline</Dialog.Title>Content
      </Dialog>
    </Dialog.Trigger>
  );

  const dialog = screen.queryByRole('dialog');
  expect(dialog).not.toBeInTheDocument();
});

test('dialog can be controlled', async () => {
  const Component = () => {
    const [open, setOpen] = useState(false);

    return (
      <Dialog.Trigger open={open} onOpenChange={setOpen}>
        <Button data-testid="button" onPress={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Dialog>
          <Dialog.Title>Headline</Dialog.Title>
          <Button data-testid="close" onPress={() => setOpen(false)}>
            Close
          </Button>
        </Dialog>
      </Dialog.Trigger>
    );
  };

  render(<Component />);

  let dialog = screen.queryByRole('dialog');
  expect(dialog).not.toBeInTheDocument();

  const button = screen.getByTestId('button');
  await user.click(button);

  dialog = screen.queryByRole('dialog');
  expect(dialog).toBeInTheDocument();

  const close = screen.getByTestId('close');
  await user.click(close);

  dialog = screen.queryByRole('dialog');
  expect(dialog).not.toBeInTheDocument();
});

test('dialog can be controlled without a trigger', async () => {
  const Component = () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button data-testid="open-button" onPress={() => setOpen(true)}>
          open dialog
        </Button>
        <Dialog.Trigger open={open} onOpenChange={setOpen}>
          <Dialog>
            <Dialog.Title>Headline</Dialog.Title>
            <Button data-testid="close" onPress={() => setOpen(false)}>
              Close
            </Button>
          </Dialog>
        </Dialog.Trigger>
      </>
    );
  };

  render(<Component />);

  let dialog = screen.queryByRole('dialog');
  expect(dialog).not.toBeInTheDocument();

  const button = screen.getByTestId('open-button');
  await user.click(button);

  dialog = screen.queryByRole('dialog');
  expect(dialog).toBeInTheDocument();

  const close = screen.getByTestId('close');
  await user.click(close);

  dialog = screen.queryByRole('dialog');
  expect(dialog).not.toBeInTheDocument();
});

test('close state has a listener', async () => {
  const spy = vi.fn();

  const Component = () => {
    const [open, setOpen] = useState(false);

    return (
      <Dialog.Trigger open={open} onOpenChange={setOpen}>
        <Button data-testid="button" onPress={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Dialog>
          {({ close }) => (
            <>
              <Dialog.Title>Headline</Dialog.Title>
              <Button data-testid="close" onPress={close}>
                Close
              </Button>
            </>
          )}
        </Dialog>
      </Dialog.Trigger>
    );
  };

  render(<Component />);

  expect(spy.mock.calls).toMatchInlineSnapshot(`[]`);

  const button = screen.getByTestId('button');
  await user.click(button);

  expect(spy.mock.calls).toMatchInlineSnapshot(`[]`);

  const close = screen.getByTestId('close');
  await user.click(close);

  expect(spy.mock.calls).toMatchInlineSnapshot(`[]`);
});

test('cancel button closes dialog', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>

      <Dialog closeButton>
        <Dialog.Title>Headline</Dialog.Title>
        <Dialog.Actions>
          <Button slot="close">Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Dialog.Trigger>
  );

  const button = screen.getByText('Open');
  await user.click(button);

  const cancel = screen.getByText('Cancel');
  await waitFor(() => {
    expect(cancel).toBeInTheDocument();
  });

  await user.click(cancel);
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

test('VeryLongContent story renders with proper structure', async () => {
  render(<VeryLongContent.Component />);

  const button = screen.getByText('Open Dialog with Long Content');

  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('type', 'button');
});
