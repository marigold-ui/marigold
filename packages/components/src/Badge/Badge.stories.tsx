import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Badge } from './Badge';
import { Check } from '@marigold/icons';

export default {
  title: 'Components/Badge',
  argTypes: {
    variant: {
      description: 'badge variant',
      control: {
        type: 'text',
      },
      defaultValue: '',
    },
    bgColor: {
      description: 'background color',
      control: {
        type: 'text',
      },
      defaultValue: 'primary',
    },
    borderColor: {
      description: 'outline color',
      control: {
        type: 'text',
      },
      defaultValue: 'transparent',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Badge> = args => (
  <Badge {...args}>
    <Check /> Check
  </Badge>
);
