import React from 'react';
import { render, screen } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';

import { cva } from 'class-variance-authority';
import { Text } from './Text';

const theme: Theme = {
  name: 'test',
  components: {
    Text: cva("font-['Oswald_Regular']", {
      variants: {
        variant: {
          one: 'font-["Arial]"',
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

  expect(text).toMatchInlineSnapshot(`
    <p
      class="font-["Arial]" text-[--color] outline-[--outline] italic normal cursor-default font-normal text-[13px]"
    >
      text
    </p>
  `);
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
      <Text variant="one" color="red-700">
        text
      </Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text).toMatchInlineSnapshot(`
    <p
      class="font-["Arial]" text-[--color] outline-[--outline] italic normal cursor-default font-normal text-[13px]"
    >
      text
    </p>
  `);
});
