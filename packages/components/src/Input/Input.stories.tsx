import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Delete, Search } from '@marigold/icons';

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
        'file',
        'color',
      ],
      defaultValue: 'text',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disable the input',
      defaultValue: false,
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'Make input read only',
      defaultValue: false,
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

export const WithLeadingIcons: Story = {
  render: args => (
    <Input placeholder="Placeholder..." icon={<Search />} {...args} />
  ),
};

export const WithAction: Story = {
  render: args => (
    <Input
      placeholder="Placeholder..."
      action={
        <Button size="small" variant="text">
          <Delete />
        </Button>
      }
      {...args}
    />
  ),
};

export const WithIcons: Story = {
  render: args => (
    <Input
      placeholder="Placeholder..."
      icon={<Search />}
      action={
        <Button size="small" variant="text">
          <Delete />
        </Button>
      }
      {...args}
    />
  ),
};

export const FileInput: Story = {
  render: args => <Input placeholder="Placeholder..." {...args} type="file" />,
};

export const ColorPicker: Story = {
  render: args => <Input placeholder="Placeholder..." {...args} type="color" />,
};
