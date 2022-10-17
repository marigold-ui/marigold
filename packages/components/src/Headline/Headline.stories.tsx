import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Headline } from './Headline';

export default {
  title: 'Components/Headline',
  argTypes: {
    level: {
      control: {
        type: 'select',
      },
      options: ['1', '2', '3', '4', '5', '6'],
      description: 'Level of the headline',
    },
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variant of the headline',
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'The size of the headline',
    },
    align: {
      control: {
        type: 'text',
      },
      description: 'Set the text-align of the component',
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
  },
} as Meta;

export const Basic: ComponentStory<typeof Headline> = args => (
  <Headline {...args}>This is a Headline!!</Headline>
);
