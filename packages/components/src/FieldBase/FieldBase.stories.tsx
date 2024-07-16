import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox, CheckboxGroup } from '../Checkbox';
import { Radio } from '../Radio';
import { RadioGroup } from '../Radio/RadioGroup';
import { Select } from '../Select';
import { TextField } from '../TextField';
import { FieldBase } from './FieldBase';
import { FieldGroup } from './FieldGroup';

const meta = {
  title: 'Components/FieldBase',
  component: FieldBase,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'This is the label' },
      },
      description: 'The Label of the field',
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'The description',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'The error message',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field, used Tailwind tokens for this.',
    },
    isInvalid: {
      control: {
        type: 'boolean',
      },
      description: 'Wheter if the field is invalid',
    },
    isRequired: {
      control: {
        type: 'boolean',
      },
      description: 'Wheter if the field is required',
    },
  },
  args: {
    errorMessage: 'Something went wrong',
    description: 'This is a help text description',
    label: 'This is the label',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: args => (
    <FieldBase {...args}>
      <input className="border" />
    </FieldBase>
  ),
};

export const WithFieldGroup: Story = {
  render: args => (
    <FieldGroup labelWidth="200px">
      <FieldBase {...args} label="This is my Label">
        <input type="text" className="border" />
      </FieldBase>
      <FieldBase {...args} label="This is my Label">
        <input type="text" className="border" />
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
