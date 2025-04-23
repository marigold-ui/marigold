import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
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
    children: {
      control: {
        type: 'text',
      },
      description: 'deprecated use `label` instead',
      table: {
        type: { summary: 'string' },
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
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <Checkbox size="small" {...args} defaultChecked />,
};

export const WithFieldGroup: Story = {
  render: args => (
    <FieldGroup labelWidth="100px">
      <Checkbox {...args} />
    </FieldGroup>
  ),
};
