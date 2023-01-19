import React, { useState } from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Button } from '../Button';
import { Menu } from './Menu';
import { SettingDots } from '@marigold/icons';

export default {
  title: 'Components/Menu',
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Menu.Trigger> = args => {
  const [selected, setSelected] = useState<string | number>('');
  return (
    <>
      <Menu.Trigger {...args}>
        <Button variant="menu" size="small">
          Choose Menu
        </Button>
        <Menu onSelect={setSelected}>
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
};

export const MenuOnly: ComponentStory<typeof Menu> = () => (
  <Menu aria-label="Only a Menu">
    <Menu.Item key="burger">🍔 Burger</Menu.Item>
    <Menu.Item key="pizza">🍕 Pizza</Menu.Item>
    <Menu.Item key="salad">🥗 Salad</Menu.Item>
    <Menu.Item key="fries">🍟 Fries</Menu.Item>
  </Menu>
);

export const DotMenu: ComponentStory<typeof Menu> = args => (
  <Menu.Trigger {...args}>
    <Button variant="menu" size="small">
      <SettingDots />
    </Button>
    <Menu>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="duplicate">Duplicate</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  </Menu.Trigger>
);

MenuOnly.parameters = {
  // Set the viewports in Chromatic at a story level.
  chromatic: { viewports: [320, 1200] },
};
