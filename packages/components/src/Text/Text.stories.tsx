import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Text } from './Text';

export default {
  title: 'Components/Text',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variant of the text',
    },
    color: {
      control: {
        type: 'text',
      },
      description: 'Text color',
      table: {
        defaultValue: {
          summary: 'inherit',
        },
      },
    },
    size: {
      control: {
        type: 'select',
      },
      options: [
        undefined,
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
      ],
      description: 'Text size',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Text> = args => (
  <Text {...args}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    dignissim dapibus elit, vel egestas felis pharetra non. Cras malesuada,
    massa nec ultricies efficitur, lectus ante consequat magna, a porttitor
    massa ex ut quam.
  </Text>
);
