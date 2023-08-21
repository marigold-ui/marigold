import { render, screen } from '@testing-library/react';

import { Theme, ThemeProvider, cva } from '@marigold/system';

import { Header } from './Header';

const theme: Theme = {
  name: 'test',
  components: {
    Header: cva('border border-gray-500 p-1', {
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

test('renders as a "header" element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Header data-testid="header" />
    </ThemeProvider>
  );

  const header = screen.getByTestId('header');
  expect(header.tagName).toEqual('HEADER');
});

test('uses base styling form "header" in theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Header data-testid="header" />
    </ThemeProvider>
  );
  const header = screen.getByTestId('header');
  expect(header).toHaveClass('p-1 border border-gray-500');
});

test('header accepts a variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Header data-testid="header" variant="yellow" size="medium" />
    </ThemeProvider>
  );
  const header = screen.getByTestId('header');
  expect(header).toMatchInlineSnapshot(`
    <header
      class="border border-gray-500 bg-yellow-500 p-5"
      data-testid="header"
    />
  `);
});
