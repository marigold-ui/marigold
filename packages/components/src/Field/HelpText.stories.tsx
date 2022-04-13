import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { HelpText } from './HelpText';

export default {
  title: 'Components/HelpText',
  argTypes: {
    description: {
      control: {
        type: 'text',
      },
      description: 'The description',
      defaultValue: 'This is a help text description',
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'The error message',
      defaultValue: 'Something went wrong',
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the help text is an error',
      defaultValue: false,
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the help text is disabled',
      defaultValue: false,
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof HelpText> = args => (
  <HelpText {...args} />
);
