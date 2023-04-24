import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

const meta = {
  title: 'System/Box',
  component: Box,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The content of the box',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'I am a box!' },
      },
    },
    as: {
      control: {
        type: 'text',
      },
      description: 'The element to render',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'div' },
      },
    },
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variant of the box',
    },
  },
  args: {
    children: 'I am a box!',
    as: 'div',
  },
} satisfies Meta;

export default meta;

export const Basic: StoryObj<typeof Box> = {
  render: args => (
    <Box
      className="ms-auto me-auto w-6/12 rounded bg-[#99e9f2] px-2 py-1 text-[#0b7285] hover:scale-150 hover:bg-[#c5f6fa]"
      {...args}
    />
  ),
};
