import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Radio } from '@marigold/components';

export default {
  title: 'Components/RadioGroup',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Label',
      defaultValue: 'The Label',
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
  },
} as Meta;

export const Basic: ComponentStory<typeof Radio.Group> = args => (
  <Radio.Group {...args}>
    <Radio value="1">Option 1</Radio>
    <Radio value="2">Option 2</Radio>
    <Radio value="3">Option 3</Radio>
  </Radio.Group>
);
