import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Alert } from './Alert';
import { Text } from '../Text';

export default {
  title: 'Components/Alert',
  argTypes: {
    variant: {
      description: 'usage types',
      control: {
        type: 'select',
      },
      options: ['success', 'info', 'warning', 'error'],
      defaultValue: 'success',
    },
    children: {
      description: 'text to display',
      control: {
        type: 'text',
      },
      defaultValue: 'Alert Message!',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Alert> = ({ children, ...args }) => (
  <Alert {...args}>
    <Text>{children}</Text>
  </Alert>
);
