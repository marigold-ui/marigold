import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Text } from '../Text';
import { Inline } from './Inline';
import { Check } from '@marigold/icons';

export default {
  title: 'Components/Inline',
  argTypes: {
    space: {
      control: {
        type: 'select',
      },
      options: [
        'none',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
      ],
      description: 'Responsive Style Value',
      table: {
        defaultValue: {
          summary: 'none',
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Inline> = args => (
  <Inline {...args}>
    <Check />
    <Text>Check</Text>
  </Inline>
);
