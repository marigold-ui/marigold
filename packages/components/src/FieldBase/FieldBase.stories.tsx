import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Select } from '../Select';
import { TextField } from '../TextField';
import { RadioGroup } from '../Radio/RadioGroup';
import { Radio } from '../Radio';
import { Checkbox, CheckboxGroup } from '../Checkbox';
import { Input } from '../Input';

import { FieldBase } from './FieldBase';
import { FieldGroup } from './FieldGroup';

const meta = {
  title: 'Components/FieldBase',
  component: FieldBase,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the field is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'The description',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'The error message',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'Something went wrong' },
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
    errorMessage: 'Something went wrong',
    description: 'This is a help text description',
  },
} satisfies Meta<typeof FieldBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <FieldGroup labelWidth="200px">
      <FieldBase {...args} label="This is my Label">
        <Input />
      </FieldBase>
    </FieldGroup>
  ),
};

//TODO: change other components: TextField, Select, RadioGroup
export const Complex: Story = {
  render: args => (
    <FieldGroup labelWidth="30%">
      <FieldBase {...args} label="This is my Label">
        <Input />
      </FieldBase>
      <FieldBase {...args} label="This is my Label">
        <input type="text" />
      </FieldBase>
      <TextField label="Hello TextField" />
      <TextField label="Hello" description="my description" />
      <Select label="Select me">
        <Select.Option key="one">One</Select.Option>
        <Select.Option key="two">Two</Select.Option>
      </Select>
      <RadioGroup label="Radios">
        <Radio value="1">One</Radio>
        <Radio value="2">Two</Radio>
      </RadioGroup>
      <CheckboxGroup label="Checkboxes">
        <Checkbox value="1">One</Checkbox>
        <Checkbox value="2">Two</Checkbox>
      </CheckboxGroup>
    </FieldGroup>
  ),
};
