import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Radio, Stack } from '@marigold/components';

const meta = {
  title: 'Components/Radio',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Label' },
      },
    },
    orientation: {
      control: {
        type: 'select',
      },
      options: ['horizontal', 'vertical'],
      description: 'Orientation',
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'vertical' },
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Required',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disabled',
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Error',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
  args: {
    label: 'Label',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: args => (
    <Radio.Group
      {...args}
      description="Hier steht ein HelpText"
      defaultValue="1"
    >
      <Radio value="1">Option 1</Radio>
      <Radio value="2">Option 2</Radio>
      <Radio value="3" disabled>
        Option 3
      </Radio>
      <Radio value="4">Option 4</Radio>
    </Radio.Group>
  ),
};

export const Error: Story = {
  render: args => (
    <Radio.Group errorMessage="Das ist ein Error" error {...args}>
      <Radio value="1">Option 1</Radio>
      <Radio value="2">Option 2</Radio>
      <Radio value="3" disabled>
        Option 3
      </Radio>
      <Radio value="4">Option 4</Radio>
    </Radio.Group>
  ),
};

export const DefaultSelected: Story = {
  render: args => (
    <Radio.Group {...args} defaultValue="2">
      <Radio value="1">Option 1</Radio>
      <Radio value="2">Option 2</Radio>
      <Radio value="3" disabled>
        Option 3
      </Radio>
      <Radio value="4">Option 4</Radio>
    </Radio.Group>
  ),
};

export const Controlled: Story = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('2');
    return (
      <Stack space={4}>
        <Radio.Group
          {...args}
          description="Hier steht ein HelpText"
          value={value}
          onChange={setValue}
        >
          <Radio value="1">Option 1</Radio>
          <Radio value="2">Option 2</Radio>
          <Radio value="3" disabled>
            Option 3
          </Radio>
          <Radio value="4">Option 4</Radio>
        </Radio.Group>
        <pre>
          <code>Current value: {value}</code>
        </pre>
      </Stack>
    );
  },
};
