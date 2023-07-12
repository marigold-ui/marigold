import React from 'react';
import { render, screen } from '@testing-library/react';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { Text } from './Text';

const theme: Theme = {
  name: 'test',
  colors: {
    emerald: 'rgb(5 150 105)',
  },
  components: {
    Text: cva('font-["Oswald_Regular"]', {
      variants: {
        variant: {
          one: 'font-["Arial"]',
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
  expect(text).toHaveClass(`font-["Oswald_Regular"]`);
});

test('uses theme styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text variant="one">text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text.className).toMatchInlineSnapshot(
    `"font-["Arial"] text-[--color] outline-[--outline]"`
  );
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

  expect(text.className).toMatchInlineSnapshot(
    `"font-["Arial"] text-[--color] outline-[--outline]"`
  );
  expect(text.style.cssText).toMatchInlineSnapshot(`"--color: red-700;"`);
});

test('get theme color', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text data-testid="text" color="emerald" />
    </ThemeProvider>
  );

  const text = screen.getByTestId('text');
  expect(text).toMatchInlineSnapshot(`
    <p
      class="font-["Oswald_Regular"] text-[--color] outline-[--outline]"
      data-testid="text"
      style="--color: rgb(5 150 105);"
    />
  `);
});
