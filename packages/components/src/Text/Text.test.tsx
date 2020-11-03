import React from 'react';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';
import { ThemeProvider } from '@marigold/system';

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

test('accepts default variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text>text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text).toHaveStyle(`font-family: Oswald Regular`);
});

test('variant works', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text variant="body">text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text).toHaveStyle(`font-family: Oswald Regular`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text variant="heading" textColor="#000">
        text
      </Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text).toHaveStyle(`color: rgb(0,0,0)`);
  expect(text).toHaveStyle(`font-family: Inter`); // ?
});
