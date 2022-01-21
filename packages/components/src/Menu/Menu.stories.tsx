import React, { useState } from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Menu } from './Menu';
import { MenuItem } from '../MenuItem';

export default {
  title: 'Components/Menu',
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: '?',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    label: {
      control: {
        type: 'text',
      },
      description: 'Menu label on hover',
      defaultValue: 'Menu',
    },
    show: {
      control: {
        type: 'boolean',
      },
      options: [true, false],
      description: 'Show what',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    onClick: {
      control: {
        type: 'text',
      },
      description: 'Function to show menu or toggle something',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Menu> = ({ onClick, ...args }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Menu onClick={() => setShowMenu(!showMenu)} show={showMenu} {...args}>
      <MenuItem href="#">Home</MenuItem>
      <MenuItem href="#">Tickets</MenuItem>
      <MenuItem href="#">Logout</MenuItem>
    </Menu>
  );
};
