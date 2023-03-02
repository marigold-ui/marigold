import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import isChromatic from 'chromatic';

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
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Hint that the related control required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    required: false,
    children: 'Label',
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: ({ children, ...args }) => <Label {...args}>{children}</Label>,
};

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
