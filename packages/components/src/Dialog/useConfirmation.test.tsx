import { renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { theme } from '@marigold/theme-rui';
import { Button } from '../Button/Button';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { renderWithOverlay } from '../test.utils';
import { useConfirmation } from './useConfirmation';

const user = userEvent.setup();

// `useConfirmation` is a hook, so there is no story to import for it. The
// harness exercises the provider's state machine; `MarigoldProvider` supplies
// the `ConfirmationProvider` the hook depends on. The happy-path open/confirm
// flow lives in `ConfirmationDialog.stories.tsx` as a `Basic.test(...)` case.
const ConfirmationHarness = () => {
  const confirm = useConfirmation();

  return (
    <>
      <Button
        onPress={() =>
          confirm({
            title: 'Enable notifications',
            content:
              'Would you like to receive notifications for upcoming events?',
            confirmationLabel: 'Enable',
            cancelLabel: 'Cancel',
          })
        }
      >
        Confirm
      </Button>
      <Button
        variant="destructive"
        onPress={() =>
          confirm({
            variant: 'destructive',
            title: 'Delete item',
            content: 'Are you sure you want to delete this item?',
            confirmationLabel: 'Delete',
          })
        }
      >
        Delete
      </Button>
    </>
  );
};

const renderHarness = () =>
  renderWithOverlay(
    <MarigoldProvider theme={theme}>
      <ConfirmationHarness />
    </MarigoldProvider>
  );

test('throws if ConfirmationProvider is missing', () => {
  expect(() =>
    renderHook(() => useConfirmation())
  ).toThrowErrorMatchingInlineSnapshot(
    `[Error: \`useConfirmation\` must be used within a \`ConfirmationProvider\`]`
  );
});

test('can open multiple confirmation dialogs sequentially', async () => {
  renderHarness();

  await user.click(screen.getByRole('button', { name: 'Confirm' }));

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  expect(screen.getByText('Enable notifications')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Cancel' }));

  await waitFor(() =>
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  );

  await user.click(screen.getByRole('button', { name: 'Delete' }));

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  expect(screen.getByText('Delete item')).toBeInTheDocument();
});

test('only one confirmation dialog at a time', async () => {
  const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

  renderHarness();

  // Keep the reference: react-aria marks the trigger aria-hidden while the
  // dialog is open, so it can't be re-queried by role once it's behind the modal.
  const button = screen.getByRole('button', { name: 'Confirm' });
  await user.click(button);

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  expect(screen.getByText('Enable notifications')).toBeInTheDocument();

  // Requesting a second dialog while one is open is rejected with a warning.
  await user.click(button);

  expect(consoleWarnSpy).toHaveBeenCalledWith(
    'A confirmation dialog is already open. Rejecting new request.'
  );

  consoleWarnSpy.mockRestore();
});
