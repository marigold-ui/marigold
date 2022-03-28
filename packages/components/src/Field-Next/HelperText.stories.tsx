import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { HelperText } from './HelperText';

export default {
  title: 'Field/HelperText',
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'Text of the label',
      defaultValue: 'This is the helper text!',
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['description', 'error'],
      description: 'Choose between description and error',
      defaultValue: 'description',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof HelperText> = ({
  children,
  ...args
}) => <HelperText {...args}>{children}</HelperText>;
