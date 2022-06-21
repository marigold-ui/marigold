import React, { useState } from 'react';
import { Select } from './Select';
import { Container } from '../Container';
export default {
  title: 'Components/Select',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Set the select label',
      defaultValue: 'Select for favorite:',
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'Set the placeholder text',
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Set the field description',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disable the select',
      defaultValue: false,
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Require the select',
      defaultValue: false,
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Set error state',
      defaultValue: false,
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Error Message',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
};
export const Basic = args => {
  const [selected, setSelected] = useState('');
  return React.createElement(
    Container,
    { size: 'small' },
    React.createElement(
      Select,
      { ...args, onSelectionChange: setSelected, disabledKeys: ['Firefly'] },
      React.createElement(
        Select.Option,
        { key: 'Harry Potter' },
        'Harry Potter'
      ),
      React.createElement(
        Select.Option,
        { key: 'Lord of the Rings' },
        'Lord of the Rings'
      ),
      React.createElement(Select.Option, { key: 'Star Wars' }, 'Star Wars'),
      React.createElement(Select.Option, { key: 'Star Trek' }, 'Star Trek'),
      React.createElement(Select.Option, { key: 'Firefly' }, 'Firefly')
    ),
    React.createElement('hr', null),
    React.createElement('pre', null, 'selected: ', selected)
  );
};
export const Sections = args =>
  React.createElement(
    Select,
    { ...args },
    React.createElement(
      Select.Section,
      { title: 'Fantasy' },
      React.createElement(Select.Option, null, 'Harry Potter'),
      React.createElement(Select.Option, null, 'Lord of the Rings')
    ),
    React.createElement(
      Select.Section,
      { title: 'Sci-Fi' },
      React.createElement(Select.Option, null, 'Star Wars'),
      React.createElement(Select.Option, null, 'Star Trek')
    )
  );
//# sourceMappingURL=Select.stories.js.map
