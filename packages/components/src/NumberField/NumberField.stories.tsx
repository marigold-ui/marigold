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
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof NumberField> = args => (
  <NumberField {...args} />
);

export const WithFormatting: ComponentStory<typeof NumberField> = args => (
  <NumberField
    defaultValue={10}
    formatOptions={{
      style: 'currency',
      currency: 'EUR',
    }}
    {...args}
  />
);

export const MinMax: ComponentStory<typeof NumberField> = args => (
  <>
    <NumberField minValue={0} maxValue={100} step={10} {...args} />
    <small>min: 0, max: 100</small>
  </>
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
