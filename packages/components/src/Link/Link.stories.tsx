import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { Text } from '../Text';

const meta = {
  title: 'Components/Link',
  component: Link,
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: '?',
    },
    href: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'https://marigold-ui.io' },
      },
      description: 'The URL to direct to',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    disabled: false,
    href: 'https://marigold-ui.io',
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Text>
      Zu den{' '}
      <Link target="_blank" {...args}>
        Marigold Docs
      </Link>
    </Text>
  ),
};
