import { render, screen } from '@testing-library/react';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { Text } from './Text';

const theme: Theme = {
  name: 'test',
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

  expect(text.className).toMatchInlineSnapshot(`"font-["Arial"]"`);
});

test('renders a <div> element by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text>text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text instanceof HTMLDivElement).toBeTruthy();
});

test('renders a <p>/<span> element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text as="p">paragraph</Text>
      <Text as="span">span</Text>
    </ThemeProvider>
  );
  const paragraph = screen.getByText(/paragraph/);
  const span = screen.getByText(/span/);

  expect(paragraph instanceof HTMLParagraphElement).toBeTruthy();
  expect(span instanceof HTMLSpanElement).toBeTruthy();
});

test('test variant works', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text variant="one">text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text.className).toMatchInlineSnapshot(`"font-["Arial"]"`);
});
