import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { FieldGroup } from '../FieldBase/FieldGroup';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    children: {
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
    },
    indeterminate: {
      control: {
        type: 'boolean',
      },
      description: 'Option to define an indeterminate state',
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'Read only',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['default', 'small'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
      description: 'Padding y (top and bottom)',
      if: { global: 'theme', neq: 'b2b' },
    },
  },
  args: {
    readOnly: false,
    indeterminate: false,
    disabled: false,
    children: 'This is a Checkbox',
    size: 'default',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

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
