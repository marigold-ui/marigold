import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import isChromatic from 'chromatic';

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

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
