import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { FieldBase } from './FieldBase';
import { Select } from '../Select';
import { Box } from '@marigold/system';
import { FieldBaseGroup } from './FieldBaseGroup';
import { TextField } from '../TextField';
import { RadioGroup } from '../Radio/RadioGroup';
import { Radio } from '../Radio';
import { Checkbox, CheckboxGroup } from '../Checkbox';

export default {
  title: 'Components/FieldBase',
  argTypes: {
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the field is required',
      defaultValue: false,
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the field is disabled',
      defaultValue: false,
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'The description',
      defaultValue: 'This is a help text description',
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'The error message',
      defaultValue: 'Something went wrong',
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the help text is an error',
      defaultValue: false,
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof FieldBase> = args => (
  <FieldBase {...args} label="This is my Label">
    <input type="text" />
  </FieldBase>
);

export const Complex: ComponentStory<typeof FieldBase> = args => (
  <FieldBaseGroup space="medium">
    <FieldBase {...args} label="This is my Label">
      <input type="text" />
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
  </FieldBaseGroup>
);
