import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

export default {
  title: 'Components/CheckboxGroup',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Label text',
      defaultValue: 'Make a Sandwhich',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disabled',
      defaultValue: false,
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Required',
      defaultValue: false,
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'Read only',
      defaultValue: false,
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Error state',
      defaultValue: false,
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof CheckboxGroup> = args => {
  const [selected, setSelected] = React.useState<string[]>([]);
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
};

export const Error: ComponentStory<typeof CheckboxGroup> = args => {
  const [selected, setSelected] = React.useState<string[]>([]);
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
};
