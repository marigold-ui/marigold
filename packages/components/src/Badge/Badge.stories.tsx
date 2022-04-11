import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Badge } from './Badge';

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
    children: {
      control: {
        type: 'text',
      },
      description: 'Contents of the badge',
      defaultValue: 'new',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Badge> = args => <Badge {...args} />;
