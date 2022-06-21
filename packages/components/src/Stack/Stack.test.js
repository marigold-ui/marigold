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
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Stack,
        null,
        React.createElement(Text, null, 'first'),
        React.createElement(Text, null, 'second')
      )
    )
  );
  const first = screen.getByText(/first/).parentElement;
  expect(first).toHaveStyle(`gap: 0`);
});
test('accepts and uses spacing from theme', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Stack,
        { space: 'small' },
        React.createElement(Text, null, 'first'),
        React.createElement(Text, null, 'second')
      )
    )
  );
  const first = screen.getByText(/first/).parentElement;
  expect(first).toHaveStyle(`gap: 2px`);
});
test('align children left by default', () => {
  render(
    React.createElement(
      Stack,
      { 'data-testid': 'stack' },
      React.createElement(Text, null, 'first')
    )
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveStyle(`align-items: flex-start`);
});
test('allows to align children to the center', () => {
  render(
    React.createElement(
      Stack,
      { alignX: 'center', 'data-testid': 'stack' },
      React.createElement(Text, null, 'first')
    )
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveStyle(`align-items: center`);
});
test('allows to align children to the right', () => {
  render(
    React.createElement(
      Stack,
      { alignX: 'right', 'data-testid': 'stack' },
      React.createElement(Text, null, 'first')
    )
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveStyle(`align-items: flex-end`);
});
test('children to the top by default', () => {
  render(
    React.createElement(
      Stack,
      { 'data-testid': 'stack' },
      React.createElement(Text, null, 'first')
    )
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveStyle(`justify-content: flex-start`);
});
test('allows to align children to the vertical center', () => {
  render(
    React.createElement(
      Stack,
      { alignY: 'center', 'data-testid': 'stack' },
      React.createElement(Text, null, 'first')
    )
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveStyle(`justify-content: center`);
});
test('allows to align children to the bottom', () => {
  render(
    React.createElement(
      Stack,
      { alignY: 'bottom', 'data-testid': 'stack' },
      React.createElement(Text, null, 'first')
    )
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveStyle(`justify-content: flex-end`);
});
test('behaves as inline be default', () => {
  render(
    React.createElement(
      Stack,
      { 'data-testid': 'stack' },
      React.createElement(Text, null, 'first')
    )
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveStyle(`blockSize: auto`);
});
test('allows to fill space', () => {
  render(
    React.createElement(
      Stack,
      { stretch: true, 'data-testid': 'stack' },
      React.createElement(Text, null, 'first')
    )
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveStyle(`blockSize: 100%`);
});
test('supports nesting', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Stack,
        { space: 'large' },
        React.createElement(
          Stack,
          { space: 'small', 'data-testid': 'upperStack' },
          React.createElement(Text, null, 'first'),
          React.createElement(Text, null, 'second')
        ),
        React.createElement(
          Stack,
          { space: 'small', 'data-testid': 'lowerStack' },
          React.createElement(Text, null, 'third'),
          React.createElement(Text, null, 'fourth')
        )
      )
    )
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
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Stack,
        { 'data-testid': 'stack' },
        React.createElement(Text, null, 'first'),
        React.createElement(Text, null, 'second')
      )
    )
  );
  const stack = screen.getByTestId('stack');
  expect(stack instanceof HTMLDivElement).toBeTruthy();
});
test('can render as "ul"', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Stack,
        { as: 'ul', 'data-testid': 'stack' },
        React.createElement(Text, null, 'first'),
        React.createElement(Text, null, 'second')
      )
    )
  );
  const stack = screen.getByTestId('stack');
  expect(stack instanceof HTMLUListElement).toBeTruthy();
});
test('can render as "ol"', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Stack,
        { as: 'ol', 'data-testid': 'stack' },
        React.createElement(Text, null, 'first'),
        React.createElement(Text, null, 'second')
      )
    )
  );
  const stack = screen.getByTestId('stack');
  expect(stack instanceof HTMLOListElement).toBeTruthy();
});
//# sourceMappingURL=Stack.test.js.map
