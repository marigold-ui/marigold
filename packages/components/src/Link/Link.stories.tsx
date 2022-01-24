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
      table: {
        defaultValue: {
          summary: 'link',
        },
      },
    },
    href: {
      control: {
        type: 'text',
      },
      description: 'The URL to direct to',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Link> = args => (
  <Text>
    <Link href="https://marigold-ui.io" target="_blank" {...args}>
      Marigold Docs
    </Link>
  </Text>
);
