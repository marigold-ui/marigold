import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Basic, ButtonVariants } from './Button.stories';

test('add icon in button works as expected', () => {
  render(<ButtonVariants.Component />);

  // ButtonVariants renders one button with a Facebook icon and "Submit" label.
  const button = screen.getByText('Submit');
  const icon = screen.getByTestId(/facebook/);

  expect(button).toHaveClass('items-center justify-center');
  expect(icon).toHaveAttribute('width', '30px');
});

test('forwards ref', () => {
  const ref = createRef<HTMLButtonElement>();
  render(<Basic.Component ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLButtonElement);
});

test('supports disabled prop', () => {
  render(<Basic.Component disabled />);

  const button = screen.getByText(/Button/);

  expect(button).toHaveAttribute('disabled');
});

test('allows to take full width', () => {
  render(<Basic.Component fullWidth />);

  const button = screen.getByText(/Button/);

  expect(button).toHaveClass('w-full');
});

test('loading state', () => {
  render(<Basic.Component loading={true} />);

  const button = screen.getByRole('button');
  const svg = screen.getByRole('progressbar');

  expect(svg).toBeInTheDocument();
  expect(button).toHaveAttribute('data-pending', 'true');
  expect(button).toHaveClass('cursor-progress!');
});
