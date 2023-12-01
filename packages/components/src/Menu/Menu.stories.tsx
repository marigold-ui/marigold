/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/addons';
import type { Meta, StoryObj } from '@storybook/react';

import { Key } from '@react-types/shared';

import { Button } from '../Button';
import { ActionMenu } from './ActionMenu';
import { Menu } from './MenuTrigger';

const meta = {
  title: 'Components/Menu',
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    open: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardMenu: Story = {
  render: args => {
    return (
      <Menu label="Hogwarts Houses" {...args}>
        <Menu.Item id="gryffindor">🦁 Gryffindor</Menu.Item>
        <Menu.Item id="hufflepuff">🦡 Hufflepuff</Menu.Item>
        <Menu.Item id="ravenclaw">🐦‍⬛ Ravenclaw</Menu.Item>
        <Menu.Item id="slytherin">🐍 Slytherin</Menu.Item>
      </Menu>
    );
  },
};

export const OnActionMenu: Story = {
  render: args => {
    return (
      <Menu label="Choose" onAction={alert} {...args}>
        <Menu.Item id="burger">🍔 Burger</Menu.Item>
        <Menu.Item id="pizza">🍕 Pizza</Menu.Item>
        <Menu.Item id="salad">🥗 Salad</Menu.Item>
        <Menu.Item id="fries">🍟 Fries</Menu.Item>
      </Menu>
    );
  },
};

export const SingleSelection: Story = {
  render: () => {
    const [selectedKeys, setSelected] = useState(new Set());
    const selected = Array.from(selectedKeys);

    return (
      <>
        <Menu
          label="Align"
          selectionMode="single"
          selectedKeys={selectedKeys as Iterable<Key>}
          onSelectionChange={key => setSelected(new Set(key))}
        >
          <Menu.Item id="left">Left</Menu.Item>
          <Menu.Item id="center">Center</Menu.Item>
          <Menu.Item id="right">Right</Menu.Item>
        </Menu>
        <p>Current selection (controlled): {[selected]}</p>
      </>
    );
  },
};

export const MultiSelection: Story = {
  render: () => {
    const [selectedKeys, setSelected] = useState(new Set());
    const selected = Array.from(selectedKeys);

    return (
      <>
        <Menu
          label="Choose"
          selectionMode="multiple"
          selectedKeys={selectedKeys as Iterable<Key>}
          onSelectionChange={key => setSelected(new Set(key))}
        >
          <Menu.Item id="burger">🍔 Burger</Menu.Item>
          <Menu.Item id="pizza">🍕 Pizza</Menu.Item>
          <Menu.Item id="salad">🥗 Salad</Menu.Item>
          <Menu.Item id="fries">🍟 Fries</Menu.Item>
        </Menu>
        <p>Current selection (controlled): {[selected].join(',')}</p>
      </>
    );
  },
};

export const MenuSection: Story = {
  render: () => (
    <Menu label="Menu with sections">
      <Menu.Section title="Food">
        <Menu.Item key="pizza">🍕 Pizza</Menu.Item>
        <Menu.Item key="salad">🥗 Salad</Menu.Item>
        <Menu.Item key="fries">🍟 Fries</Menu.Item>
      </Menu.Section>
      <Menu.Section title="Fruits">
        <Menu.Item key="apple">🍎 Apple</Menu.Item>
        <Menu.Item key="banana">🍌 Banana</Menu.Item>
        <Menu.Item key="mango">🥭 Mango</Menu.Item>
        <Menu.Item key="strawberry">🍓 Strawberry</Menu.Item>
      </Menu.Section>
    </Menu>
  ),
};

export const LinksMenu: Story = {
  render: () => (
    <Menu label="Links">
      <Menu.Item href="https://adobe.com/" target="_blank">
        Adobe
      </Menu.Item>
      <Menu.Item href="https://apple.com/" target="_blank">
        Apple
      </Menu.Item>
      <Menu.Item href="https://google.com/" target="_blank">
        Google
      </Menu.Item>
      <Menu.Item href="https://microsoft.com/" target="_blank">
        Microsoft
      </Menu.Item>
    </Menu>
  ),
};

export const BasicActionMenu: Story = {
  render: args => {
    return (
      <ActionMenu onAction={action => alert(`Action: ${action}`)}>
        <Menu.Item key="edit">Open in editor</Menu.Item>
        <Menu.Item key="settings">Settings</Menu.Item>
        <Menu.Item key="delete">Delete</Menu.Item>
      </ActionMenu>
    );
  },
};

export const OpenMenuRemotely: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const handleAction = () => {
      setOpen(!open);
    };

    return (
      <>
        <Button variant="primary" onPress={() => setOpen(!open)}>
          Open the menu remotly!
        </Button>
        <hr />
        <Menu onOpenChange={handleAction} open={open} label="Menu">
          <Menu.Item key="one">One</Menu.Item>
          <Menu.Item key="two">Two</Menu.Item>
        </Menu>
      </>
    );
  },
};
