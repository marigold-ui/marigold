import React from 'react';
import { TextArea } from './TextArea';
export default {
  title: 'Components/TextArea',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'The label',
      defaultValue: 'Label',
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Help Text',
      defaultValue: 'This is a help text description',
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input invalid?',
      defaultValue: false,
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Error Message',
      defaultValue: 'Something went wrong',
    },
    required: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
    rows: {
      control: {
        type: 'number',
      },
      description: 'The number of rows',
    },
  },
};
export const Basic = args => React.createElement(TextArea, { ...args });
//# sourceMappingURL=TextArea.stories.js.map
