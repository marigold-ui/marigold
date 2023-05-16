import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variant of the text',
    },
    align: {
      control: {
        type: 'text',
      },
      description: 'The align of the text',
    },
    fontSize: {
      control: {
        type: 'text',
      },
      description: 'The font size of the text',
    },
    weight: {
      control: {
        type: 'text',
      },
      description: 'The font weight of the text',
    },
    color: {
      control: {
        type: 'text',
      },
      description: 'The color of the text',
    },
    fontStyle: {
      control: {
        type: 'text',
      },
      description: 'The font style of the text',
    },
    cursor: {
      control: {
        type: 'text',
      },
      description: 'The cursor for the text',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Text {...args}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      dignissim dapibus elit, vel egestas felis pharetra non. Cras malesuada,
      massa nec ultricies efficitur, lectus ante consequat magna, a porttitor
      massa ex ut quam.
    </Text>
  ),
};
