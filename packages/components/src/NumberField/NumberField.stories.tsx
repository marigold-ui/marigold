import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { NumberField } from './NumberField';

export default {
  title: 'Components/NumberField',
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
    hideStepper: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    // TODO: Add formatting props!
    // TODO: Hide stepper?
  },
} as Meta;

export const Basic: ComponentStory<typeof NumberField> = args => (
  <NumberField {...args} />
);

export const Controlled: ComponentStory<typeof NumberField> = args => {
  const [value, setValue] = React.useState(0);
  return (
    <>
      <NumberField {...args} value={value} onChange={setValue} />
      <pre>
        <strong>Input Value:</strong>
        {value}
      </pre>
    </>
  );
};
