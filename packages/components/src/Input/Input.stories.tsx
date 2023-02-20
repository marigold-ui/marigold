import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import isChromatic from 'chromatic';
const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'Input variant',
    },
    type: {
      control: {
        type: 'select',
      },
      options: [
        'date',
        'datetime-local',
        'email',
        'month',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'time',
        'time',
        'url',
        'week',
      ],
      defaultValue: 'text',
    },
    pattern: {
      control: {
        type: 'text',
      },
      description: 'Pattern for the input',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <Input placeholder="Placeholder..." {...args} />,
};

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
