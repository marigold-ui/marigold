import React from 'react';
import { render, screen } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';

import { tv } from 'tailwind-variants';
import { Text } from './Text';

const theme: Theme = {
  name: 'test',
  components: {
    Text: tv({
      base: "font-['Oswald_Regular']",
      variants: {
        variant: {
          one: ['font-["Arial"] text-blue-600'],
        },
      },
    }),
  },
};

test('uses base as default variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text>text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);
  expect(text).toHaveClass(`font-['Oswald_Regular']`);
});

test('uses theme styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text variant="one">text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text).toHaveClass(`font-["Arial"]`);
  expect(text).toHaveClass(`text-blue-600`);
});

test('renders a <p> element by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text>text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text instanceof HTMLParagraphElement).toBeTruthy();
});

test('style props override theme styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text variant="one" className="text-red-700">
        text
      </Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text).toHaveClass(`font-["Arial"]`);
  expect(text).toHaveClass(`text-red-700`);
});
