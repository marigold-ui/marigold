import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { HelpText } from '../HelpText';

const meta = {
  title: 'Components/HelpText',
  component: HelpText,
  argTypes: {
    description: {
      control: {
        type: 'text',
      },
      description: 'The description',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'The error message',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the help text is an error',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the help text is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    errorMessage: 'Something went wrong',
    description: 'This is a help text description',
    disabled: false,
    error: false,
  },
} satisfies Meta<typeof HelpText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <HelpText {...args} />,
};
