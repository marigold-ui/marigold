import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Box, ThemeProvider, useResponsiveValue } from '@marigold/system';

export default {
  title: 'System/useResponsiveStyles',
  argTypes: {
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
        color: '#FFF',
        bg: ['red', 'blue', 'green', 'black', 'hotpink'],
        cursor: 'pointer',
      },
    },
  },
} as Meta;

const theme = {
  breakpoints: ['40em', '50em', '60em', '70em'],
};

const Component = () => {
  const value = useResponsiveValue(
    [
      'no breakpoint',
      'larger than 40em',
      'larger than 50em',
      'larger than 60em',
      'larger than 70em',
    ],
    2
  );
  return <strong>{value}</strong>;
};

export const Basic: ComponentStory<typeof Box> = args => {
  return (
    <ThemeProvider theme={theme}>
      <Box {...args}>
        <Component />
      </Box>
    </ThemeProvider>
  );
};
