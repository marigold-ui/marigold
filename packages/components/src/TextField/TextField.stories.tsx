import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { TextField } from './TextField';

export default {
  title: 'Components/TextField',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'The label',
      defaultValue: 'Label',
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Help Text',
      defaultValue: 'This is a help text description',
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input invalid?',
      defaultValue: false,
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Error Message',
      defaultValue: 'Something went wrong',
    },
    required: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    type: {
      control: {
        type: 'select',
      },
      options: [
        'date',
        'datetime-local',
        'email',
        'month',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'time',
        'time',
        'url',
        'week',
      ],
      defaultValue: 'text',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof TextField> = args => (
  <TextField {...args} />
);

export const Controlled: ComponentStory<typeof TextField> = args => {
  const [value, setValue] = React.useState('');
  return (
    <>
      <TextField {...args} value={value} onChange={setValue} />
      <pre>
        <strong>Input Value:</strong>
        {value}
      </pre>
    </>
  );
};
