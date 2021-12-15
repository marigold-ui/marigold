import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Label } from './Label';

const theme = {
  fonts: {
    body: 'Inter Regular',
    label: 'Oswald',
  },
  label: {
    above: {
      fontFamily: 'body',
    },
    myLabel: {
      fontFamily: 'label',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label htmlFor="labelId">label</Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);

  expect(label).toHaveStyle(`font-family: Inter Regular`);
});

test('supports other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label htmlFor="labelId" variant="myLabel">
        label
      </Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);

  expect(label).toHaveStyle(`font-family: Oswald`);
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
      <Label htmlFor="labelId" required>
        label
      </Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);
  const parent = label.parentElement;

  expect(parent instanceof HTMLSpanElement).toBeTruthy();
});

test('renders <label> element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label htmlFor="labelId">label</Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);

  expect(label instanceof HTMLLabelElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label htmlFor="labelId" className="custom-class-name" title="label">
        label
      </Label>
    </ThemeProvider>
  );
  const label = screen.getByTitle(/label/);

  expect(label.className).toMatch('custom-class-name');
});
