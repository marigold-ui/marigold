import React, { useState } from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Radio } from './Radio';

export default {
  title: 'Components/Radio',
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
      description: 'Radio variant',
      defaultValue: '__default',
    },
    labelVariant: {
      control: {
        type: 'text',
      },
      description: 'Radio label variant',
      defaultValue: 'inline',
    },
    label: {
      control: {
        type: 'text',
      },
      description: 'Label',
      defaultValue: 'Radio Label',
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

export const Basic: ComponentStory<typeof Radio> = ({
  onChange,
  checked,
  ...args
}) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <Radio
      onChange={() => setChecked(!isChecked)}
      checked={isChecked}
      {...args}
    />
  );
};
