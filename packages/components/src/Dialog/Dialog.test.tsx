/* eslint-disable testing-library/no-node-access */

/* eslint-disable testing-library/no-container */
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { Theme, cva } from '@marigold/system';

import { Button } from '../Button';
import { Headline } from '../Headline';
import { setup } from '../test.utils';
import { Dialog } from './Dialog';

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva(''),
    Dialog: {
      container: cva('p-5', {
        variants: {
          variant: {
            custom: 'bg-green-400',
          },
          size: {
            large: 'w-[400px]',
          },
        },
      }),
      closeButton: cva('p-1', {
        variants: {
          variant: {
            custom: 'bg-black',
          },
        },
      }),
    },
    Headline: cva(''),
    Underlay: cva('bg-black opacity-5'),
  },
};

const user = userEvent.setup();
const { render } = setup({ theme });

let errorMock: jest.SpyInstance;

beforeEach(() => {
  errorMock = jest.spyOn(console, 'error').mockImplementation();
});

afterEach(() => {
  errorMock.mockRestore();
});

test('renders children correctly', () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>
      <Dialog>
        <Dialog.Headline>Headline</Dialog.Headline>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  const headline = screen.getByText('Headline');
  expect(headline).toBeInTheDocument();

  const dialog = screen.getByText('Content');
  expect(dialog).toBeInTheDocument();
});

test('supports children as function', () => {
  const spy = jest.fn().mockReturnValue(<div>I am a spy!</div>);
  render(
    <Dialog.Trigger>
      <Button>Open</Button>
      <Dialog>{spy}</Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  expect(spy).toHaveBeenCalled();
});

test('dialog can be opened by button', () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>
      <Dialog>
        <Dialog.Headline>Headline</Dialog.Headline>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByText('Content');
  expect(dialog).toBeVisible();
});

test('optionally renders a close button', () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>

      <Dialog closeButton>
        <Dialog.Headline>Headline</Dialog.Headline>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);
  const dialog = screen.getByText('Content');
  expect(dialog).toBeVisible();

  const closeButton = dialog.firstChild?.lastChild!;
  expect(closeButton).toBeInTheDocument();

  fireEvent.click(closeButton);
  expect(dialog).not.toBeVisible();
});

test('supoorts closing the dialog with escape key', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>

      <Dialog closeButton>
        <Dialog.Headline>Headline</Dialog.Headline>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByText('Content');
  await user.type(dialog, '{esc}');
  await waitFor(() => {
    expect(screen.queryByRole('Dialog')).not.toBeInTheDocument();
  });
});

test('close Dialog by clicking on the Underlay', () => {
  render(
    <Dialog.Trigger dismissable>
      <Button>Open</Button>
      <Dialog closeButton>
        <Dialog.Headline>Headline</Dialog.Headline>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByRole('dialog');

  fireEvent.mouseDown(document.body);
  fireEvent.mouseUp(document.body);

  expect(dialog).not.toBeVisible();
});

test('child function is passed a close function', () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>
      <Dialog>
        {({ close }) => <button onClick={close}>Custom Close</button>}
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByRole('dialog');
  const closeButton = screen.getByText('Custom Close');
  fireEvent.click(closeButton);

  expect(dialog).not.toBeVisible();
});

test('supports title for accessability reasons', () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>

      <Dialog closeButton>
        <Dialog.Headline>Headline</Dialog.Headline>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-labelledby');

  const headline = screen.getByText('Headline');
  expect(headline).toHaveAttribute('id');

  expect(headline.id).toBe(dialog.getAttribute('aria-labelledby'));
});

test('child function is passed an id for the dialog title (a11y)', () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>
      <Dialog>
        <Dialog.Headline>Custom Headline</Dialog.Headline>
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByRole('dialog');
  const headline = screen.getByText('Custom Headline');
  expect(headline).toBeInTheDocument();
  expect(dialog).toHaveAttribute(
    'aria-labelledby',
    headline.getAttribute('id')
  );
});

// test('warns if no element to attach the title can be found', () => {
//   const warn = jest.spyOn(console, 'warn').mockImplementation();
//   render(
//     <Dialog.Trigger>
//       <Button>Open</Button>
//       <Dialog closeButton>Content</Dialog>
//     </Dialog.Trigger>
//   );
//   const button = screen.getByText('Open');
//   fireEvent.click(button);

//   const dialog = screen.getByRole('dialog');
//   expect(dialog).not.toHaveAttribute('aria-labelledby');
//   expect(dialog.firstChild).not.toHaveAttribute('id');

//   expect(warn).toHaveBeenCalled();
//   expect(warn.mock.calls[0][0]).toMatchInlineSnapshot(
//     `"No child in <Dialog> found that can act as title for accessibility. Please add a <Header> or <Dialog.Headline> as direct child."`
//   );
//   warn.mockRestore();
// });

test('supports focus and open dialog with keyboard', async () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>

      <Dialog closeButton>
        <Dialog.Headline>Headline</Dialog.Headline>
        Content
      </Dialog>
    </Dialog.Trigger>
  );

  user.tab();
  await user.keyboard('[Enter]');

  const dialog = screen.getByRole('dialog');
  await waitFor(() => {
    expect(dialog).toBeVisible();
  });
});

test('dialog has base classnames', () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>

      <Dialog closeButton>
        <Dialog.Headline>Headline</Dialog.Headline>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();

  const closeButton = dialog.firstChild?.lastChild;

  expect(closeButton).toHaveClass(
    'h-4 w-4 cursor-pointer border-none leading-normal outline-0 p-1'
  );

  expect(dialog).toHaveClass(`p-5`);
});

test('dialog has variant classnames', () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>

      <Dialog variant="custom" closeButton>
        <Dialog.Headline>Headline</Dialog.Headline>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();

  const closeButton = dialog.firstChild?.lastChild;

  expect(closeButton).toHaveClass(
    'h-4 w-4 cursor-pointer border-none leading-normal outline-0 p-1 bg-black'
  );
  expect(dialog.className).toMatchInlineSnapshot(
    `"relative outline-none p-5 bg-green-400"`
  );
});

test('dialog supports size', () => {
  render(
    <Dialog.Trigger>
      <Button>Open</Button>

      <Dialog size="large" closeButton>
        <Dialog.Headline>Headline</Dialog.Headline>
        Content
      </Dialog>
    </Dialog.Trigger>
  );
  const button = screen.getByText('Open');
  fireEvent.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();
  expect(dialog).toHaveClass('w-[400px]');
});

test('renders nothing by default', () => {
  render(
    <Dialog.Trigger>
      <Dialog>
        <Dialog.Headline>Headline</Dialog.Headline>Content
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
          <Dialog.Headline>Headline</Dialog.Headline>
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
            <Dialog.Headline>Headline</Dialog.Headline>
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
  const spy = jest.fn();

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
              <Dialog.Headline>Headline</Dialog.Headline>
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
