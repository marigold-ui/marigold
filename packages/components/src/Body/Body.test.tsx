import React from 'react';
import { render, screen } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';

import { Body } from './Body';

import { cva } from 'class-variance-authority';

const theme: Theme = {
  name: 'test',
  components: {
    Body: cva('p-1 flex-1', {
      variants: {
        variant: {
          yellow: 'bg-yellow-200',
        },
        size: {
          medium: 'p-2',
        },
      },
    }),
  },
};

test('renders as a "section" element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Body data-testid="body" />
    </ThemeProvider>
  );

  const body = screen.getByTestId('body');
  expect(body.tagName).toEqual('SECTION');
});

test('has base classnames', () => {
  render(
    <ThemeProvider theme={theme}>
      <Body data-testid="body" />
    </ThemeProvider>
  );

  const body = screen.getByTestId('body');
  expect(body).toHaveClass(`p-1 flex-1`);
});

test('body accepts a variant and size classnames', () => {
  render(
    <ThemeProvider theme={theme}>
      <Body data-testid="body" variant="yellow" size="medium" />
    </ThemeProvider>
  );
  const body = screen.getByTestId('body');
  expect(body).toMatchInlineSnapshot(`
    <section
      class="flex-1 bg-yellow-200 p-2"
      data-testid="body"
    />
  `);
});
