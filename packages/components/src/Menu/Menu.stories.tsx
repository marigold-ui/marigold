import { useState } from 'storybook/preview-api';
import { expect, spyOn, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { Key } from '@react-types/shared';
import { Delete } from '@marigold/icons';
import { Button } from '../Button/Button';
import { ActionMenu } from './ActionMenu';
import { Menu } from './Menu';

const meta = preview.meta({
  title: 'Components/Menu',
  component: Menu,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      description: 'Size of the button',
      options: ['default', 'small', 'large', 'icon'],
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: ['default', 'ghost'],
      description: 'Variant of the button',
    },
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
    placement: undefined,
    variant: undefined,
    size: undefined,
  },
});

export const Basic: any = meta.story({
  tags: ['component-test'],
  render: args => (
    <Menu {...args} label="Hogwarts Houses">
      <Menu.Item id="gryffindor">Gryffindor</Menu.Item>
      <Menu.Item id="hufflepuff">Hufflepuff</Menu.Item>
      <Menu.Item id="ravenclaw">Ravenclaw</Menu.Item>
      <Menu.Item id="slytherin">Slytherin</Menu.Item>
    </Menu>
  ),
  play: async ({ canvas, step }: any) => {
    await step('Open the menu', async () => {
      const button = canvas.getByText('Hogwarts Houses');

      await userEvent.click(button);

      expect(canvas.getByText('Hogwarts Houses')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(canvas.getByText('Gryffindor')).toBeVisible();
      expect(canvas.getByText('Hufflepuff')).toBeVisible();
      expect(canvas.getByText('Ravenclaw')).toBeVisible();
      expect(canvas.getByText('Slytherin')).toBeVisible();
    });

    await step('Select an item from the menu and close menu', async () => {
      const gryffindor = canvas.getByText('Gryffindor');

      await userEvent.click(gryffindor);

      expect(canvas.getByText('Hogwarts Houses')).toHaveAttribute(
        'aria-expanded',
        'false'
      );
      expect(gryffindor).not.toBeVisible();
    });
  },
});

export const OnActionMenu: any = meta.story({
  tags: ['component-test'],
  render: args => {
    return (
      <Menu onAction={key => alert(key)} {...args} label="Choose">
        <Menu.Item id="burger">🍔 Burger</Menu.Item>
        <Menu.Item id="pizza">🍕 Pizza</Menu.Item>
        <Menu.Item id="salad">🥗 Salad</Menu.Item>
        <Menu.Item id="fries">🍟 Fries</Menu.Item>
      </Menu>
    );
  },
  play: async ({ canvas }: any) => {
    const alertMock = spyOn(window, 'alert').mockImplementation(() => {});

    const button = canvas.getByText('Choose');

    await userEvent.click(button);
    await userEvent.click(canvas.getByText('🍔 Burger'));

    expect(alertMock).toHaveBeenCalledWith('burger');
    expect(alertMock).not.toHaveBeenCalledWith('pizza');

    alertMock.mockRestore();
  },
});

export const SingleSelection: any = meta.story({
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
});

export const MultiSelection: any = meta.story({
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
});

export const MenuSection: any = meta.story({
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
});

export const DisabledKeys: any = meta.story({
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
});

export const LinksMenu: any = meta.story({
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
});

export const BasicActionMenu: any = meta.story({
  render: args => {
    return (
      <ActionMenu onAction={action => alert(`Action: ${action}`)} {...args}>
        <ActionMenu.Item id="edit">Open in editor</ActionMenu.Item>
        <ActionMenu.Item id="settings">Settings</ActionMenu.Item>
        <ActionMenu.Item id="delete" variant="destructive">
          <Delete /> Delete
        </ActionMenu.Item>
      </ActionMenu>
    );
  },
});

export const OpenMenuRemotely: any = meta.story({
  render: () => {
    const [open, setOpen] = useState(false);
    const handleAction = () => {
      setOpen(!open);
    };

    return (
      <>
        <Button onPress={() => setOpen(!open)}>Open the menu remotly!</Button>
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
});
