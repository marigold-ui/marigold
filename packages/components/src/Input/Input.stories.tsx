import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import isChromatic from 'chromatic';
import { Search, Delete } from '@marigold/icons';
import { Button } from '../Button';
import { Input } from './Input';
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
  },
  args: {
    type: 'text',
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

export const WithLeadingIcons: Story = {
  render: () => <Input placeholder="Placeholder..." icon={<Search />} />,
};

export const WithAction: Story = {
  render: () => (
    <Input
      placeholder="Placeholder..."
      action={
        <Button size="small" variant="text">
          <Delete />
        </Button>
      }
    />
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Input
      placeholder="Placeholder..."
      icon={<Search />}
      action={
        <Button size="small" variant="text">
          <Delete />
        </Button>
      }
    />
  ),
};
