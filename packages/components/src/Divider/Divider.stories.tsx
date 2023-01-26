import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Divider } from './Divider';
import { Text } from '../Text';
import isChromatic from 'chromatic';

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

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
