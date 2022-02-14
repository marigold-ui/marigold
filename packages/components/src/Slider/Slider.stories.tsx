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
      description: 'variant to style the Slider track',
      table: {
        defaultValue: {
          summary: '__default',
        },
      },
    },
    labelVariant: {
      control: {
        type: 'text',
      },
      description: 'variant to style the Slider label',
      table: {
        defaultValue: {
          summary: 'above',
        },
      },
    },
    thumbVariant: {
      control: {
        type: 'text',
      },
      description: 'variant to style the Slider thumb',
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
  },
} as Meta;

export const Basic: ComponentStory<typeof Slider> = args => (
  <Slider name="vol" min="0" max="50" {...args} />
);
