/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { TextArea } from './TextArea';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'The label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Label' },
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'Placeholder Text',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Help Text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input invalid?',
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Error Message',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },

    required: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
    rows: {
      control: {
        type: 'number',
      },
      description: 'The number of rows',
    },
  },
  args: {
    label: 'Label',
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
    error: false,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: args => <TextArea {...args} />,
};

export const Controlled: Story = {
  render: args => {
    const [value, setValue] = React.useState('');
    return (
      <>
        <TextArea {...args} value={value} onChange={setValue} />
        <pre>
          <strong>Input Value:</strong>
          {value}
        </pre>
      </>
    );
  },
};
