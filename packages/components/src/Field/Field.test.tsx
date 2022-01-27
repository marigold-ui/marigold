import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Field } from './Field';

const theme = {
  space: {
    none: 0,
    small: 4,
    medium: 8,
  },
  label: {
    above: {
      fontSize: '14px',
    },
  },
  input: {
    __default: {
      padding: 'small',
    },
    error: {
      padding: 'medium',
    },
  },
};

test('renders correct HTML elements', () => {
  render(
    <ThemeProvider theme={theme}>
      <Field htmlFor="myId" label="label" data-testid="field" />
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);
  const field = screen.getByTestId(/field/);

  expect(label instanceof HTMLLabelElement).toBeTruthy();
  expect(field instanceof HTMLInputElement).toBeTruthy();
});

test('supports default variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Field htmlFor="myId" label="Name" data-testid="field" />
    </ThemeProvider>
  );
  const field = screen.getByTestId(/field/);
  expect(field).toHaveStyle(`padding: 4px`);
});

test('supports other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Field htmlFor="myId" label="Name" variant="error" data-testid="field" />
    </ThemeProvider>
  );
  const field = screen.getByTestId(/field/);
  expect(field).toHaveStyle(`padding: 8px`);
});

test('supports default variantLabel', () => {
  render(
    <ThemeProvider theme={theme}>
      <Field htmlFor="myId" label="Name" />
    </ThemeProvider>
  );
  const label = screen.getByText(/Name/);
  expect(label).toHaveStyle(`font-size: 14px`);
});

test('supports other variantLabel than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Field htmlFor="myId" label="Name" />
    </ThemeProvider>
  );
  const label = screen.getByText(/Name/);
  expect(label).toHaveStyle(`font-size: 14px`);
});

test('supports label prop', () => {
  render(<Field htmlFor="myId" label="Name" />);
  const field = screen.getByText(/Name/);

  expect(field).toBeDefined();
});

test('supports htmlFor prop', () => {
  render(<Field htmlFor="myId" label="Name" />);
  const field = screen.getByText(/Name/);

  expect(field).toHaveAttribute('for');
});

test('supports required prop', () => {
  render(<Field htmlFor="myId" label="label" required />);
  const fieldLabel = screen.getByText(/label/);

  expect(fieldLabel.nextSibling).toBeDefined();
  expect(fieldLabel.nextSibling instanceof SVGElement).toBeTruthy();
});

test('supports error and errorMessage prop', () => {
  render(
    <Field htmlFor="myId" label="label" error errorMessage="Validation error" />
  );

  const errorMessage = screen.getByText(/Validation/);
  expect(errorMessage).toBeDefined();
});

test('supports disabled prop', () => {
  render(<Field htmlFor="myId" label="label" disabled />);
  const fieldLabel = screen.getByText(/label/);
  expect(fieldLabel.nextSibling).toHaveAttribute('disabled');
});
