import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Accessible } from '../icons';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: [
        'default',
        'inverted',
        'success',
        'info',
        'warning',
        'error',
        'primary',
        'secondary',
      ],
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
    size: {
      table: {
        disable: true,
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

export const Icon: Story = {
  parameters: {
    controls: { exclude: ['children'] },
  },
  render: args => (
    <Badge {...args}>
      <Accessible />
    </Badge>
  ),
};
