import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FieldBase } from './FieldBase';
import { Select } from '../Select';
import { FieldGroup } from './FieldGroup';
import { TextField } from '../TextField';
import { RadioGroup } from '../Radio/RadioGroup';
import { Radio } from '../Radio';
import { Checkbox, CheckboxGroup } from '../Checkbox';
import isChromatic from 'chromatic';
import { Box } from '@marigold/system';
import { Input } from '../Input';
const meta = {
  title: 'Components/FieldBase',
  component: FieldBase,
  argTypes: {
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the field is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
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
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the help text is an error',
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
    errorMessage: 'Something went wrong',
    description: 'This is a help text description',
    disabled: false,
    error: false,
  },
} satisfies Meta<typeof FieldBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <FieldBase {...args} label="This is my Label">
      <input type="text" />
    </FieldBase>
  ),
};

export const Complex: Story = {
  render: args => (
    <FieldGroup labelWidth="100px" labelPosition="left">
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <FieldBase {...args} label="This is my Label">
          <Input type="text" />
        </FieldBase>
        <FieldBase {...args} label="name">
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
      </Box>
    </FieldGroup>
  ),
};

Complex.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
