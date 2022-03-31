import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { TextField } from './TextField';

const theme = {
  colors: {
    blue: '#00f',
  },
  input: {
    borderColor: 'blue',
  },
};

test('renders an text input', () => {
  render(<TextField label="Label" data-testid="text-field" />);

  const textField = screen.getByTestId('text-field');
  expect(textField).toBeInTheDocument();
  expect(textField).toHaveAttribute('type', 'text');
  expect(textField instanceof HTMLInputElement).toBeTruthy();
});

test('allows to change the input type', () => {
  render(<TextField label="Label" type="email" data-testid="text-field" />);

  const textField = screen.getByTestId('text-field');
  expect(textField).toHaveAttribute('type', 'email');
});

test('input can be styled via variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <TextField label="A Label" data-testid="text-field" />
    </ThemeProvider>
  );
  const textField = screen.getByTestId('text-field');
  expect(textField).toHaveStyle(`border-color: ${theme.colors.blue}`);
});

test('supports disabled', () => {
  render(<TextField label="A Label" disabled data-testid="text-field" />);

  const textField = screen.getByTestId('text-field');
  expect(textField).toBeDisabled();
});

test('supports required', () => {
  render(<TextField label="A Label" required data-testid="text-field" />);

  const textField = screen.getByTestId('text-field');
  /** Note that the required attribute is not passed down! */
  expect(textField).toHaveAttribute('aria-required', 'true');
});

test('supports readonly', () => {
  render(<TextField label="A Label" readOnly data-testid="text-field" />);

  const textField = screen.getByTestId('text-field');
  expect(textField).toHaveAttribute('readonly');
});

test('supports field structure', () => {
  render(
    <TextField
      label="A Label"
      description="Some helpful text"
      errorMessage="Whoopsie"
    />
  );

  const label = screen.queryByText('A Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryByText('Some helpful text');
  expect(description).toBeInTheDocument();

  const error = screen.queryByText('Whoopsie');
  expect(error).not.toBeInTheDocument();
});

test('supports field structure (with error)', () => {
  render(
    <TextField
      label="A Label"
      description="Some helpful text"
      error={true}
      errorMessage="Whoopsie"
    />
  );

  const label = screen.queryByText('A Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryByText('Some helpful text');
  expect(description).not.toBeInTheDocument();

  const error = screen.queryByText('Whoopsie');
  expect(error).toBeInTheDocument();
});

test('correctly sets up aria attributes', () => {
  render(
    <TextField
      data-testid="text-field"
      label="A Label"
      description="Some helpful text"
    />
  );

  const label = screen.getByText('A Label');
  const input = screen.getByTestId('text-field');
  const description = screen.getByText('Some helpful text');

  const htmlFor = label.getAttribute('for');
  const labelId = label.getAttribute('id');
  const inputId = input.getAttribute('id');

  expect(label).toHaveAttribute('for', inputId);
  expect(input).toHaveAttribute('aria-labelledby', labelId);

  console.log(description.getAttribute('id'));
  console.log(inputId, htmlFor);
});

// aria-invalid aria-errormessage

// test('can have default value');
// test('can be controlled');
