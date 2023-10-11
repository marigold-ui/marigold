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
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    indeterminate: {
      control: {
        type: 'boolean',
      },
      description: 'Option to define an indeterminate state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'Read only',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
  args: {
    readOnly: false,
    indeterminate: false,
    disabled: false,
    children: 'This is a Checkbox',
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

export const RACCheckbox: Story = {
  render: args => <Checkbox {...args}>Unsubscribe</Checkbox>,
};
