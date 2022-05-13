import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Radio } from '@marigold/components';

export default {
  title: 'Components/Radio',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Label',
      defaultValue: 'The Label',
    },
    orientation: {
      control: {
        type: 'select',
        options: ['horizontal', 'vertical'],
      },
      description: 'Orientation',
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
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Radio.Group> = args => (
  <Radio.Group {...args}>
    <Radio value="1">Option 1</Radio>
    <Radio value="2">Option 2</Radio>
    <Radio value="3" disabled>
      Option 3
    </Radio>
    <Radio value="4">Option 4</Radio>
  </Radio.Group>
);
