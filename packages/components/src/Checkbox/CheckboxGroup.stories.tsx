/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/addons';
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
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'Read only',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    readOnly: false,
    disabled: false,
    children: 'This is a Checkbox',
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <>
        <CheckboxGroup
          {...args}
          onChange={setSelected}
          description="Choose your Options"
          errorMessage="Oh no"
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
          error
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
