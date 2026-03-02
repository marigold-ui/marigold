import { render, screen } from '@testing-library/react';
import { Basic, Bold } from './Divider.stories';

test('renders correct HTML element', () => {
  render(<Basic.Component data-testid="divider" />);
  const divider = screen.getByTestId('divider');

  expect(divider instanceof HTMLHRElement).toBeTruthy();
});

test('supports default variant', () => {
  render(<Basic.Component data-testid="divider" />);
  const divider = screen.getByTestId('divider');

  expect(divider).toBeInTheDocument();
});

test('supports bold variant', () => {
  render(<Bold.Component data-testid="divider" />);
  const divider = screen.getByTestId('divider');

  expect(divider).toBeInTheDocument();
});
