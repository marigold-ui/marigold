import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { HelperText } from './HelperText';

const theme = {
  colors: {
    text: 'black',
    error: 'red',
  },
  helperText: {
    description: {
      color: 'text',
    },
    error: {
      color: 'error',
    },
  },
};

test('supports description variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <HelperText>label</HelperText>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);
  expect(label).toHaveStyle(`color: black`);
});

test('supports error variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <HelperText variant="error">label</HelperText>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);
  expect(label).toHaveStyle(`color: red`);
});

test('renders icon when variant is error', () => {
  render(
    <ThemeProvider theme={theme}>
      <HelperText variant="error">label</HelperText>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);
  const icon = within(label).getByRole(/presentation/);
  expect(icon).toBeInTheDocument();
});
