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

  expect(text).toHaveClass(`font-["Arial"]`);
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

test('style props override theme styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text variant="one" color="red-700">
        text
      </Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);
  expect(text.style.getPropertyValue('--color')).toEqual('red-700');
});

test('get theme color', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text data-testid="text" color="emerald" />
    </ThemeProvider>
  );

  const text = screen.getByTestId('text');
  expect(text.style.getPropertyValue('--color')).toEqual(theme.colors!.emerald);
});
