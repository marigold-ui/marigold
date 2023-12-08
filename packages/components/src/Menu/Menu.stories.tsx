/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/addons';
import type { Meta, StoryObj } from '@storybook/react';

import { Key } from '@react-types/shared';

import { Button } from '../Button';
import { ActionMenu } from './ActionMenu';
import { Menu } from './Menu';

const meta = {
  title: 'Components/Menu',
  argTypes: {
    open: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
      },
    },
    label: {
      control: {
        type: 'text',
      },
      description: 'The text for the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variant of the menu (currently no variant).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'The size of the menu (currently no size).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    selectionMode: {
      description: 'if the Menu can select one MenuItem',
      control: {
        type: 'select',
      },
      options: ['none', 'single', 'multiple'],
      table: {
        defaultValue: 'none',
      },
    },
    disabledKeys: {
      description: 'Disabled Items, you have to set the id name',
      control: {
        type: 'object',
      },
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {},
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
  render: args => {
    const [selectedKeys, setSelected] = useState(new Set());
    const selected = Array.from(selectedKeys);

    return (
      <>
        <Menu
          label="Align"
          selectionMode="single"
          selectedKeys={selectedKeys as Iterable<Key>}
          onSelectionChange={key => setSelected(new Set(key))}
          {...args}
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
  render: args => {
    const [selectedKeys, setSelected] = useState(new Set());
    const selected = Array.from(selectedKeys);

    return (
      <>
        <Menu
          label="Choose"
          selectionMode="multiple"
          selectedKeys={selectedKeys as Iterable<Key>}
          onSelectionChange={key => setSelected(new Set(key))}
          {...args}
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
  render: args => (
    <Menu label="Menu with sections" {...args}>
      <Menu.Section title="Food">
        <Menu.Item id="pizza">🍕 Pizza</Menu.Item>
        <Menu.Item id="salad">🥗 Salad</Menu.Item>
        <Menu.Item id="fries">🍟 Fries</Menu.Item>
      </Menu.Section>
      <Menu.Section title="Fruits">
        <Menu.Item id="apple">🍎 Apple</Menu.Item>
        <Menu.Item id="banana">🍌 Banana</Menu.Item>
        <Menu.Item id="mango">🥭 Mango</Menu.Item>
        <Menu.Item id="strawberry">🍓 Strawberry</Menu.Item>
      </Menu.Section>
    </Menu>
  ),
};

export const DisabledKeys: Story = {
  render: args => (
    <Menu
      label="Menu with sections"
      disabledKeys={['mango', 'salad']}
      {...args}
    >
      <Menu.Section title="Food">
        <Menu.Item id="pizza">🍕 Pizza</Menu.Item>
        <Menu.Item id="salad">🥗 Salad</Menu.Item>
        <Menu.Item id="fries">🍟 Fries</Menu.Item>
      </Menu.Section>
      <Menu.Section title="Fruits">
        <Menu.Item id="apple">🍎 Apple</Menu.Item>
        <Menu.Item id="banana">🍌 Banana</Menu.Item>
        <Menu.Item id="mango">🥭 Mango</Menu.Item>
        <Menu.Item id="strawberry">🍓 Strawberry</Menu.Item>
      </Menu.Section>
    </Menu>
  ),
};

export const LinksMenu: Story = {
  render: args => (
    <Menu label="Links" {...args}>
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
      <ActionMenu onAction={action => alert(`Action: ${action}`)} {...args}>
        <Menu.Item id="edit">Open in editor</Menu.Item>
        <Menu.Item id="settings">Settings</Menu.Item>
        <Menu.Item id="delete">Delete</Menu.Item>
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
        <Menu
          onOpenChange={handleAction}
          open={open}
          onClose={() => setOpen(!open)}
          label="Menu"
        >
          <Menu.Item id="one">One</Menu.Item>
          <Menu.Item id="two">Two</Menu.Item>
        </Menu>
      </>
    );
  },
};
