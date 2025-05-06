import { useState } from '@storybook/preview-api';
import type { StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Checkbox, CheckboxGroup } from '../Checkbox';
import { Menu } from '../Menu';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { TextField } from '../TextField';
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

export const CustomTitleProps: Story = {
  render: ({ size, ...args }) => (
    <Dialog.Trigger {...args}>
      <Button variant="primary">Open</Button>
      <Dialog size={size} closeButton aria-labelledby="my-cool-headline">
        <Dialog.Title>This is a headline!</Dialog.Title>
        <Dialog.Content>
          <Text>This is some not so very long text.</Text>
        </Dialog.Content>
      </Dialog>
    </Dialog.Trigger>
  ),
};

export const ScrollableContent: Story = {
  render: ({ size, ...args }) => (
    <Dialog.Trigger {...args}>
      <Button variant="primary">Open</Button>
      <Dialog size={size} closeButton aria-labelledby="my-cool-headline">
        <Dialog.Title>This is a headline!</Dialog.Title>
        <Dialog.Content>
          <Stack space={2}>
            <Text>This is some not so very long text.</Text>
            <div className="max-h-[200px] overflow-y-auto pb-2 pl-2">
              <CheckboxGroup>
                <Checkbox value="one">One</Checkbox>
                <Checkbox value="two">Two</Checkbox>
                <Checkbox value="three">Three</Checkbox>
                <Checkbox value="four">Four</Checkbox>
                <Checkbox value="five">Five</Checkbox>
                <Checkbox value="six">Six</Checkbox>
                <Checkbox value="seven">Seven</Checkbox>
                <Checkbox value="eight">Eight</Checkbox>
                <Checkbox value="nine">Nine</Checkbox>
                <Checkbox value="ten">Ten</Checkbox>
              </CheckboxGroup>
            </div>
          </Stack>
        </Dialog.Content>
        <Dialog.Actions>
          <Button variant="primary">ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Dialog.Trigger>
  ),
};

export const StickyFooter: Story = {
  render: ({ size, ...args }) => (
    <Dialog.Trigger {...args}>
      <Button variant="primary">Open</Button>
      <Dialog size={size} closeButton aria-labelledby="my-cool-headline">
        <Dialog.Title>This is a headline!</Dialog.Title>
        <div className="flex max-h-[400px] flex-col">
          <Text>This is some additional text that is always visible!</Text>
          <div className="max-w-[400px] flex-1 overflow-y-auto">
            <Dialog.Content>
              <Text>
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Vestibulum tortor quam,
                feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu
                libero sit amet quam egestas semper. Aenean ultricies mi vitae
                est. Mauris placerat eleifend leo. Quisque sit amet est et
                sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum
                sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum,
                elit eget tincidunt condimentum, eros ipsum rutrum orci,
                sagittis tempus lacus enim ac dui. Donec non enim in turpis
                pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus
                faucibus, tortor neque egestas augue, eu vulputate magna eros eu
                erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis,
                accumsan porttitor, facilisis luctus, metus
              </Text>
            </Dialog.Content>
          </div>
          <Dialog.Actions>
            <Button variant="primary" slot="close">
              close
            </Button>
          </Dialog.Actions>
        </div>
      </Dialog>
    </Dialog.Trigger>
  ),
};

export const WithDialogController: Story = {
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
        <Dialog.Trigger open={open} onOpenChange={setDialogOpen}>
          <Dialog closeButton>
            {({ close }) => (
              <>
                <Dialog.Title>Confirm delete</Dialog.Title>
                <Dialog.Content>
                  <Text>Do you really wanna delete this?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button slot="close" variant="secondary">
                    Cancel
                  </Button>
                  <Button
                    slot="close"
                    variant="primary"
                    size="small"
                    onPress={close}
                  >
                    Delete
                  </Button>
                </Dialog.Actions>
              </>
            )}
          </Dialog>
        </Dialog.Trigger>
      </>
    );
  },
};
