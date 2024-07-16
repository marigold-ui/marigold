/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Label text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Make a Sandwich' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disabled',
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Required',
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'Read only',
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Error state',
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
  },
  args: {
    label: 'This is a label',
    children: 'This is a Checkbox',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: args => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <>
        <CheckboxGroup
          onChange={setSelected}
          description="Choose your Options"
          errorMessage="Oh no"
          {...args}
        >
          <Checkbox value="ham">Ham</Checkbox>
          <Checkbox value="salami" disabled>
            Salami
          </Checkbox>
          <Checkbox value="cheese">Cheese</Checkbox>
          <Checkbox value="tomato">Tomate</Checkbox>
          <Checkbox value="cucumber">Cucumber</Checkbox>
          <Checkbox value="onions">Onions</Checkbox>
        </CheckboxGroup>
        <hr />
        <pre>Selected values: {selected.join(', ')}</pre>
      </>
    );
  },
};

export const Error: Story = {
  render: args => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <>
        <CheckboxGroup
          onChange={setSelected}
          description="my desc"
          errorMessage="This is an error"
          {...args}
        >
          <Checkbox value="ham">Ham</Checkbox>
          <Checkbox value="salami" disabled>
            Salami
          </Checkbox>
          <Checkbox value="cheese">Cheese</Checkbox>
          <Checkbox value="tomato">Tomate</Checkbox>
          <Checkbox value="cucumber">Cucumber</Checkbox>
          <Checkbox value="onions">Onions</Checkbox>
        </CheckboxGroup>
        <hr />
        <pre>Selected values: {selected.join(', ')}</pre>
      </>
    );
  },
};
