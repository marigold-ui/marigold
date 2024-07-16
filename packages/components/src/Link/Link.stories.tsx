import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '../Text';
import { Link } from './Link';

const meta = {
  title: 'Components/Link',
  component: Link,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['none', 'menuItemLink', 'content'],
      description: 'Variants of the link, content only for core.',
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
    },
  },
  args: {
    href: 'https://marigold-ui.io',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

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
