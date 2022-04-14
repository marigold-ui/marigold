import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Content } from './Content';

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
    Content: {
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
      <Content data-testid="content" />
    </ThemeProvider>
  );

  const content = screen.getByTestId('content');
  expect(content.tagName).toEqual('SECTION');
});

test('uses base styling form "content" in theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Content data-testid="content" />
    </ThemeProvider>
  );
  const content = screen.getByTestId('content');
  expect(content).toHaveStyle(`padding: ${theme.space['small-1']}px`);
});

test('content accepts a variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Content data-testid="content" variant="yellow" size="medium" />
    </ThemeProvider>
  );
  const content = screen.getByTestId('content');
  expect(content).toHaveStyle(`background: ${theme.colors.yellow}`);
  expect(content).toHaveStyle(`padding: ${theme.space['medium-1']}px`);
});
