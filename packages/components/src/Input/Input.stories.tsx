import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import isChromatic from 'chromatic';
import { Search, Delete } from '@marigold/icons';
import { Button } from '../Button';
import { InputField } from './InputField';
const meta = {
  title: 'Components/Input',
  argTypes: {
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
    args: {
      type: 'text',
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Input>
      <Input.Field placeholder="Placeholder..." {...args} />
    </Input>
  ),
};

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};

export const WithIcons: Story = {
  render: args => (
    <Input>
      <Search />
      <Input.Field placeholder="Placeholder..." />
      <Button size="small" variant="text">
        <Delete />
      </Button>
    </Input>
  ),
};
