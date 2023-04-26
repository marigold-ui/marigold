import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';
import { Label } from './Label';

import { tv } from 'tailwind-variants';

const theme: Theme = {
  name: 'test',
  components: {
    Label: tv({
      base: ['font-["Inter_Regular"] text-black'],
    }),
  },
};

test('uses base styles from theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label>label</Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);

  expect(label).toHaveClass(`font-["Inter_Regular"] text-black`);
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

test('supports required prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label data-testid="label" required>
        label
      </Label>
    </ThemeProvider>
  );
  const label = screen.getByTestId(/label/);
  const requiredIcon = within(label).getByRole('presentation');
  expect(requiredIcon).toBeInTheDocument();
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

test('can render as <span>', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label as="span">label</Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);
  expect(label instanceof HTMLSpanElement).toBeTruthy();
});

test('accepts labelwidth as css variable and set the style', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label as="span" labelWidth="100px">
        label
      </Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);
  expect(label).toMatchInlineSnapshot(`
    <span
      class="flex w-[var(--labelWidth)] font-["Inter_Regular"] text-black"
      style="--labelWidth: 100px;"
    >
      label
    </span>
  `);
});
