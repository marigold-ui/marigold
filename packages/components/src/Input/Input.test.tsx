import { render, screen } from '@testing-library/react';
import { Basic, WithAction, WithLeadingIcons } from './Input.stories';

test('renders correct HTML element', () => {
  render(<Basic.Component data-testid="input" />);
  const input = screen.getByTestId('input');

  expect(input instanceof HTMLInputElement).toBeTruthy();
});

test('applies base styles', () => {
  render(<Basic.Component data-testid="input" />);
  const input = screen.getByTestId('input');

  expect(input).toHaveClass('w-full');
});

test('supports placeholder prop', () => {
  render(<Basic.Component data-testid="input" placeholder="Enter text" />);
  const input = screen.getByTestId('input');

  expect(input).toHaveAttribute('placeholder', 'Enter text');
});

test('supports variant and size props', () => {
  render(<Basic.Component data-testid="input" variant="yellow" size="large" />);
  const input = screen.getByTestId('input');

  expect(input).toBeInTheDocument();
});

test('renders with leading icon', () => {
  render(<WithLeadingIcons.Component />);
  const icon = document.querySelector('svg');

  expect(icon).toBeInTheDocument();
});

test('renders with action', () => {
  render(<WithAction.Component />);
  const button = screen.getByRole('button');

  expect(button).toBeInTheDocument();
});
