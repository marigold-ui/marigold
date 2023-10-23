import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox, CheckboxGroup } from '../Checkbox';
import { Radio } from '../Radio';
import { RadioGroup } from '../Radio/_RadioGroup';
import { Select } from '../Select';
import { TextField } from '../TextField';
import { FieldGroup } from './FieldGroup';
import { FieldBase } from './_FieldBase';

const meta = {
  title: 'Components/FieldBase',
  component: FieldBase,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'The Label',
      defaultValue: 'This is the label',
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
    isInvalid: {
      control: {
        type: 'boolean',
      },
      description: 'Wheter if the field is invalid',
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
