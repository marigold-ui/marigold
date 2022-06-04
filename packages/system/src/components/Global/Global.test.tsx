/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../hooks';

import { Global } from './Global';

test('normalize document (html, body)', () => {
  render(<Global />);

  const html = document.querySelector('html')!;
  expect(html).toHaveStyle('height: 100%');

  const body = document.querySelector('body')!;
  expect(body).toHaveStyle('height: 100%');
  expect(body).toHaveStyle('line-height: 1.5');
});

test('opt out of document normalization', () => {
  render(<Global normalizeDocument={false} />);

  const html = document.querySelector('html')!;
  expect(html).not.toHaveStyle('height: 100%');

  const body = document.querySelector('body')!;
  expect(body).not.toHaveStyle('height: 100%');
  expect(body).not.toHaveStyle('line-height: 1.5');
});

test('normalize elements', () => {
  render(
    <>
      <Global />
      <div data-testid="div">Div</div>
      <p data-testid="p">Paragraph</p>
      <a data-testid="a">Link</a>
      <button data-testid="button">Button</button>
      <img data-testid="img" alt="foo" src="" />
    </>
  );

  const div = screen.getByTestId('div');
  expect(div).toHaveStyle('box-sizing: border-box');
  expect(div).toHaveStyle('margin: 0');

  const p = screen.getByTestId('p');
  expect(p).toHaveStyle('box-sizing: border-box');
  expect(p).toHaveStyle('margin: 0');
  expect(p).toHaveStyle('overflow-wrap: break-word');

  const a = screen.getByTestId('a');
  expect(a).toHaveStyle('box-sizing: border-box');
  expect(a).toHaveStyle('margin: 0');
  expect(a).toHaveStyle('text-decoration: none');

  const button = screen.getByTestId('button');
  expect(button).toHaveStyle('box-sizing: border-box');
  expect(button).toHaveStyle('margin: 0');
  expect(button).toHaveStyle('display: block');
  expect(button).toHaveStyle('appearance: none');
  expect(button).toHaveStyle('font: inherit');
  expect(button).toHaveStyle('background: transparent');
  expect(button).toHaveStyle('text-align: center');

  const img = screen.getByTestId('img');
  expect(img).toHaveStyle('box-sizing: border-box');
  expect(img).toHaveStyle('margin: 0');
  expect(img).toHaveStyle('display: block');
  expect(img).toHaveStyle('max-width: 100%');
});

test('apply element normalization to a selector (instead of the whole document)', () => {
  render(
    <>
      <Global selector="#root" />
      <p data-testid="outside">Paragraph</p>
      <div id="root">
        <p data-testid="inside">Paragraph</p>
      </div>
    </>
  );

  const outside = screen.getByTestId('outside');
  expect(outside).not.toHaveStyle('box-sizing: border-box');
  expect(outside).not.toHaveStyle('margin: 0');
  expect(outside).not.toHaveStyle('overflow-wrap: break-word');

  const inside = screen.getByTestId('inside');

  console.log(getComputedStyle(inside));
  expect(inside).toHaveStyle('box-sizing: border-box');
  expect(inside).toHaveStyle('margin: 0');
  expect(inside).toHaveStyle('overflow-wrap: break-word');
});

test.skip('applies global styles for body and html based on `theme.root`', () => {
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
    <ThemeProvider theme={theme}>
      <Global />
    </ThemeProvider>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const html = view.baseElement.parentElement;
  expect(html).toHaveStyle(`background: ${theme.colors.background}`);

  const body = view.baseElement;
  expect(body).toHaveStyle(`font-family: ${theme.fonts.body}`);
  expect(body).toHaveStyle(`line-height: ${theme.lineHeights.body}`);
  expect(body).toHaveStyle(`font-weight: ${theme.fontWeights.body}`);
});
