import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Button } from '../Button';
import { Menu } from './Menu';
import { MenuTrigger } from './MenuTrigger';

export default {
  title: 'Components/Menu',
  argTypes: {},
} as Meta;

export const Basic: ComponentStory<any> = () => (
  <MenuTrigger>
    <Button>Menu</Button>
    <Menu>
      <Menu.Item>1</Menu.Item>
      <Menu.Item>2</Menu.Item>
      <Menu.Item>3</Menu.Item>
    </Menu>
  </MenuTrigger>
);
