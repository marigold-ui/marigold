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
      <li>asasd</li>
    </Menu>
  </MenuTrigger>
);
