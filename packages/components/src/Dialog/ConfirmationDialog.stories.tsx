import type { StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import {
  ConfirmationDialog,
  ConfirmationDialogProps,
} from './ConfirmationDialog';
import { useConfirmation } from './useConfirmation';

const meta = {
  title: 'Components/ConfirmationDialog',
  component: ConfirmationDialog.Trigger,
};

export default meta;

export const Confirmation: StoryObj<ConfirmationDialogProps> = {
  render: ({ ...args }) => (
    <ConfirmationDialog.Trigger {...args}>
      <Button>Open</Button>
      <ConfirmationDialog title="Confirmation" confirmationLabel="Confirm">
        Are you sure you want to proceed with this action?
      </ConfirmationDialog>
    </ConfirmationDialog.Trigger>
  ),
};

export const UseConfirmation: StoryObj = {
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
};
