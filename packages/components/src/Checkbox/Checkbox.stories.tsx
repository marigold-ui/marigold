import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { FieldGroup } from '../FieldBase/FieldGroup';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Label text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'This is a Checkbox' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    indeterminate: {
      control: {
        type: 'boolean',
      },
      description: 'Option to define an indeterminate state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'Read only',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['default', 'small'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
      description: 'Padding y (top and bottom)',
      if: { global: 'theme', neq: 'b2b' },
    },
  },
  args: {
    readOnly: false,
    indeterminate: false,
    disabled: false,
    label: 'This is a Checkbox',
    size: 'default',
    defaultChecked: false,
    error: false,
    required: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  tags: ['component-test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await canvas.findByRole('checkbox');

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  },
};

export const WithFieldGroup: Story = {
  render: args => (
    <FieldGroup labelWidth="100px">
      <Checkbox {...args} />
    </FieldGroup>
  ),
};
