import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Text } from './Text';

const theme = {
  colors: {
    primary: 'hotpink',
    black: '#000',
    white: '#FFF',
    blue: '#2980b9',
  },
  fontSizes: {
    body: '1rem',
    medium: '1.25rem',
  },

  components: {
    Text: {
      base: {
        fontFamily: 'Oswald Regular',
      },
      variant: {
        one: {
          fontFamily: 'Arial',
          color: 'green',
        },
      },
    },
  },
};

test('uses base as default variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text>text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text).toHaveStyle(`font-family: Oswald Regular`);
});

test('renders a <p> element by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text>text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text instanceof HTMLParagraphElement).toBeTruthy();
});

test.each([
  [{ color: 'primary' }, `color: ${theme.colors.primary}`],
  [{ color: 'blue' }, `color: ${theme.colors.blue}`],
  [{ align: 'center' }, 'text-align: center'],
  [{ cursor: 'pointer' }, 'cursor: pointer'],
  [{ outline: 'dashed red' }, 'outline: dashed red'],
  [{ fontSize: 'body' }, `font-size: ${theme.fontSizes.body}`],
  [{ fontSize: 'medium' }, `font-size: ${theme.fontSizes.medium}`],
])('test style prop %o', (...args) => {
  const props = args.shift();

  render(
    <ThemeProvider theme={theme}>
      <Text {...(props as any)}>This is the Text!</Text>
    </ThemeProvider>
  );

  const box = screen.getByText('This is the Text!');
  args.forEach((style: any) => {
    expect(box).toHaveStyle(style);
  });
});
