import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Text } from './Text';

const theme = {
  text: {
    body: {
      fontFamily: 'Oswald Regular',
    },
    heading: {
      fontFamily: 'Inter',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Text>text</Text>
    </MarigoldProvider>
  );
  const text = screen.getByText(/text/);

  expect(text).toHaveStyle(`font-family: Oswald Regular`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Text variant="heading">text</Text>
    </MarigoldProvider>
  );
  const text = screen.getByText(/text/);

  expect(text).toHaveStyle(`font-family: Inter`);
});

test('renders <span> element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Text>text</Text>
    </MarigoldProvider>
  );
  const text = screen.getByText(/text/);

  expect(text instanceof HTMLSpanElement).toBeTruthy();
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Text css={{ fontFamily: 'Arial' }}>text</Text>
    </MarigoldProvider>
  );
  const text = screen.getByText(/text/);

  expect(text).not.toHaveStyle(`font-family: Arial`);
});
