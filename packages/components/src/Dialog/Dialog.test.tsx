import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '@marigold/system';

import { Dialog, useDialogButtonProps } from './Dialog';
import { Button } from '../Button';

const theme = {
  space: {
    none: 0,
    xxsmall: 1,
    xsmall: 2,
    small: 4,
    medium: 8,
    large: 16,
  },
  dialog: {
    __default: {
      p: 'small',
    },
    default: {
      p: 'medium',
    },
    backdrop: {
      p: 'none',
    },
  },
};

type DialogComponentProps = {
  title?: string;
  variant?: string;
  backdropVariant?: string;
};

const DialogComponent: React.FC<DialogComponentProps> = ({
  variant,
  backdropVariant,
}) => {
  const { state, openButtonProps, openButtonRef } = useDialogButtonProps();
  return (
    <>
      <Button {...openButtonProps} ref={openButtonRef}>
        Open
      </Button>
      {state.isOpen && (
        <Dialog
          variant={variant}
          backdropVariant={backdropVariant}
          title="Title"
          isOpen={state.isOpen}
          close={state.close}
        >
          Content
        </Dialog>
      )}
    </>
  );
};

test('dialog can be opened by button', () => {
  render(<DialogComponent />);
  const button = screen.getByText(/Open/);
  fireEvent.click(button);
  const dialog = screen.getByText(/Content/);
  expect(dialog).toBeDefined();
});

test('supports default variants', () => {
  render(
    <ThemeProvider theme={theme}>
      <DialogComponent />
    </ThemeProvider>
  );
  const button = screen.getByText(/Open/);
  fireEvent.click(button);

  const dialog = screen.getByRole(/dialog/);
  expect(dialog).toHaveStyle(`padding: 4px`);
  expect(dialog.parentElement).toHaveStyle(`padding: 0px`);
});

test('supports other variants than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <DialogComponent variant="default" backdropVariant="default" />
    </ThemeProvider>
  );
  const button = screen.getByText(/Open/);
  fireEvent.click(button);

  const dialog = screen.getByRole(/dialog/);
  expect(dialog).toHaveStyle(`padding: 8px`);
  expect(dialog.parentElement).toHaveStyle(`padding: 8px`);
});

test('dialog has correct baseCSS styles', async () => {
  render(
    <ThemeProvider theme={theme}>
      <DialogComponent variant="default" backdropVariant="default" />
    </ThemeProvider>
  );
  const button = screen.getByText(/Open/);
  fireEvent.click(button);

  const dialog = screen.getByRole(/dialog/);
  expect(dialog.firstChild).toHaveStyle(`display: flex`);
  expect(dialog.firstChild?.lastChild).toHaveStyle(`alignItems: start`);

  // ModalDialog baseCSS
  expect(dialog.parentElement).toHaveStyle(`display: grid`);
});

test('dialog has correct baseCSS styles with theme index', async () => {
  render(
    <ThemeProvider theme={theme}>
      <DialogComponent variant="default" backdropVariant="default" />
    </ThemeProvider>
  );
  const button = screen.getByText(/Open/);
  fireEvent.click(button);

  const dialog = screen.getByRole(/dialog/);
  expect(dialog.firstChild).toHaveStyle(`paddingLeft: 16`);
  expect(dialog.firstChild?.lastChild).toHaveStyle(`paddingTop: 2`);

  // find all buttons to get the close and not the open button
  const onCloseButton = await screen.findAllByRole('button');
  expect(onCloseButton[1]).toHaveStyle(`paddingLeft: 1`);
});

test('close Dialog by escape key', () => {
  render(<DialogComponent />);
  const button = screen.getByText(/Open/);
  fireEvent.click(button);

  const dialog = screen.getByText(/Content/);
  userEvent.type(dialog, '{esc}');
  expect(dialog).not.toBeVisible();
});

test('close Dialog by close button', async () => {
  render(<DialogComponent />);
  const button = screen.getByText(/Open/);
  fireEvent.click(button);

  const dialog = screen.getByRole(/dialog/);
  expect(dialog).toBeVisible();

  // find all buttons to get the close and not the open button
  const onCloseButton = await screen.findAllByRole('button');
  expect(onCloseButton[1]).toBeVisible();
  fireEvent.click(onCloseButton[1]);

  expect(dialog).not.toBeVisible();
});
