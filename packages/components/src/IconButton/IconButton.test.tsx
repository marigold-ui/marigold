import { render, screen } from '@testing-library/react';
import { Basic } from './IconButton.stories';

test('has base styles', () => {
  render(<Basic.Component />);
  const button = screen.getByRole('button');

  expect(button).toHaveClass('shrink-0 cursor-pointer outline-0');
});

test('supports variant prop', () => {
  render(<Basic.Component variant="navigation" />);
  const button = screen.getByRole('button');

  expect(button).toBeInTheDocument();
});
