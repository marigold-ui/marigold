import React from 'react';
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
};
export const Basic = args =>
  React.createElement(
    Radio.Group,
    { ...args },
    React.createElement(Radio, { value: '1' }, 'Option 1'),
    React.createElement(Radio, { value: '2' }, 'Option 2'),
    React.createElement(Radio, { value: '3', disabled: true }, 'Option 3'),
    React.createElement(Radio, { value: '4' }, 'Option 4')
  );
//# sourceMappingURL=Radio.stories.js.map
