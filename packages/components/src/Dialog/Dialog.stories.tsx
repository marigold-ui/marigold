/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Body } from '../Body';
import { Button } from '../Button';
import { Checkbox, CheckboxGroup } from '../Checkbox';
import { Container } from '../Container';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Inline } from '../Inline';
import { Menu } from '../Menu';
import { ModalProps } from '../Overlay/Modal';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { TextField } from '../TextField';
import { Dialog } from './Dialog';

const meta = {
  title: 'Components/Dialog',
  argTypes: {
    dismissable: {
      control: { type: 'boolean' },
      description: 'Set dismissable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    keyboardDismissable: {
      control: { type: 'boolean' },
      description: 'Set keyboardDismissable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
  },
  args: {
    dismissable: true,
    keyboardDismissable: true,
  },
} satisfies Meta<ModalProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    return (
      <Dialog.Trigger {...args}>
        <Button variant="primary">Open</Button>
        <Dialog closeButton>
          <Dialog.Headline>This is a headline!</Dialog.Headline>
          <Text>This is some not so very long text.</Text>
        </Dialog>
      </Dialog.Trigger>
    );
  },
};

export const Form: Story = {
  render: args => {
    return (
      <Dialog.Trigger {...args}>
        <Button variant="primary">Open</Button>
        <Dialog>
          {({ close }) => (
            <>
              <Dialog.Headline>Please log into account</Dialog.Headline>
              <Stack space={4}>
                <TextField label="Username" />
                <TextField label="Password" type="password" />
                <Inline space={4}>
                  <Button variant="ghost" onPress={close}>
                    Cancel
                  </Button>
                  <Button variant="primary">Login</Button>
                </Inline>
              </Stack>
            </>
          )}
        </Dialog>
      </Dialog.Trigger>
    );
  },
};

export const CustomTitleProps: Story = {
  render: args => (
    <Dialog.Trigger {...args}>
      <Button variant="primary">Open</Button>
      <Dialog closeButton aria-labelledby="my-cool-headline">
        <Dialog.Headline>This is a headline!</Dialog.Headline>
        <Text>This is some not so very long text.</Text>
      </Dialog>
    </Dialog.Trigger>
  ),
};

export const ScrollableContent: Story = {
  render: args => (
    <Dialog.Trigger {...args}>
      <Button variant="primary">Open</Button>
      <Dialog closeButton aria-labelledby="my-cool-headline">
        <Container>
          <Header>
            <Dialog.Headline id="my-cool-headline">
              This is a headline!
            </Dialog.Headline>
          </Header>
          <Body>
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
          </Body>
          <Footer>
            <Button variant="primary">ok</Button>
          </Footer>
        </Container>
      </Dialog>
    </Dialog.Trigger>
  ),
};

export const StickyFooter: Story = {
  render: args => (
    <Dialog.Trigger {...args}>
      <Button variant="primary">Open</Button>
      <Dialog closeButton aria-labelledby="my-cool-headline">
        <div className="flex max-h-[400px] flex-col">
          <Header>
            <Dialog.Headline id="my-cool-headline">
              This is a headline!
            </Dialog.Headline>
            <Text>This is some additional text that is always visible!</Text>
          </Header>
          <div className="max-w-[400px] flex-1 overflow-y-auto">
            <Body>
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
            </Body>
          </div>
          <Footer>
            <Button variant="primary">Ok</Button>
          </Footer>
        </div>
      </Dialog>
    </Dialog.Trigger>
  ),
};

export const WithDialogController: Story = {
  render: args => {
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
          <Menu.Item key="save">Save</Menu.Item>
          <Menu.Item key="delete">Delete</Menu.Item>
        </Menu>
        <Dialog.Trigger open={open} onOpenChange={setDialogOpen} {...args}>
          <Dialog closeButton>
            {({ close }) => (
              <Stack space={5}>
                <Header>
                  <Dialog.Headline>Confirm delete</Dialog.Headline>
                </Header>
                <Body>
                  <Text>Do you really wanna delete this?</Text>
                </Body>
                <Footer>
                  <Inline space={5}>
                    <Button size="small" variant="ghost" onPress={close}>
                      Cancel
                    </Button>
                    <Button size="small" variant="primary" onPress={close}>
                      Delete
                    </Button>
                  </Inline>
                </Footer>
              </Stack>
            )}
          </Dialog>
        </Dialog.Trigger>
      </>
    );
  },
};
