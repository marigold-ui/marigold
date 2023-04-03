import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import { Text } from '../Text';
import isChromatic from 'chromatic';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['section', 'bold'],
      description: 'Thick or thin line',
      table: {
        defaultValue: {
          summary: 'section',
        },
      },
    },
    elementType: {
      defaultValue: 'default',
      type: 'string',
      description: 'This is to handle element type',
      name: 'name',
    },
  },
  args: {
    variant: 'section',
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <>
      <Text>Above</Text>
      <Divider {...args} />
      <Text>Below</Text>
    </>
  ),
};

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
