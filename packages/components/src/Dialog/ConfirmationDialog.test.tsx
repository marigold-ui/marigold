import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider } from 'react-aria-components';
import { MockInstance, expect, it, vi } from 'vitest';
import { type Theme, cva } from '@marigold/system';
import { Button } from '../Button/Button';
import { setup } from '../test.utils';
import { ConfirmationDialog } from './ConfirmationDialog';

// Note: ConfirmationDialog is an overlay component that renders into a portal.
// It requires ThemeProvider directly due to portal rendering behavior.

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva(''),
    CloseButton: cva('size-7'),
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
      header: cva(''),
      content: cva(''),
      actions: cva(''),
      title: cva(''),
    },
    Headline: cva(''),
    Underlay: cva('bg-black opacity-5'),
    Modal: cva(''),
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

it('renders title, content, and buttons', async () => {
  render(
    <ConfirmationDialog.Trigger>
      <Button>Open</Button>
      <ConfirmationDialog title="Confirm Dialog" confirmationLabel="Confirm">
        Are you sure you want to do this?
      </ConfirmationDialog>
    </ConfirmationDialog.Trigger>
  );

  await user.click(screen.getByRole('button', { name: 'Open' }));

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  expect(screen.getByText('Confirm Dialog')).toBeInTheDocument();
  expect(
    screen.getByText('Are you sure you want to do this?')
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
});

it('renders a localized cancel label', async () => {
  render(
    <>
      <I18nProvider locale="en-US">
        <ConfirmationDialog.Trigger open>
          <ConfirmationDialog
            title="Confirm Dialog"
            confirmationLabel="Confirm"
          >
            Are you sure you want to do this?
          </ConfirmationDialog>
        </ConfirmationDialog.Trigger>
      </I18nProvider>
      <I18nProvider locale="de-DE">
        <ConfirmationDialog.Trigger open>
          <ConfirmationDialog
            title="Bestätigungsdialog"
            confirmationLabel="Bestätigen"
          >
            Sind Sie sicher, dass Sie dies tun möchten?
          </ConfirmationDialog>
        </ConfirmationDialog.Trigger>
      </I18nProvider>
    </>
  );

  expect(screen.getByText('Cancel')).toBeInTheDocument();
  expect(screen.getByText('Abbrechen')).toBeInTheDocument();
});

it('uses custom cancel label if provided', () => {
  render(
    <ConfirmationDialog.Trigger open>
      <ConfirmationDialog
        title="Confirm"
        confirmationLabel="Confirm"
        cancelLabel="Abort"
      >
        Are you sure you want to do this?
      </ConfirmationDialog>
    </ConfirmationDialog.Trigger>
  );

  expect(screen.getByRole('button', { name: 'Abort' })).toBeInTheDocument();
});

it('calls onConfirm on primary button press', async () => {
  const onConfirm = vi.fn();

  render(
    <ConfirmationDialog.Trigger open>
      <ConfirmationDialog
        title="Confirm Dialog"
        confirmationLabel="Confirm"
        onConfirm={onConfirm}
      >
        Are you sure you want to do this?
      </ConfirmationDialog>
    </ConfirmationDialog.Trigger>
  );

  await user.click(screen.getByRole('button', { name: 'Confirm' }));

  expect(onConfirm).toHaveBeenCalled();
});

it('closes on primary button press', async () => {
  render(
    <ConfirmationDialog.Trigger defaultOpen>
      <ConfirmationDialog title="Confirm Dialog" confirmationLabel="Confirm">
        Are you sure you want to do this?
      </ConfirmationDialog>
    </ConfirmationDialog.Trigger>
  );

  await user.click(screen.getByRole('button', { name: 'Confirm' }));

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
});

it('calls onCancel on cancel button press', async () => {
  const onCancel = vi.fn();
  render(
    <ConfirmationDialog.Trigger open>
      <ConfirmationDialog
        title="Confirm Dialog"
        confirmationLabel="Confirm"
        onCancel={onCancel}
      >
        Are you sure you want to delete this item?
      </ConfirmationDialog>
    </ConfirmationDialog.Trigger>
  );

  await user.click(screen.getByRole('button', { name: /cancel/i }));

  expect(onCancel).toHaveBeenCalled();
});

it('closes on cancel button press', async () => {
  render(
    <ConfirmationDialog.Trigger defaultOpen>
      <ConfirmationDialog title="Confirm Dialog" confirmationLabel="Confirm">
        Are you sure you want to do this?
      </ConfirmationDialog>
    </ConfirmationDialog.Trigger>
  );

  await user.click(screen.getByRole('button', { name: 'Cancel' }));

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
});

it('autoFocuses the action button if autoFocusButton is set to "action"', async () => {
  render(
    <ConfirmationDialog.Trigger>
      <Button>Open</Button>
      <ConfirmationDialog
        title="Confirm Dialog"
        confirmationLabel="Confirm"
        autoFocusButton="action"
      >
        Are you sure you want to do this?
      </ConfirmationDialog>
    </ConfirmationDialog.Trigger>
  );

  await user.click(screen.getByRole('button', { name: 'Open' }));
  const primaryButton = screen.getByRole('button', { name: 'Confirm' });

  expect(primaryButton).toHaveFocus();
});

it('autoFocuses the cancel button if autoFocusButton is set to "cancel"', async () => {
  render(
    <ConfirmationDialog.Trigger>
      <Button>Open</Button>
      <ConfirmationDialog
        title="Confirm Dialog"
        confirmationLabel="Confirm"
        autoFocusButton="cancel"
      >
        Are you sure you want to do this?
      </ConfirmationDialog>
    </ConfirmationDialog.Trigger>
  );

  await user.click(screen.getByRole('button', { name: 'Open' }));
  const cancelButton = screen.getByRole('button', { name: 'Cancel' });

  expect(cancelButton).toHaveFocus();
});
