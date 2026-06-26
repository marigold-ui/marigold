import { expect, fn, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { ConfirmationDialog } from './ConfirmationDialog';
import { ConfirmationProvider, useConfirmation } from './useConfirmation';

const meta = preview.meta({
  title: 'Components/ConfirmationDialog',
  component: ConfirmationDialog,
  // The overlay portals into "storybook-root" (see the global
  // `OverlayContainerProvider`); this decorator provides that container so the
  // dialog mounts inside the story canvas during tests.
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
});

export const Basic = meta.story({
  // Tagging the base story opts every `Basic.test(...)` case below into the
  // storybook-tests run (the derived tests inherit the parent's tags).
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    title: 'Confirmation',
    confirmationLabel: 'Confirm',
    cancelLabel: 'Cancel',
    children: 'Are you sure you want to proceed with this action?',
  },
  render: args => (
    <ConfirmationDialog.Trigger>
      <Button>Open</Button>
      <ConfirmationDialog {...args}>{args.children}</ConfirmationDialog>
    </ConfirmationDialog.Trigger>
  ),
});

Basic.test(
  'Opens with the title, content and action buttons',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));

    expect(await canvas.findByRole('alertdialog')).toBeInTheDocument();
    expect(
      canvas.getByText('Are you sure you want to proceed with this action?')
    ).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  }
);

// Callbacks — `onConfirm` / `onCancel` fire and the dialog closes afterwards.

Basic.test(
  'Calls onConfirm and closes when the action button is pressed',
  {
    args: { onConfirm: fn() },
  },
  async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await userEvent.click(
      await canvas.findByRole('button', { name: 'Confirm' })
    );

    expect(args.onConfirm).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(canvas.queryByRole('alertdialog')).not.toBeInTheDocument()
    );
  }
);

Basic.test(
  'Calls onCancel and closes when the cancel button is pressed',
  {
    args: { onCancel: fn() },
  },
  async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await userEvent.click(
      await canvas.findByRole('button', { name: 'Cancel' })
    );

    expect(args.onCancel).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(canvas.queryByRole('alertdialog')).not.toBeInTheDocument()
    );
  }
);

// Auto focus — `autoFocusButton` focuses the matching action button on open.

Basic.test(
  'Focuses the action button on open when autoFocusButton is "action"',
  {
    args: { autoFocusButton: 'action' },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));

    const confirmButton = await canvas.findByRole('button', {
      name: 'Confirm',
    });
    await waitFor(() => expect(confirmButton).toHaveFocus());
  }
);

Basic.test(
  'Focuses the cancel button on open when autoFocusButton is "cancel"',
  {
    args: { autoFocusButton: 'cancel' },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));

    const cancelButton = await canvas.findByRole('button', { name: 'Cancel' });
    await waitFor(() => expect(cancelButton).toHaveFocus());
  }
);

// useConfirmation — the imperative hook opens a dialog built from its config and
// resolves when the user confirms. A local `ConfirmationProvider` keeps the demo
// self-contained instead of relying on the global one from the decorator.

Basic.test(
  'useConfirmation opens a dialog from the hook and closes it on confirm',
  {
    render: () => {
      const Demo = () => {
        const confirm = useConfirmation();

        return (
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
            Enable notifications
          </Button>
        );
      };

      return (
        <ConfirmationProvider>
          <Demo />
        </ConfirmationProvider>
      );
    },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Enable notifications' })
    );

    // The dialog opens with the config passed to `confirm()`.
    expect(await canvas.findByRole('alertdialog')).toBeInTheDocument();
    expect(
      canvas.getByText(
        'Would you like to receive notifications for upcoming events?'
      )
    ).toBeInTheDocument();

    // Confirming resolves the promise and closes the dialog.
    await userEvent.click(canvas.getByRole('button', { name: 'Enable' }));
    await waitFor(() =>
      expect(canvas.queryByRole('alertdialog')).not.toBeInTheDocument()
    );
  }
);
