import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accessibility } from 'lucide-react';
import { Stack } from '../Stack/Stack';
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
        'primary',
        'success',
        'warning',
        'info',
        'error',
        'master',
        'admin',
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
        defaultValue: { summary: 'Status' },
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    children: 'Status',
    variant: 'info',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: args => <Badge {...args} /> };

export const All: Story = {
  render: args => (
    <Stack space={2} alignX="left">
      <Badge {...args} variant="default" />
      <Badge {...args} variant="primary" />
      <Badge {...args} variant="success" />
      <Badge {...args} variant="warning" />
      <Badge {...args} variant="info" />
      <Badge {...args} variant="error" />
      <Badge {...args} variant="master" />
      <Badge {...args} variant="admin" />
    </Stack>
  ),
};

export const Icon: Story = {
  parameters: {
    controls: { exclude: ['children'] },
  },
  render: args => (
    <Badge {...args}>
      <Accessibility />
    </Badge>
  ),
};
