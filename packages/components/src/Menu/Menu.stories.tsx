/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/preview-api';
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
    disabled: {
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
    placement: {
      description:
        'The placement of the element with respect to its anchor element.',
      control: {
        type: 'select',
      },
      options: [
        'bottom',
        'bottom left',
        'bottom right',
        'bottom start',
        'bottom end',
        'top',
        'top left',
        'top right',
        'top start',
        'top end',
        'left',
        'left top',
        'left bottom',
        'start',
        'start top',
        'start bottom',
        'right',
        'right top',
        'right bottom',
        'end',
        'end top',
        'end bottom',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom' },
      },
    },
    selectionMode: {
      description: 'if the Menu can select one MenuItem',
      control: {
        type: 'select',
      },
      options: ['none', 'single', 'multiple'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
  },
  args: {
    selectionMode: 'none',
    placement: 'bottom',
    label: 'none',
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardMenu: Story = {
  render: args => {
    return (
      <Menu {...args} label="Hogwarts Houses">
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
      <Menu {...args} label="Choose" onAction={key => alert(key)}>
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
    const [selected, setSelected] = useState<Set<'left' | 'center' | 'right'>>(
      new Set(['center'])
    );

    return (
      <>
        <Menu
          label="Align"
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={setSelected as any}
        >
          <Menu.Item id="left">Left</Menu.Item>
          <Menu.Item id="center">Center</Menu.Item>
          <Menu.Item id="right">Right</Menu.Item>
        </Menu>
        <p>Current selection (controlled): {[...selected].join(', ')}</p>
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
  render: args => (
    <Menu {...args} label="Menu with sections">
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
      {...args}
      label="Menu with sections"
      disabledKeys={['mango', 'salad']}
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
    <Menu {...args} label="Links">
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
