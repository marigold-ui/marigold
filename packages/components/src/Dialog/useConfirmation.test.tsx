import { render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UseConfirmation } from './ConfirmationDialog.stories';
import { useConfirmation } from './useConfirmation';

const user = userEvent.setup();

test('throw if ConfirmationProvider is missing', () => {
  expect(() =>
    renderHook(() => useConfirmation())
  ).toThrowErrorMatchingInlineSnapshot(
    `[Error: \`useConfirmation\` must be used within a \`ConfirmationProvider\`]`
  );
});

test('open confirmation dialog', async () => {
  render(<UseConfirmation.Component />);

  const button = screen.getByRole('button', { name: 'Confirm' });
  await user.click(button);

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  expect(screen.getByText('Enable notifications')).toBeInTheDocument();
  expect(
    screen.getByText(
      'Would you like to receive notifications for upcoming events?'
    )
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Enable' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
});

test('can open multiple confirmation dialogs sequentially', async () => {
  render(<UseConfirmation.Component />);

  const button = screen.getByRole('button', { name: 'Confirm' });
  await user.click(button);

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  expect(screen.getByText('Enable notifications')).toBeInTheDocument();

  const cancelButton = screen.getByRole('button', { name: 'Cancel' });
  await user.click(cancelButton);

  await waitFor(() =>
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  );

  const deleteButton = screen.getByRole('button', { name: 'Delete' });
  await user.click(deleteButton);

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  expect(screen.getByText('Delete item')).toBeInTheDocument();
});

test('only one confirmation dialog at a time', async () => {
  const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

  render(<UseConfirmation.Component />);

  const button = screen.getByRole('button', { name: 'Confirm' });
  await user.click(button);

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  expect(screen.getByText('Enable notifications')).toBeInTheDocument();

  // Try to open another dialog while one is already open
  await user.click(button);

  expect(consoleWarnSpy).toHaveBeenCalledWith(
    'A confirmation dialog is already open. Rejecting new request.'
  );
});
