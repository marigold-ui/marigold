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
  },
} as Meta;

export const Basic: ComponentStory<typeof CheckboxGroup> = args => {
  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <>
      <CheckboxGroup {...args} onChange={setSelected}>
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
