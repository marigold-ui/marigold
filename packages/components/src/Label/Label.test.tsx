import { render, screen } from '@testing-library/react';

import { Theme, ThemeProvider, cva } from '@marigold/system';

import { Label } from './Label';

const theme: Theme = {
  name: 'test',
  components: {
    Label: {
      container: cva('', {
        variants: {
          variant: {
            lime: 'text-lime-600',
          },
          size: {
            small: 'p-1',
          },
        },
      }),
      indicator: cva(''),
    },
  },
};

test('uses base styles from theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label>label</Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);

  expect(label.className).toMatchInlineSnapshot(`"flex w-[var(--labelWidth)]"`);
});

test('supports htmlFor prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label htmlFor="labelId">label</Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);

  expect(label).toHaveAttribute('for');
});

test('renders <label> element by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label>label</Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);
  expect(label instanceof HTMLLabelElement).toBeTruthy();
});

test('accepts labelwidth as css variable and set the style', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label labelWidth="100px">label</Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);
  expect(label.className).toMatchInlineSnapshot(`"flex w-[var(--labelWidth)]"`);
});
