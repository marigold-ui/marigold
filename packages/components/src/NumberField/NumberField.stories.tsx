/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Inline } from '../Inline';
import { NumberField } from './NumberField';

const meta = {
  title: 'Components/NumberField',
  component: NumberField,
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
    hideStepper: {
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
  },
  args: {
    description: 'This is a help text description',
    label: 'Label',
    errorMessage: 'Something went wrong',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: args => <NumberField {...args} />,
};

export const WithFormatting: Story = {
  render: args => (
    <NumberField
      defaultValue={10}
      formatOptions={{
        style: 'currency',
        currency: 'EUR',
      }}
      {...args}
    />
  ),
};

// https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers
export const WithUnit: Story = {
  render: args => (
    <Inline space={4}>
      <NumberField
        {...args}
        label="Hours"
        width={52}
        defaultValue={2}
        formatOptions={{
          style: 'unit',
          unit: 'hour',
        }}
      />
      <NumberField
        {...args}
        label="Minutes"
        width={52}
        defaultValue={43}
        formatOptions={{
          style: 'unit',
          unit: 'minute',
        }}
      />
    </Inline>
  ),
};

export const MinMax: Story = {
  render: args => (
    <>
      <NumberField minValue={0} maxValue={100} step={10} {...args} />
      <small>min: 0, max: 100</small>
    </>
  ),
};

export const Controlled: Story = {
  render: args => {
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
  },
};
