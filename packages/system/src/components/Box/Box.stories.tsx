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
    css: {
      control: {
        type: 'object',
      },
      description: 'The css object to apply to the box',
      table: {
        type: { summary: 'object' },
        defaultValue: {
          summary: {
            width: 100,
            borderRadius: 5,
            px: 8,
            py: 2,
            marginInline: 'auto',
            color: '#0b7285',
            bg: '#99e9f2',
            cursor: 'pointer',
            '&:hover': {
              bg: '#c5f6fa',
              transform: 'scale(2)',
            },
          },
        },
      },
    },
  },
  args: {
    children: 'I am a box!',
    as: 'div',
    css: {
      width: 100,
      borderRadius: 5,
      px: 8,
      py: 2,
      marginInline: 'auto',
      color: '#0b7285',
      bg: '#99e9f2',
      cursor: 'pointer',
      '&:hover': {
        bg: '#c5f6fa',
        transform: 'scale(2)',
      },
    },
  },
} satisfies Meta;

export default meta;

export const Basic: StoryObj<typeof Box> = {
  render: args => <Box {...args} />,
};
