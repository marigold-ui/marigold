import { render, screen } from '@testing-library/react';
import { Basic, WithIcons } from './Input.stories';

test('applies base styles', () => {
  render(<Basic.Component data-testid="input" />);
  const input = screen.getByTestId('input');

  expect(input).toHaveClass('flex-1');
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

test('constrains the leading icon to 16px so it stays clear of the text', () => {
  render(<WithIcons.Component />);
  const action = screen.getByRole('button');
  // The leading icon is the svg rendered outside the trailing action button.
  // eslint-disable-next-line testing-library/no-node-access
  const icon = [...document.querySelectorAll('svg')].find(
    svg => !action.contains(svg)
  )!;

  expect(icon.getBoundingClientRect().width).toBe(16);
});

test('keeps the action a control-sized touch target', () => {
  render(<WithIcons.Component />);
  const action = screen.getByRole('button');

  expect(action.getBoundingClientRect().height).toBe(36);
});
