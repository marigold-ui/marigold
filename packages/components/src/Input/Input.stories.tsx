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
      description: 'Set the type of the input.',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'Disable the input',
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'Make input read only',
    },
    pattern: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: 'none' },
      },
      description: 'Pattern for the input',
    },
    placeholder: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: 'none' },
      },
      description: 'Placeholder for the input',
    },
  },
  args: {
    type: 'text',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

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
        <Button
          size="small"
          variant="text"
          onPress={() => alert('Action executed')}
        >
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
