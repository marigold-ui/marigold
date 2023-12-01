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
} satisfies Meta<typeof Menu.Trigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    const [selected, setSelected] = useState<string | number>('');
    return (
      <>
        <Menu.Trigger>
          <Button variant="menu">Choose</Button>
          <Menu onAction={setSelected} label="Choose">
            <Menu.Item key="burger">🍔 Burger</Menu.Item>
            <Menu.Item key="pizza">🍕 Pizza</Menu.Item>
            <Menu.Item key="salad">🥗 Salad</Menu.Item>
            <Menu.Item key="fries">🍟 Fries</Menu.Item>
          </Menu>
        </Menu.Trigger>
        <hr />
        <pre>selected: {selected}</pre>
      </>
    );
  },
};

export const SingleSelection: Story = {
  render: () => {
    const [selectedKeys, setSelected] = useState(new Set());

    const selected = Array.from(selectedKeys);

    console.log(selected);
    return (
      <>
        <Menu.Trigger>
          <Button variant="menu">Align</Button>
          <Menu
            selectionMode="single"
            selectedKeys={selectedKeys as Iterable<Key>}
            onSelectionChange={key => setSelected(new Set(key))}
          >
            <Menu.Item id="left">Left</Menu.Item>
            <Menu.Item id="center">Center</Menu.Item>
            <Menu.Item id="right">Right</Menu.Item>
          </Menu>
        </Menu.Trigger>
        <p>Current selection (controlled): {[selected]}</p>
      </>
    );
  },
};

export const MultiSelection: Story = {
  render: () => {
    const [selectedKeys, setSelected] = useState(new Set());

    const selected = Array.from(selectedKeys);

    console.log(selected);
    return (
      <>
        <Menu.Trigger>
          <Button variant="menu">Align</Button>
          <Menu
            selectionMode="multiple"
            selectedKeys={selectedKeys as Iterable<Key>}
            onSelectionChange={key => setSelected(new Set(key))}
          >
            <Menu.Item id="left">Left</Menu.Item>
            <Menu.Item id="center">Center</Menu.Item>
            <Menu.Item id="right">Right</Menu.Item>
          </Menu>
        </Menu.Trigger>
        <p>Current selection (controlled): {[selected].join(',')}</p>
      </>
    );
  },
};

export const MenuOnly: Story = {
  render: () => (
    <Menu label="Only a Menu">
      <Menu.Item key="burger">🍔 Burger</Menu.Item>
      <Menu.Section title="Fruits">
        <Menu.Item key="pizza">🍕 Pizza</Menu.Item>
        <Menu.Item key="salad">🥗 Salad</Menu.Item>
        <Menu.Item key="fries">🍟 Fries</Menu.Item>
      </Menu.Section>
    </Menu>
  ),
};

export const MenuSection: Story = {
  render: () => (
    <Menu.Trigger>
      <Button variant="menu" size="small">
        open menu
      </Button>
      <Menu aria-label="Menu with sections">
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
    </Menu.Trigger>
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
        <Menu.Trigger open={true}>
          <Button variant="menu" size="small">
            Choose Menu
          </Button>
          <Menu onAction={handleAction}>
            <Menu.Item key="one">One</Menu.Item>
            <Menu.Item key="two">Two</Menu.Item>
          </Menu>
        </Menu.Trigger>
      </>
    );
  },
};
