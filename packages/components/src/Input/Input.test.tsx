import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Input } from './Input';

const theme = {
  fonts: {
    body: 'Inter',
    forms: 'Roboto',
  },
  input: {
    default: {
      fontFamily: 'body',
    },
    input2: {
      fontFamily: 'forms',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input title="input" />
    </ThemeProvider>
  );
  const input = screen.getByTitle('input');

  expect(input).toHaveStyle(`font-family: Inter`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input title="input" variant="input2" />
    </ThemeProvider>
  );
  const input = screen.getByTitle('input');

  expect(input).toHaveStyle(`font-family: Roboto`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input title="input" />
    </ThemeProvider>
  );
  const input = screen.getByTitle('input');

  expect(input instanceof HTMLInputElement).toBeTruthy();
});

test('supports custom prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input title="input" placeholder="placeholder" />
    </ThemeProvider>
  );
  const input = screen.getByTitle('input');

  expect(input).toHaveAttribute('placeholder');
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input className="custom-class-name" title="input" />
    </ThemeProvider>
  );
  const input = screen.getByTitle(/input/);

  expect(input.className).toMatch('custom-class-name');
});
