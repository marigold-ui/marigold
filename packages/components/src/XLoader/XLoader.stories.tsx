import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { XLoader } from './XLoader';

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
    fill: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: {},
      },
    },
  },
} satisfies Meta<typeof XLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: args => <XLoader {...args} /> };
