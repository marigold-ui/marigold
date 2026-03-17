import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider } from 'react-aria-components';
import { MockInstance, vi } from 'vitest';
import { renderWithOverlay } from '../test.utils';
import {
  Confirmation,
  WithAutoFocus,
  WithCallbacks,
} from './ConfirmationDialog.stories';

const user = userEvent.setup();

let errorMock: MockInstance;

beforeEach(() => {
  errorMock = vi.spyOn(console, 'error').mockImplementation(() => null);
});

afterEach(() => {
  errorMock.mockRestore();
});

test('renders title, content, and buttons', async () => {
  renderWithOverlay(<Confirmation.Component />);

  await user.click(screen.getByRole('button', { name: 'Open' }));

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  expect(screen.getByText('Confirmation')).toBeInTheDocument();
  expect(
    screen.getByText('Are you sure you want to proceed with this action?')
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
});

test('renders a localized cancel label', async () => {
  render(
    <>
      <I18nProvider locale="en-US">
        <WithCallbacks.Component />
      </I18nProvider>
      <I18nProvider locale="de-DE">
        <WithCallbacks.Component
          title="Bestätigungsdialog"
          confirmationLabel="Bestätigen"
        >
          Sind Sie sicher, dass Sie dies tun möchten?
        </WithCallbacks.Component>
      </I18nProvider>
    </>
  );

  expect(screen.getByText('Cancel')).toBeInTheDocument();
  expect(screen.getByText('Abbrechen')).toBeInTheDocument();
});

test('uses custom cancel label if provided', () => {
  renderWithOverlay(<WithCallbacks.Component cancelLabel="Abort" />);

  expect(screen.getByRole('button', { name: 'Abort' })).toBeInTheDocument();
});

test('calls onConfirm on primary button press', async () => {
  const onConfirm = vi.fn();

  renderWithOverlay(<WithCallbacks.Component onConfirm={onConfirm} />);

  await user.click(screen.getByRole('button', { name: 'Confirm' }));

  expect(onConfirm).toHaveBeenCalled();
});

test('closes on primary button press', async () => {
  renderWithOverlay(<WithCallbacks.Component />);

  await user.click(screen.getByRole('button', { name: 'Confirm' }));

  await waitFor(() =>
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  );
});

test('calls onCancel on cancel button press', async () => {
  const onCancel = vi.fn();

  renderWithOverlay(<WithCallbacks.Component onCancel={onCancel} />);

  await user.click(screen.getByRole('button', { name: /cancel/i }));

  expect(onCancel).toHaveBeenCalled();
});

test('closes on cancel button press', async () => {
  renderWithOverlay(<WithCallbacks.Component />);

  await user.click(screen.getByRole('button', { name: 'Cancel' }));

  await waitFor(() =>
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  );
});

test('autoFocuses the action button if autoFocusButton is set to "action"', async () => {
  renderWithOverlay(<WithAutoFocus.Component autoFocusButton="action" />);

  await user.click(screen.getByRole('button', { name: 'Open' }));
  const primaryButton = screen.getByRole('button', { name: 'Confirm' });

  expect(primaryButton).toHaveFocus();
});

test('autoFocuses the cancel button if autoFocusButton is set to "cancel"', async () => {
  renderWithOverlay(<WithAutoFocus.Component autoFocusButton="cancel" />);

  await user.click(screen.getByRole('button', { name: 'Open' }));
  const cancelButton = screen.getByRole('button', { name: 'Cancel' });

  expect(cancelButton).toHaveFocus();
});
