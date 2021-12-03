import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from './useTheme';

import { Global } from './Global';

test('applies normlaization to html and body', () => {
  const root = render(<Global />);

  const html = window.getComputedStyle(root.baseElement.parentElement!);
  expect(html.height).toBe('100%');
  const body = window.getComputedStyle(root.baseElement);
  expect(body.height).toBe('100%');
  expect(body.lineHeight).toBe('1.5');
});

test('applies global styles for body and html based on `theme.root`', () => {
  const theme = {
    colors: {
      background: '#fff',
    },
    fonts: {
      body: 'Inter',
    },
    lineHeights: {
      body: 2.5,
    },
    fontWeights: {
      body: 500,
      html: 700,
    },
    root: {
      body: {
        fontFamily: 'body',
        lineHeight: 'body',
        fontWeight: 'body',
      },
      html: {
        bg: 'background',
      },
    },
  };

  const root = render(
    <ThemeProvider theme={theme}>
      <Global />
    </ThemeProvider>
  );

  const html = root.baseElement.parentElement;
  expect(html).toHaveStyle(`background: ${theme.colors.background}`);

  const body = root.baseElement;
  expect(body).toHaveStyle(`font-family: ${theme.fonts.body}`);
  expect(body).toHaveStyle(`line-height: ${theme.lineHeights.body}`);
  expect(body).toHaveStyle(`font-weight: ${theme.fontWeights.body}`);
});
