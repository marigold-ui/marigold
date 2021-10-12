import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@marigold/system';
import { Dialog, useDialogButtonProps } from './Dialog';
import { Button } from '../Button';

const theme = {
  dialog: {
    wrapper: {
      p: '8px',
    },
    body: {
      p: '4px',
    },
    onClose: {
      p: '0px',
    },
  },
};

const DialogComponent: React.FC = props => {
  const { state, openButtonProps, openButtonRef } = useDialogButtonProps();
  return (
    <>
      <Button {...openButtonProps} ref={openButtonRef}>
        Open
      </Button>
      {state.isOpen && (
        <Dialog
          title="Title"
          isOpen={state.isOpen}
          close={state.close}
          {...props}
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

test('supports theme variants', () => {
  render(
    <ThemeProvider theme={theme}>
      <DialogComponent data-testid="Dialog" />
    </ThemeProvider>
  );
  const button = screen.getByText(/Open/);
  fireEvent.click(button);

  const dialogBody = screen.getByTestId(/Dialog/);
  expect(dialogBody).toHaveStyle(`padding: 8px`);
  const dialogTitle = screen.getByText(/Title/);
  expect(dialogTitle.parentElement).toHaveStyle(`padding: 4px`);
});

test('close Dialog by escape key', () => {
  render(<DialogComponent />);
  const button = screen.getByText(/Open/);
  fireEvent.click(button);

  const dialog = screen.getByText(/Content/);
  userEvent.type(dialog, '{esc}');
  expect(dialog).not.toBeVisible();
});

test('close Dialog by close button', () => {
  render(<DialogComponent data-testid="Dialog" />);
  const button = screen.getByText(/Open/);
  fireEvent.click(button);

  const dialog = screen.getByTestId(/Dialog/);
  expect(dialog).toBeVisible();
  const buttonDiv = dialog.lastChild;
  const onClose = buttonDiv && buttonDiv.firstChild;
  onClose && fireEvent.click(onClose);
  expect(dialog).not.toBeVisible();
});
