import React from 'react';
import { render, screen } from '@testing-library/react';

import { Center } from './Center';
import { Text } from '../Text';
import { ThemeProvider } from '@marigold/system';

const theme = {
  sizes: {
    none: 0,
    small: 40,
    medium: 80,
    large: 120,
  },
  space: {
    none: 0,
    medium: 16,
  },
};

test('supports maxWidth', () => {
  render(
    <ThemeProvider theme={theme}>
      <Center maxWidth="50ch" data-testid="center">
        <Text>content</Text>
      </Center>
    </ThemeProvider>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toHaveStyle(`maxInlineSize: 50ch`);
});

test('supports maxWidth from theme sizes', () => {
  render(
    <ThemeProvider theme={theme}>
      <Center maxWidth="large" data-testid="center">
        <Text>content</Text>
      </Center>
    </ThemeProvider>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toHaveStyle(`maxInlineSize: 120px`);
});

test('supports maxHeight', () => {
  render(
    <ThemeProvider theme={theme}>
      <Center maxHeight="50ch" data-testid="center">
        <Text>content</Text>
      </Center>
    </ThemeProvider>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toHaveStyle(`height: 50ch`);
});

test('supports maxHeight from theme sizes', () => {
  render(
    <ThemeProvider theme={theme}>
      <Center maxHeight="large" data-testid="center">
        <Text>content</Text>
      </Center>
    </ThemeProvider>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toHaveStyle(`height: 120px`);
});

test('supports default textAlign', () => {
  render(
    <ThemeProvider theme={theme}>
      <Center data-testid="center">
        <Text>content</Text>
      </Center>
    </ThemeProvider>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toHaveStyle(`textAlign: center`);
});

test('supports other textAlign', () => {
  render(
    <ThemeProvider theme={theme}>
      <Center textAlign="left" data-testid="center">
        <Text>content</Text>
      </Center>
    </ThemeProvider>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toHaveStyle(`textAlign: left`);
});

test('supports space prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Center space="medium" data-testid="center">
        <Text>content</Text>
        <Text>content2</Text>
      </Center>
    </ThemeProvider>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toHaveStyle(`display: grid`);
  expect(center).toHaveStyle(`gap: 16px`);
});

test('supports superCentered', () => {
  render(
    <ThemeProvider theme={theme}>
      <Center superCentered data-testid="center">
        <Text>content</Text>
      </Center>
    </ThemeProvider>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toHaveStyle(`display: grid`);
  expect(center).toHaveStyle(`placeItems: center`);
});
