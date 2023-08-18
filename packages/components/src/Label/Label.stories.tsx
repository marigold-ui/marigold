import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Label } from './Label';

const meta = {
  title: 'Components/Label',
  component: Label,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'Text of the label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Label' },
      },
    },
    labelWidth: {
      control: {
        type: 'text',
      },
      description: 'change width of label',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    children: 'Label',
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: ({ children, ...args }) => (
    <Label labelWidth="500px" {...args}>
      {children}
    </Label>
  ),
};
