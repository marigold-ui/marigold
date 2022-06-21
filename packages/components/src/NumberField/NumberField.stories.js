import React from 'react';
import { NumberField } from './NumberField';
export default {
  title: 'Components/NumberField',
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
    hideStepper: {
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
  },
};
export const Basic = args => React.createElement(NumberField, { ...args });
export const WithFormatting = args =>
  React.createElement(NumberField, {
    defaultValue: 10,
    formatOptions: {
      style: 'currency',
      currency: 'EUR',
    },
    ...args,
  });
export const MinMax = args =>
  React.createElement(
    React.Fragment,
    null,
    React.createElement(NumberField, {
      minValue: 0,
      maxValue: 100,
      step: 10,
      ...args,
    }),
    React.createElement('small', null, 'min: 0, max: 100')
  );
export const Controlled = args => {
  const [value, setValue] = React.useState(0);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(NumberField, {
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
//# sourceMappingURL=NumberField.stories.js.map
