import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Link } from './Link';
import { Text } from '../Text';

export default {
  title: 'Components/Link',
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
      defaultValue: 'https://marigold-ui.io',
      description: 'The URL to direct to',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Link> = args => (
  <Text>
    Zu den
    <Link target="_blank" {...args}>
      Marigold Docs
    </Link>
  </Text>
);
