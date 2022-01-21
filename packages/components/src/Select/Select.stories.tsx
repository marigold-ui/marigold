import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Select } from './Select';
import { Item } from '@marigold/components';

export default {
  title: 'Components/Select',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: {
          summary: 'Select label',
        },
      },
      defaultValue: 'Favorite Color',
    },
    placeholder: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: {
          summary: 'Select an option',
        },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      options: [true, false],
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
      options: [true, false],
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Error',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Error Message',
    },
    width: {
      control: 'number',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Select> = args => (
  <Select {...args}>
    <Item>Red</Item>
    <Item>Orange</Item>
    <Item>Yellow</Item>
  </Select>
);
