import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Body } from './Body';

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
    Body: {
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

test('renders as a "section" element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Body data-testid="body" />
    </ThemeProvider>
  );

  const body = screen.getByTestId('body');
  expect(body.tagName).toEqual('SECTION');
});

test('takes available space by default', () => {
  render(<Body data-testid="body" />);

  const body = screen.getByTestId('body');
  expect(body).toHaveStyle(`flex: 1`);
});

test('uses base styling form "body" in theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Body data-testid="body" />
    </ThemeProvider>
  );
  const body = screen.getByTestId('body');
  expect(body).toHaveStyle(`padding: ${theme.space['small-1']}px`);
});

test('body accepts a variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Body data-testid="body" variant="yellow" size="medium" />
    </ThemeProvider>
  );
  const body = screen.getByTestId('body');
  expect(body).toHaveStyle(`background: ${theme.colors.yellow}`);
  expect(body).toHaveStyle(`padding: ${theme.space['medium-1']}px`);
});
