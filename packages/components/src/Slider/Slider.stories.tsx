import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Slider } from './Slider';

export default {
  title: 'Components/Slider',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'Style',
      table: {
        defaultValue: {
          summary: '__default',
        },
      },
    },
    label: {
      control: {
        type: 'text',
      },
      description: 'Slider label',
      defaultValue: 'Default Slider',
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
  },
} as Meta;

export const Basic: ComponentStory<typeof Slider> = args => (
  <Slider name="vol" min="0" max="50" {...args} />
);
