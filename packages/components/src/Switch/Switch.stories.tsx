import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Switch } from './Switch';

export default {
  title: 'Components/Switch',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'Switch variant style',
    },
    children: {
      control: {
        type: 'text',
      },
      description: 'Switch label',
      defaultValue: 'Default Switch',
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'Switch size style',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Switch disabled state',
      defaultValue: false,
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Switch> = args => (
  <Switch {...args} />
);
