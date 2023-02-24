import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { TextField } from './TextField';
import isChromatic from 'chromatic';
import { InputContainer } from '../Input';
import { Search } from '@marigold/icons';

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
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof TextField> = args => (
  <TextField {...args} label="My label is great." />
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

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
