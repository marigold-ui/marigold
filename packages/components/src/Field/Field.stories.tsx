import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Field } from './Field';

export default {
  title: 'Components/Field',
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
    label: {
      control: {
        type: 'text',
      },
      description: 'The label',
      defaultValue: 'Field Label',
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
  },
} as Meta;

export const Basic: ComponentStory<typeof Field> = args => (
  <Field {...args}>
    <input type="text" />
  </Field>
);
