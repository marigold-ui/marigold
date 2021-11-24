import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Stack } from './Stack';
import { Text } from '../Text';

// Setup
// ---------------
const theme = {
  space: {
    none: 0,
    small: 2,
    medium: 4,
    large: 8,
  },
};

test('default space is "none"', () => {
  render(
    <ThemeProvider theme={theme}>
      <Stack>
        <Text>first</Text>
        <Text>second</Text>
      </Stack>
    </ThemeProvider>
  );
  const first = screen.getByText(/first/);
  const second = screen.getByText(/second/);

  expect(first).toHaveStyle(`padding-top: 0px`);
  expect(second).toHaveStyle(`padding-top: 0px`);
});

test('accepts and uses spacing from theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Stack space="small">
        <Text>first</Text>
        <Text>second</Text>
      </Stack>
    </ThemeProvider>
  );
  const first = screen.getByText(/first/);
  const second = screen.getByText(/second/);

  expect(first.parentElement).toHaveStyle(`padding-top: 0px`);
  expect(second.parentElement).toHaveStyle(`padding-top: 2px`);
});

test('aligns children left by default', () => {
  render(
    <Stack data-testid="stack">
      <Text>first</Text>
    </Stack>
  );
  const stack = screen.getByTestId('stack');

  expect(stack).toHaveStyle(`align-items: flex-start`);
});

test('allows to aligns children to the center', () => {
  render(
    <Stack align="center" data-testid="stack">
      <Text>first</Text>
    </Stack>
  );
  const stack = screen.getByTestId('stack');

  expect(stack).toHaveStyle(`align-items: center`);
});

test('allows to aligns children to the right', () => {
  render(
    <Stack align="right" data-testid="stack">
      <Text>first</Text>
    </Stack>
  );
  const stack = screen.getByTestId('stack');

  expect(stack).toHaveStyle(`align-items: flex-end`);
});

test('supports nesting', () => {
  render(
    <ThemeProvider theme={theme}>
      <Stack space="large">
        <Stack space="small" data-testid="upperStack">
          <Text>first</Text>
          <Text>second</Text>
        </Stack>
        <Stack space="small" data-testid="lowerStack">
          <Text>third</Text>
          <Text>fourth</Text>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
  const first = screen.getByText(/first/);
  const second = screen.getByText(/second/);
  const upperStack = screen.getByTestId('upperStack');

  const third = screen.getByText(/third/);
  const fourth = screen.getByText(/fourth/);
  const lowerStack = screen.getByTestId('lowerStack');

  expect(upperStack.parentElement).toHaveStyle(`padding-top: 0px`);
  expect(lowerStack.parentElement).toHaveStyle(`padding-top: 8px`);

  expect(first.parentElement).toHaveStyle(`padding-top: 0px`);
  expect(second.parentElement).toHaveStyle(`padding-top: 2px`);

  expect(third.parentElement).toHaveStyle(`padding-top: 0px`);
  expect(fourth.parentElement).toHaveStyle(`padding-top: 2px`);
});

test('renders as div per default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Stack data-testid="stack">
        <Text>first</Text>
        <Text>second</Text>
      </Stack>
    </ThemeProvider>
  );

  const stack = screen.getByTestId('stack');
  expect(stack instanceof HTMLDivElement).toBeTruthy();
});
