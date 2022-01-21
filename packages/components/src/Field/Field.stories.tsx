import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Field } from './Field';

export default {
  title: 'Components/Field',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'Field variant',
      table: {
        defaultValue: {
          summary: '__default',
        },
      },
    },
    labelVariant: {
      control: {
        type: 'text',
      },
      description: 'Field label variant',
      table: {
        defaultValue: {
          summary: 'above',
        },
      },
    },
    htmlFor: {
      control: {
        type: 'text',
      },
      defaultValue: 'id',
    },
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Label',
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
      options: [true, false],
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      options: [true, false],
      table: {
        defaultValue: {
          summary: false,
        },
      },
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
        'number',
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
      table: {
        defaultValue: {
          summary: 'text',
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Field> = args => <Field {...args} />;
