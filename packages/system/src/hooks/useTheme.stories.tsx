import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Box, useTheme, ThemeProvider } from '@marigold/system';
import { List } from '@marigold/components';

export default {
  title: 'System/useTheme',
  argTypes: {},
} as Meta;

export const Basic: ComponentStory<typeof Box> = args => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      {Object.entries(theme).map(([key, value]) => (
        <List key={key}>
          <strong>{key}</strong>
          <List.Item>{Object.keys(value) + ','}</List.Item>
        </List>
      ))}
    </ThemeProvider>
  );
};
