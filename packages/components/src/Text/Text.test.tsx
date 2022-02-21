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
  text: {
    body: {
      fontFamily: 'Oswald Regular',
    },
    headline1: {
      fontFamily: 'Inter',
    },
  },
};

test('uses `text.body` as default variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text>text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text).toHaveStyle(`font-family: Oswald Regular`);
});

test('allows to change variants via `variant` prop (with "text" prefix)', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text variant="headline1">text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text).toHaveStyle(`font-family: Inter`);
});

test('renders a <span> element by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text>text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text instanceof HTMLSpanElement).toBeTruthy();
});

test('allows to control the rendered element via the `as` prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text as="p">text</Text>
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
  [{ size: 'body' }, `font-size: ${theme.fontSizes.body}`],
  [{ size: 'medium' }, `font-size: ${theme.fontSizes.medium}`],
  [{ userSelect: 'none' }, 'user-select: none'],
])('test style prop %o', (...args) => {
  const props = args.shift();

  render(
    <ThemeProvider theme={theme}>
      <Text {...props}>This is the Text!</Text>
    </ThemeProvider>
  );

  const box = screen.getByText('This is the Text!');
  args.forEach((style: any) => {
    expect(box).toHaveStyle(style);
  });
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(
    <Text as="button" ref={ref}>
      button
    </Text>
  );

  expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
});
