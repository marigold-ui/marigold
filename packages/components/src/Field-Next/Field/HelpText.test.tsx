import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { HelpText } from './HelpText';

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

test('render description', () => {
  render(<HelpText description="This is a help text description" />);

  const element = screen.getByText('This is a help text description');
  expect(element).toBeInTheDocument();
});

test('render description even if erorr message is defined', () => {
  render(
    <HelpText
      description="This is a help text description"
      errorMessage="Something went wrong"
    />
  );

  const element = screen.getByText('This is a help text description');
  expect(element).toBeInTheDocument();
});

test('uses description variant by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <HelpText description="This is a help text description" />
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);
  expect(label).toHaveStyle(`color: black`);
});

test('supports error variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <HelpText variant="error">label</HelpText>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);
  expect(label).toHaveStyle(`color: red`);
});

test('renders icon when variant is error', () => {
  render(
    <ThemeProvider theme={theme}>
      <HelpText variant="error">label</HelpText>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);
  const icon = within(label).getByRole(/presentation/);
  expect(icon).toBeInTheDocument();
});
