/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Headline } from '../Headline';
import { Inline } from '../Inline';
import { Text } from '../Text';
import { Dialog } from './Dialog';
import { TextField } from '../TextField';
import { Stack } from '../Stack';
import { Body } from '../Body';
import { Container } from '../Container';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Checkbox, CheckboxGroup } from '../Checkbox';
import { Box } from '@marigold/system';
import { Menu } from '../Menu';

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
} satisfies Meta<typeof Dialog.Trigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    return (
      <>
        <Dialog.Trigger {...args}>
          <Button variant="primary">Open</Button>
          <Dialog closeButton>
            <Headline>This is a headline!</Headline>
            <Text>This is some not so very long text.</Text>
          </Dialog>
        </Dialog.Trigger>
      </>
    );
  },
};

export const Form: Story = {
  render: args => {
    return (
      <>
        <Dialog.Trigger {...args}>
          <Button variant="primary">Open</Button>
          <Dialog>
            {({ close, titleProps }) => (
              <>
                <Headline {...titleProps}>Please log into account</Headline>
                <Stack space="small">
                  <TextField label="Username" />
                  <TextField label="Password" type="password" />
                  <Inline space="medium">
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
      </>
    );
  },
};

export const CustomTitleProps: Story = {
  render: args => (
    <Dialog.Trigger {...args}>
      <Button variant="primary">Open</Button>
      <Dialog closeButton aria-labelledby="my-cool-headline">
        <Headline id="my-cool-headline">This is a headline!</Headline>
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
            <Headline id="my-cool-headline">This is a headline!</Headline>
          </Header>
          <Body>
            <Stack space="small">
              <Text>This is some not so very long text.</Text>
              <Box
                css={{
                  pl: 'small',
                  pb: 'xsmall',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                <CheckboxGroup>
                  <Checkbox>One</Checkbox>
                  <Checkbox>Two</Checkbox>
                  <Checkbox>Three</Checkbox>
                  <Checkbox>Four</Checkbox>
                  <Checkbox>Five</Checkbox>
                  <Checkbox>Six</Checkbox>
                  <Checkbox>Seven</Checkbox>
                  <Checkbox>Eight</Checkbox>
                  <Checkbox>Nine</Checkbox>
                  <Checkbox>Ten</Checkbox>
                </CheckboxGroup>
              </Box>
            </Stack>
          </Body>
          <Footer>
            <Button variant="primary">Ok</Button>
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
        <Box css={{ display: 'flex', flexDirection: 'column', maxHeight: 400 }}>
          <Header>
            <Headline id="my-cool-headline">This is a headline!</Headline>
            <Text>This is some additional text that is always visible!</Text>
          </Header>
          <Box css={{ flex: 1, overflowY: 'auto', maxWidth: 400 }}>
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
          </Box>
          <Footer>
            <Button variant="primary">Ok</Button>
          </Footer>
        </Box>
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
        <Menu.Trigger>
          <Button variant="menu" size="small">
            Settings
          </Button>
          <Menu onAction={handleAction}>
            <Menu.Item key="save">Save</Menu.Item>
            <Menu.Item key="delete">Delete</Menu.Item>
          </Menu>
        </Menu.Trigger>
        <Dialog.Controller open={open} onOpenChange={setDialogOpen}>
          <Dialog closeButton>
            {({ close, titleProps }) => (
              <Stack space="medium">
                <Header>
                  <Headline {...titleProps}>Confirm delete</Headline>
                </Header>
                <Body>
                  <Text>Do you really wanna delete this?</Text>
                </Body>
                <Footer>
                  <Inline space="medium">
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
        </Dialog.Controller>
      </>
    );
  },
};
