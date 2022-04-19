import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Footer } from './Footer';

const theme = {
  space: {
    none: 0,
    'small-1': 4,
    'medium-1': 16,
  },
  colors: {
    grey: '#dee2e6',
    yellow: '#fff9db',
  },
  components: {
    Footer: {
      base: {
        p: 'small-1',
        border: '1px solid',
        borderColor: 'grey',
      },
      variant: {
        yellow: {
          bg: 'yellow',
        },
      },
      size: {
        medium: {
          p: 'medium-1',
        },
      },
    },
  },
};

test('renders as a "footer" element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Footer data-testid="footer" />
    </ThemeProvider>
  );

  const footer = screen.getByTestId('footer');
  expect(footer.tagName).toEqual('SECTION');
});

test('uses base styling form "footer" in theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Footer data-testid="footer" />
    </ThemeProvider>
  );
  const footer = screen.getByTestId('footer');
  expect(footer).toHaveStyle(`padding: ${theme.space['small-1']}px`);
});

test('footer accepts a variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Footer data-testid="footer" variant="yellow" size="medium" />
    </ThemeProvider>
  );
  const footer = screen.getByTestId('footer');
  expect(footer).toHaveStyle(`background: ${theme.colors.yellow}`);
  expect(footer).toHaveStyle(`padding: ${theme.space['medium-1']}px`);
});
