import type { StoryObj } from '@storybook/react';
import { useState } from 'storybook/preview-api';
import { Button } from '../Button';
import { Menu } from '../Menu';
import { Text } from '../Text';
import { TextField } from '../TextField';
import {
  ConfirmationDialog,
  ConfirmationDialogProps,
} from './ConfirmationDialog';
import { Dialog } from './Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Trigger,
  argTypes: {
    dismissable: {
      control: { type: 'boolean' },
      description: 'Set dismissable',
    },
    keyboardDismissable: {
      control: { type: 'boolean' },
      description: 'Set keyboardDismissable',
    },
    size: {
      control: {
        type: 'radio',
      },
      description: 'Size of the dialog',
      options: ['default', 'xsmall', 'small', 'medium'],
      mapping: {
        default: undefined,
        xsmall: 'xsmall',
        small: 'small',
        medium: 'medium',
      },
    },
  },
  args: {
    dismissable: true,
    keyboardDismissable: true,
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<{
  size?: string;
  dismissable?: boolean;
  keyboardDismissable?: boolean;
}>;

export const Basic: Story = {
  render: ({ size, ...args }) => (
    <Dialog.Trigger {...args}>
      <Button variant="primary">Open</Button>
      <Dialog size={size} closeButton>
        <Dialog.Title>Enable notifications</Dialog.Title>
        <Dialog.Content>
          Would you like to receive notifications for upcoming events and
          updates?
        </Dialog.Content>
        <Dialog.Actions>
          <Button variant="secondary" slot="close">
            Cancel
          </Button>
          <Button variant="primary" slot="close">
            Enable
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Dialog.Trigger>
  ),
};

export const Form: Story = {
  render: ({ size, ...args }) => {
    return (
      <Dialog.Trigger {...args}>
        <Button variant="primary">Open</Button>
        <Dialog size={size} closeButton>
          <Dialog.Title>Please log into account</Dialog.Title>
          <Dialog.Content>
            <TextField label="Username" />
            <TextField label="Password" type="password" />
          </Dialog.Content>
          <Dialog.Actions>
            <Button slot="close" variant="secondary">
              Cancel
            </Button>
            <Button
              variant="primary"
              slot="close"
              onPress={() => alert('Dialog will be closed')}
            >
              Login
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Dialog.Trigger>
    );
  },
};

export const OpenFromMenu: Story = {
  render: () => {
    const [open, setDialogOpen] = useState(false);
    const handleAction = (action: 'save' | 'delete') => {
      switch (action) {
        case 'save':
          alert('saved!');
          break;
        case 'delete':
          setDialogOpen(true);
          break;
        default:
          throw new Error(`Unhandled action "${action}"!`);
      }
    };

    return (
      <>
        <Menu onAction={handleAction} label="Settings">
          <Menu.Item key="save" id="save">
            Save
          </Menu.Item>
          <Menu.Item key="delete" id="delete">
            Delete
          </Menu.Item>
        </Menu>
        <Dialog open={open} onOpenChange={setDialogOpen} closeButton>
          {({ close }) => (
            <>
              <Dialog.Title>Confirm delete</Dialog.Title>
              <Dialog.Content>
                <Text>Do you really wanna delete this?</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button slot="close">Cancel</Button>
                <Button variant="destructive" onPress={close}>
                  Delete
                </Button>
              </Dialog.Actions>
            </>
          )}
        </Dialog>
      </>
    );
  },
};

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
