import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Checkbox } from './Checkbox';

export default {
  title: 'Components/Checkbox',
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
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'Read only',
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

export const Basic: ComponentStory<typeof Checkbox> = args => (
  <Checkbox {...args} />
);
