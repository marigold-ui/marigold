/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import type { StoryObj } from '@storybook/react';
import { useTheme, ThemeProvider } from '@marigold/system';
import { List } from '@marigold/components';

const meta = {
  title: 'System/useTheme',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const theme = useTheme();

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
  },
};
