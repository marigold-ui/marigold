import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, ThemeProvider, useResponsiveValue } from '@marigold/system';

const meta = {
  title: 'System/useResponsiveValue',
  argTypes: {
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
            color: '#FFF',
            bg: ['red', 'blue', 'green', 'black', 'hotpink'],
            cursor: 'pointer',
          },
        },
      },
    },
  },
  args: {
    css: {
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
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Basic: Story = {
  render: args => {
    return (
      <ThemeProvider theme={theme}>
        <Box {...args}>
          <Component />
        </Box>
      </ThemeProvider>
    );
  },
};
