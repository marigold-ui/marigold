import { expect, fn } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import { ConfirmationDialog } from './ConfirmationDialog';
import { useConfirmation } from './useConfirmation';

const meta = preview.meta({
  title: 'Components/ConfirmationDialog',
  component: ConfirmationDialog,
});

export const Confirmation = meta.story({
  args: {
    title: 'Confirmation',
    confirmationLabel: 'Confirm',
    children: 'Are you sure you want to proceed with this action?',
  },
  render: args => (
    <ConfirmationDialog.Trigger>
      <Button>Open</Button>
      <ConfirmationDialog {...args}>{args.children}</ConfirmationDialog>
    </ConfirmationDialog.Trigger>
  ),
  play: async ({ canvas }) => {
    await canvas.getByRole('button', { name: 'Open' }).click();

    expect(
      await canvas.findByText(
        'Are you sure you want to proceed with this action?'
      )
    ).toBeInTheDocument();

    await canvas.getByRole('button', { name: 'Confirm' }).click();
  },
});

export const WithCallbacks = meta.story({
  args: {
    title: 'Confirm Dialog',
    confirmationLabel: 'Confirm',
    children: 'Are you sure you want to do this?',
    onConfirm: fn(),
    onCancel: fn(),
  },
  render: args => (
    <ConfirmationDialog.Trigger defaultOpen>
      <ConfirmationDialog {...args}>{args.children}</ConfirmationDialog>
    </ConfirmationDialog.Trigger>
  ),
});

export const WithAutoFocus = meta.story({
  args: {
    title: 'Confirm Dialog',
    confirmationLabel: 'Confirm',
    children: 'Are you sure you want to do this?',
    autoFocusButton: 'action',
  },
  render: args => (
    <ConfirmationDialog.Trigger>
      <Button>Open</Button>
      <ConfirmationDialog {...args}>{args.children}</ConfirmationDialog>
    </ConfirmationDialog.Trigger>
  ),
});

export const UseConfirmation = meta.story({
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const confirm = useConfirmation();

    const onConfirmation = async () => {
      await confirm({
        title: 'Enable notifications',
        content: 'Would you like to receive notifications for upcoming events?',
        confirmationLabel: 'Enable',
        cancelLabel: 'Cancel',
      });
    };

    const onDelete = async () => {
      await confirm({
        variant: 'destructive',
        title: 'Delete item',
        content: 'Are you sure you want to delete this item?',
        confirmationLabel: 'Delete',
      });
    };

    return (
      <Stack space={4} alignX="left">
        <Button onPress={onConfirmation}>Confirm</Button>
        <Button variant="destructive" onPress={onDelete}>
          Delete
        </Button>
      </Stack>
    );
  },
});
