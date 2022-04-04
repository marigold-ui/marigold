import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Checkbox } from './Checkbox';

export default {
  title: 'Components/Checkbox-Next',
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'Label text',
      defaultValue: 'This is a Checkbox',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disabled',
      defaultValue: false,
    },
    indeterminate: {
      control: {
        type: 'boolean',
      },
      description: 'Option to define an indeterminate state',
      defaultValue: false,
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Checkbox> = args => (
  <Checkbox {...args} />
);
