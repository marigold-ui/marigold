import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { XLoader } from './XLoader';
import isChromatic from 'chromatic';

const meta = {
  title: 'Components/XLoader',
  component: XLoader,
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
  },
} satisfies Meta<typeof XLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: args => <XLoader {...args} /> };

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
