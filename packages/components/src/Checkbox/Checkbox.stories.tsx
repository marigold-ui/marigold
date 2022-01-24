import React, { useState } from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Checkbox } from './Checkbox';

export default {
  title: 'Components/Checkbox',
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'Checkbox variant',
      defaultValue: '__default',
    },
    labelVariant: {
      control: {
        type: 'text',
      },
      description: 'Checkbox label variant',
      defaultValue: 'inline',
    },
    label: {
      control: {
        type: 'text',
      },
      description: 'Label',
      defaultValue: 'Checkbox Label',
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Required',
      defaultValue: false,
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disabled',
      defaultValue: false,
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Error',
      defaultValue: false,
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Error Message',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Checkbox> = ({
  onChange,
  checked,
  ...args
}) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <Checkbox
      onChange={() => setChecked(!isChecked)}
      checked={isChecked}
      {...args}
    />
  );
};
