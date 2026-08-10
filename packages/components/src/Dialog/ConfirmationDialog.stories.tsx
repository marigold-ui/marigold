import { useState } from 'react';
import { expect, fn, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { ConfirmationDialog } from './ConfirmationDialog';
import type { ConfirmationConfig } from './useConfirmation';
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
  parameters: { surface: false },
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

Basic.test(
  'Closes with Escape without opting in to keyboard dismiss',
  {},
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await canvas.findByRole('alertdialog');

    await userEvent.keyboard('{Escape}');

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

Basic.test(
  'Focuses the cancel button on open when the variant is destructive',
  {
    // The only case rendering the destructive variant, so it earns a snapshot.
    parameters: { chromatic: { disableSnapshot: false } },
    args: { variant: 'destructive', confirmationLabel: 'Delete' },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));

    const cancelButton = await canvas.findByRole('button', { name: 'Cancel' });
    await waitFor(() => expect(cancelButton).toHaveFocus());
  }
);

type ConfirmationResultProps = Pick<ConfirmationConfig, 'autoFocusButton'>;

const ConfirmationResult = ({ autoFocusButton }: ConfirmationResultProps) => {
  const confirm = useConfirmation();
  const [result, setResult] = useState<string>();

  return (
    <>
      <Button
        onPress={async () =>
          setResult(
            await confirm({
              variant: 'destructive',
              title: 'Delete file?',
              content: 'This cannot be undone.',
              confirmationLabel: 'Delete',
              cancelLabel: 'Cancel',
              autoFocusButton,
            })
          )
        }
      >
        Delete file
      </Button>
      {result ? <div>{`resolved: ${result}`}</div> : null}
    </>
  );
};

// `useConfirmation` — the imperative hook opens a dialog built from its config
// and resolves when the user confirms. A local `ConfirmationProvider` keeps the
// demo self-contained instead of relying on the global one from the decorator.
const ConfirmationResultDemo = (props: ConfirmationResultProps) => (
  <ConfirmationProvider>
    <ConfirmationResult {...props} />
  </ConfirmationProvider>
);

Basic.test(
  'useConfirmation builds the dialog from the config passed to confirm()',
  { render: () => <ConfirmationResultDemo /> },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Delete file' }));

    expect(await canvas.findByRole('alertdialog')).toBeInTheDocument();
    expect(canvas.getByText('This cannot be undone.')).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  }
);

Basic.test(
  'Dismissing with Escape resolves the confirmation as cancelled',
  { render: () => <ConfirmationResultDemo /> },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Delete file' }));
    await canvas.findByRole('alertdialog');

    await userEvent.keyboard('{Escape}');

    expect(await canvas.findByText('resolved: cancelled')).toBeInTheDocument();
  }
);

Basic.test(
  'Pressing cancel resolves the confirmation as cancelled',
  { render: () => <ConfirmationResultDemo /> },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Delete file' }));
    await canvas.findByRole('alertdialog');

    await userEvent.click(canvas.getByRole('button', { name: 'Cancel' }));

    expect(await canvas.findByText('resolved: cancelled')).toBeInTheDocument();
  }
);

Basic.test(
  'Confirming resolves as confirmed even though closing also settles the promise',
  { render: () => <ConfirmationResultDemo /> },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Delete file' }));
    await canvas.findByRole('alertdialog');

    await userEvent.click(canvas.getByRole('button', { name: 'Delete' }));

    expect(await canvas.findByText('resolved: confirmed')).toBeInTheDocument();
  }
);

Basic.test(
  'useConfirmation forwards autoFocusButton from the confirm() config',
  { render: () => <ConfirmationResultDemo autoFocusButton="action" /> },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Delete file' }));

    const confirmButton = await canvas.findByRole('button', { name: 'Delete' });
    await waitFor(() => expect(confirmButton).toHaveFocus());
  }
);
