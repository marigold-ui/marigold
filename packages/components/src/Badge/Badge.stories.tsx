import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['default', 'inverted', 'success', 'info', 'warning', 'error'],
      description: 'The variants of the badge',
    },
    children: {
      control: {
        type: 'text',
      },
      description: 'Contents of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'new' },
      },
    },
  },
  args: {
    children: 'new',
    variant: 'info',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: args => <Badge {...args} /> };
