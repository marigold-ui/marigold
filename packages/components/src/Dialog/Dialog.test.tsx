/* eslint-disable testing-library/no-node-access */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockInstance, vi } from 'vitest';
import { renderWithOverlay } from '../test.utils';
import { Basic, VeryLongContent, WithFormValidation } from './Dialog.stories';

const user = userEvent.setup();

let errorMock: MockInstance;

beforeEach(() => {
  errorMock = vi.spyOn(console, 'error').mockImplementation(() => null);
});

afterEach(() => {
  errorMock.mockRestore();
});

test('renders children correctly', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByText('Open');
  expect(button).toBeInTheDocument();

  await user.click(button);

  const headline = screen.getByText('Enable notifications');
  expect(headline).toBeInTheDocument();

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeInTheDocument();
});

test('dialog can be opened by button', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();
});

test('optionally renders a close button', async () => {
  // Basic story has closeButton=true by default
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();

  // The close button is the first child of the dialog (rendered before content)
  const closeButton = dialog.firstChild as HTMLButtonElement;
  expect(closeButton).toBeInTheDocument();
  expect(closeButton.tagName).toBe('BUTTON');

  await user.click(closeButton);
  expect(dialog).not.toBeVisible();
});

test('supports closing the dialog with escape key', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByText('Open');
  await user.click(button);

  expect(screen.getByRole('dialog')).toBeVisible();
  await user.keyboard('{Escape}');

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

test('close Dialog by clicking on the Underlay', async () => {
  // Basic story has dismissable=true by default
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');

  await user.click(document.body);

  expect(dialog).not.toBeVisible();
});

test('supports title for accessibility reasons', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-labelledby');

  const headline = screen.getByText('Enable notifications');
  expect(headline).toHaveAttribute('id');

  expect(headline.id).toBe(dialog.getAttribute('aria-labelledby'));
});

test('supports dialog contents', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-labelledby');

  // Basic story has content about notifications
  const dialogContent = screen.getByText(/Would you like to receive/);
  expect(dialogContent).toBeInTheDocument();
});

test('supports dialog actions', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByText('Open');
  await user.click(button);

  const cancelButton = screen.getByText('Cancel');
  expect(cancelButton).toBeInTheDocument();

  const enableButton = screen.getByText('Enable');
  expect(enableButton).toBeInTheDocument();
});

test('supports focus and open dialog with keyboard', async () => {
  renderWithOverlay(<Basic.Component />);

  await user.tab();
  await user.keyboard('[Enter]');

  const dialog = screen.getByRole('dialog');
  await waitFor(() => {
    expect(dialog).toBeVisible();
  });
});

test('renders nothing by default', () => {
  renderWithOverlay(<Basic.Component />);

  const dialog = screen.queryByRole('dialog');
  expect(dialog).not.toBeInTheDocument();
});

test('cancel button closes dialog', async () => {
  renderWithOverlay(<Basic.Component />);

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

test('form validation works within dialog', async () => {
  renderWithOverlay(<WithFormValidation.Component />);

  const button = screen.getByText('Open');
  await user.click(button);

  // Dialog should be visible
  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();

  // Try to submit without entering code
  const submitButton = screen.getByText('Submit');
  await user.click(submitButton);

  // Form validation should show error (Code field is required)
  // The dialog should remain open due to validation
  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

test('VeryLongContent story renders with proper structure', async () => {
  renderWithOverlay(<VeryLongContent.Component />);

  const button = screen.getByText('Open Dialog with Long Content');

  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('type', 'button');
});
