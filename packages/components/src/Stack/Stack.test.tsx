/* eslint-disable testing-library/no-node-access */
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
  const first = screen.getByText(/first/).parentElement;
  expect(first).toHaveStyle(`gap: 0`);
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
  const first = screen.getByText(/first/).parentElement;
  expect(first).toHaveStyle(`gap: 2px`);
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
    <Stack alignX="center" data-testid="stack">
      <Text>first</Text>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveStyle(`align-items: center`);
});

test('allows to aligns children to the right', () => {
  render(
    <Stack alignX="right" data-testid="stack">
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
  const first = screen.getByText(/first/).parentElement;
  const upperStack = screen.getByTestId('upperStack').parentElement;
  expect(first).toHaveStyle(`gap: 2px`);
  expect(upperStack).toHaveStyle(`gap: 8px`);

  const third = screen.getByText(/third/).parentElement;
  const lowerStack = screen.getByTestId('lowerStack').parentElement;
  expect(third).toHaveStyle(`gap: 2px`);
  expect(lowerStack).toHaveStyle(`gap: 8px`);
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

test('can render as "ul"', () => {
  render(
    <ThemeProvider theme={theme}>
      <Stack as="ul" data-testid="stack">
        <Text>first</Text>
        <Text>second</Text>
      </Stack>
    </ThemeProvider>
  );

  const stack = screen.getByTestId('stack');
  expect(stack instanceof HTMLUListElement).toBeTruthy();
});

test('can render as "ol"', () => {
  render(
    <ThemeProvider theme={theme}>
      <Stack as="ol" data-testid="stack">
        <Text>first</Text>
        <Text>second</Text>
      </Stack>
    </ThemeProvider>
  );

  const stack = screen.getByTestId('stack');
  expect(stack instanceof HTMLOListElement).toBeTruthy();
});
