import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Textarea } from '.';

export default {
  title: 'Components/Textarea',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: {
          summary: '__default',
        },
      },
    },
    label: {
      control: {
        type: 'text',
      },
      description: 'Label text',
      defaultValue: 'Textarea Label',
    },
    htmlFor: {
      control: {
        type: 'text',
      },
      description: 'Bind to label',
      defaultValue: 'textareaId',
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Error',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Error Message',
    },
    required: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Textarea> = args => (
  <Textarea placeholder="Placeholder..." {...args} />
);
