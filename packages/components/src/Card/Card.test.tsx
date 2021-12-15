import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Card } from './Card';

const theme = {
  space: {
    none: 0,
    small: 4,
    medium: 8,
  },
  card: {
    default: {
      p: 'medium',
    },
    custom: {
      p: 'small',
    },
  },
};

test('supports default variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card>card</Card>
    </ThemeProvider>
  );
  const card = screen.getByText(/card/);
  expect(card).toHaveStyle(`padding: 8px`);
});

test('supports other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card variant="custom">card</Card>
    </ThemeProvider>
  );
  const card = screen.getByText(/card/);
  expect(card).toHaveStyle(`padding: 4px`);
});

test('accepts title prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card title="title">content</Card>
    </ThemeProvider>
  );
  const title = screen.getByText(/title/);
  expect(title).toBeDefined();
});

test('accepts width prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card width="320px">content</Card>
    </ThemeProvider>
  );
  const card = screen.getByText(/content/);
  expect(card).toHaveStyle(`maxWidth: 320px`);
});

test('renders correct HTMl element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card>card</Card>
    </ThemeProvider>
  );
  const card = screen.getByText(/card/);
  expect(card instanceof HTMLDivElement).toBeTruthy();
});
