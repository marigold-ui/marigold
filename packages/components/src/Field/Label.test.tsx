import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Label } from './Label';

const theme = {
  fonts: {
    body: 'Inter Regular',
    label: 'Oswald',
  },
  colors: {
    text: 'black',
  },
  label: {
    above: {
      fontFamily: 'body',
      color: 'text',
    },
  },
};

test('supports default variant and styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label>label</Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);

  expect(label).toHaveStyle(`font-family: Inter Regular`);
  expect(label).toHaveStyle(`color: black`);
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
