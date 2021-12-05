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

const getLeftPadding = (element: HTMLElement) =>
  getComputedStyle(element).getPropertyValue('padding-left');

test('default space is "none"', () => {
  render(
    <ThemeProvider theme={theme}>
      <Inline>
        <Text>first</Text>
        <Text>second</Text>
      </Inline>
    </ThemeProvider>
  );
  const first = screen.getByText(/first/).parentElement!;
  const second = screen.getByText(/second/).parentElement!;

  expect(getLeftPadding(first)).toEqual('');
  expect(second).toHaveStyle(`padding-left: 0px`);
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
  const first = screen.getByText(/first/);
  const second = screen.getByText(/second/);

  expect(getLeftPadding(first)).toEqual('');
  expect(second.parentElement).toHaveStyle(`padding-left: 2px`);
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
  const first = screen.getByText(/first/);
  const second = screen.getByText(/second/);
  const leftInline = screen.getByTestId('leftInline');

  const third = screen.getByText(/third/);
  const fourth = screen.getByText(/fourth/);
  const rightInline = screen.getByTestId('rightInline');

  expect(getLeftPadding(leftInline.parentElement!)).toEqual('');
  expect(rightInline.parentElement).toHaveStyle(`padding-left: 8px`);

  expect(getLeftPadding(first.parentElement!)).toEqual('');
  expect(second.parentElement).toHaveStyle(`padding-left: 2px`);

  expect(getLeftPadding(third.parentElement!)).toEqual('');
  expect(fourth.parentElement).toHaveStyle(`padding-left: 2px`);
});

test('renders as div per default', () => {
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
