/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/addons';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from 'react-aria-components';

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
        <Menu onAction={setSelected}>
          <Menu.Item key="burger">🍔 Burger</Menu.Item>
          <Menu.Item key="pizza">🍕 Pizza</Menu.Item>
          <Menu.Item key="salad">🥗 Salad</Menu.Item>
          <Menu.Item key="fries">🍟 Fries</Menu.Item>
        </Menu>
        <hr />
        <pre>selected: {selected}</pre>
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
