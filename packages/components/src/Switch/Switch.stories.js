import React from 'react';
import { Switch } from './Switch';
export default {
  title: 'Components/Switch',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'Switch variant style',
    },
    children: {
      control: {
        type: 'text',
      },
      description: 'Switch label',
      defaultValue: 'Default Switch',
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'Switch size style',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Switch disabled state',
      defaultValue: false,
    },
  },
};
export const Basic = args => React.createElement(Switch, { ...args });
//# sourceMappingURL=Switch.stories.js.map
