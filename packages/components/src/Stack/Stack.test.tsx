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

  expect(first).toHaveStyle(`padding-top: 0px`);
  expect(second).toHaveStyle(`padding-top: 2px`);
});

test('aligns children left by default', () => {
  render(
    <Stack>
      <Text>first</Text>
    </Stack>
  );
  const stack = screen.getByText(/first/).parentElement;

  expect(stack).toHaveStyle(`align-items: flex-start`);
});

test('allows to aligns children to the center', () => {
  render(
    <Stack align="center">
      <Text>first</Text>
    </Stack>
  );
  const stack = screen.getByText(/first/).parentElement;

  expect(stack).toHaveStyle(`align-items: center`);
});

test('allows to aligns children to the right', () => {
  render(
    <Stack align="right">
      <Text>first</Text>
    </Stack>
  );
  const stack = screen.getByText(/first/).parentElement;

  expect(stack).toHaveStyle(`align-items: flex-end`);
});

test('supports nesting', () => {
  render(
    <ThemeProvider theme={theme}>
      <Stack space="large">
        <Stack space="small">
          <Text>first</Text>
          <Text>second</Text>
        </Stack>
        <Stack space="small">
          <Text>third</Text>
          <Text>fourth</Text>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
  const first = screen.getByText(/first/);
  const second = screen.getByText(/second/);
  const upperStack = first.parentElement;

  const third = screen.getByText(/third/);
  const fourth = screen.getByText(/fourth/);
  const lowerStack = third.parentElement;

  expect(upperStack).toHaveStyle(`padding-top: 0px`);
  expect(lowerStack).toHaveStyle(`padding-top: 8px`);

  expect(first).toHaveStyle(`padding-top: 0px`);
  expect(second).toHaveStyle(`padding-top: 2px`);

  expect(third).toHaveStyle(`padding-top: 0px`);
  expect(fourth).toHaveStyle(`padding-top: 2px`);
});

test('renders as div per default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Stack>
        <Text>first</Text>
        <Text>second</Text>
      </Stack>
    </ThemeProvider>
  );

  const stack = screen.getByText(/first/).parentElement;
  expect(stack instanceof HTMLDivElement).toBeTruthy();
});

test('can render as <ul>', () => {
  render(
    <ThemeProvider theme={theme}>
      <Stack as="ul">
        <li>first</li>
        <li>second</li>
      </Stack>
    </ThemeProvider>
  );

  const stack = screen.getByText(/first/).parentElement;
  expect(stack instanceof HTMLUListElement).toBeTruthy();
});

test('can render as <ol>', () => {
  render(
    <ThemeProvider theme={theme}>
      <Stack as="ol">
        <li>first</li>
        <li>second</li>
      </Stack>
    </ThemeProvider>
  );

  const stack = screen.getByText(/first/).parentElement;
  expect(stack instanceof HTMLOListElement).toBeTruthy();
});
