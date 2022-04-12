/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Inline } from './Inline';
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
      <Inline>
        <Text>first</Text>
        <Text>second</Text>
      </Inline>
    </ThemeProvider>
  );
  const first = screen.getByText(/first/).parentElement;
  expect(first).toHaveStyle(`gap: 0`);
});

test('accepts and uses spacing from theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Inline space="small">
        <Text>first</Text>
        <Text>second</Text>
      </Inline>
    </ThemeProvider>
  );
  const first = screen.getByText(/first/).parentElement;
  expect(first).toHaveStyle(`gap: 2px`);
});

test('supports nesting', () => {
  render(
    <ThemeProvider theme={theme}>
      <Inline space="large">
        <Inline space="small" data-testid="leftInline">
          <Text>first</Text>
          <Text>second</Text>
        </Inline>
        <Inline space="small" data-testid="rightInline">
          <Text>third</Text>
          <Text>fourth</Text>
        </Inline>
      </Inline>
    </ThemeProvider>
  );
  const first = screen.getByText(/first/).parentElement;
  const leftInline = screen.getByTestId('leftInline').parentElement;
  expect(first).toHaveStyle(`gap: 2px`);
  expect(leftInline).toHaveStyle(`gap: 8px`);

  const third = screen.getByText(/third/).parentElement;
  const rightInline = screen.getByTestId('rightInline').parentElement;
  expect(third).toHaveStyle(`gap: 2px`);
  expect(rightInline).toHaveStyle(`gap: 8px`);
});

test('supports a standalone element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Inline>
        <Text>element</Text>
      </Inline>
    </ThemeProvider>
  );
  const element = screen.getByText(/element/).parentElement;
  expect(element).toHaveStyle(`gap: 0`);
});

test('supports a non React.Fragment element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Inline space="small">
        <Text>element</Text>
        Text
      </Inline>
    </ThemeProvider>
  );
  const textElement = screen.getByText(/Text/);
  expect(textElement).toHaveStyle(`gap: 2px`);
});

test('renders div per default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Inline data-testid="inline">
        <Text>first</Text>
        <Text>second</Text>
      </Inline>
    </ThemeProvider>
  );

  const inline = screen.getByTestId('inline');
  expect(inline instanceof HTMLDivElement).toBeTruthy();
});
