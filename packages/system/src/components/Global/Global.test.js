import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../hooks';
import { Global } from './Global';
test('applies normlaization to html and body', () => {
  const view = render(React.createElement(Global, null));
  // eslint-disable-next-line testing-library/no-node-access
  const html = window.getComputedStyle(view.baseElement.parentElement);
  expect(html.height).toBe('100%');
  // expect(html.textSizeAdjust).toBe('none'); can not test this in JSDOM :(
  const body = window.getComputedStyle(view.baseElement);
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
  const view = render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Global, null)
    )
  );
  // eslint-disable-next-line testing-library/no-node-access
  const html = view.baseElement.parentElement;
  expect(html).toHaveStyle(`background: ${theme.colors.background}`);
  const body = view.baseElement;
  expect(body).toHaveStyle(`font-family: ${theme.fonts.body}`);
  expect(body).toHaveStyle(`line-height: ${theme.lineHeights.body}`);
  expect(body).toHaveStyle(`font-weight: ${theme.fontWeights.body}`);
});
//# sourceMappingURL=Global.test.js.map
