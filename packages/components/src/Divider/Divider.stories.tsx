import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Divider } from './Divider';
import { Text } from '../Text';

export default {
  title: 'Components/Divider',
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['base', 'bold'],
      description: 'Thick or thin line',
      table: {
        defaultValue: {
          summary: 'base',
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Divider> = args => (
  <>
    <Text>Above</Text>
    <Divider {...args} />
    <Text>Below</Text>
  </>
);
