import React from 'react';
import { TextField } from './TextField';
export default {
  title: 'Components/TextField',
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
    type: {
      control: {
        type: 'select',
      },
      options: [
        'date',
        'datetime-local',
        'email',
        'month',
        'password',
        'search',
        'tel',
        'text',
        'time',
        'time',
        'url',
        'week',
      ],
      defaultValue: 'text',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
};
export const Basic = args => React.createElement(TextField, { ...args });
export const Controlled = args => {
  const [value, setValue] = React.useState('');
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(TextField, {
      ...args,
      value: value,
      onChange: setValue,
    }),
    React.createElement(
      'pre',
      null,
      React.createElement('strong', null, 'Input Value:'),
      value
    )
  );
};
//# sourceMappingURL=TextField.stories.js.map
