import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { MenuItem } from './MenuItem';

export default {
  title: 'Components/MenuItem',
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
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof MenuItem> = args => (
  <MenuItem href="#" {...args}>
    Home
  </MenuItem>
);
