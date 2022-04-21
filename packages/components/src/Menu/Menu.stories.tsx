import React, { useState } from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Button } from '../Button';
import { Menu } from './Menu';
import { MenuTrigger } from './MenuTrigger';

export default {
  title: 'Components/Menu',
  argTypes: {},
} as Meta;

export const Basic: ComponentStory<any> = () => {
  const [selected, setSelected] = useState<string | number>('');
  return (
    <>
      <MenuTrigger>
        <Button>Choose Menu</Button>
        <Menu onSelect={setSelected}>
          <Menu.Item key="burger">🍔 Burger</Menu.Item>
          <Menu.Item key="pizza">🍕 Pizza</Menu.Item>
          <Menu.Item key="fries">🍟 Fries</Menu.Item>
        </Menu>
      </MenuTrigger>
      <hr />
      <pre>selected: {selected}</pre>
    </>
  );
};
