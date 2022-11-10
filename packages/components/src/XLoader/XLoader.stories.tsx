import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { XLoader } from './XLoader';

export default {
  title: 'Components/XLoader',
  argTypes: {
    size: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: {
          summary: 150,
        },
      },
    },
    fill: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: {},
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof XLoader> = args => (
  <XLoader {...args} />
);
