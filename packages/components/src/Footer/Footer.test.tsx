import React from 'react';
import { render, screen } from '@testing-library/react';
import { Theme, ThemeProvider, cva } from '@marigold/system';

import { Footer } from './Footer';

const theme: Theme = {
  name: 'test',
  components: {
    Footer: cva('border border-gray-500 p-1', {
      variants: {
        variant: {
          yellow: 'bg-yellow-500',
        },
        size: {
          medium: 'p-5',
        },
      },
    }),
  },
};

test('renders as a "footer" element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Footer data-testid="footer" />
    </ThemeProvider>
  );

  const footer = screen.getByTestId('footer');
  expect(footer.tagName).toEqual('FOOTER');
});

test('uses base styling form "footer" in theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Footer data-testid="footer" />
    </ThemeProvider>
  );
  const footer = screen.getByTestId('footer');
  expect(footer).toHaveClass('p-1 border border-gray-500');
});

test('footer accepts a variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Footer data-testid="footer" variant="yellow" size="medium" />
    </ThemeProvider>
  );
  const footer = screen.getByTestId('footer');
  expect(footer).toMatchInlineSnapshot(`
    <footer
      class="border border-gray-500 bg-yellow-500 p-5"
      data-testid="footer"
    />
  `);
});
