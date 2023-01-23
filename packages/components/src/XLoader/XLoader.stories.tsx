import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { XLoader } from './XLoader';
import isChromatic from 'chromatic';

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

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
