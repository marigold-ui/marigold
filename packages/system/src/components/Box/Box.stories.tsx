import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Box } from './Box';

export default {
  title: 'Components/Box',
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The content of the box',
      defaultValue: 'I am a box!',
    },
    as: {
      control: {
        type: 'text',
      },
      description: 'The element to render',
      defaultValue: 'div',
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
      defaultValue: {
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
} as Meta;

export const Basic: ComponentStory<typeof Box> = args => <Box {...args} />;
