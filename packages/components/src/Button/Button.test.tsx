import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Basic, WithIcon } from './Button.stories';

test('renders <button> element', () => {
  render(<Basic.Component />);

  const button = screen.getByText(/Button/);

  expect(button instanceof HTMLButtonElement).toBeTruthy();
});

test('add icon in button works as expected', () => {
  render(<WithIcon.Component>iconbutton</WithIcon.Component>);

  const button = screen.getByText(/iconbutton/);
  const icon = screen.getByTestId(/facebook/);

  expect(button instanceof HTMLButtonElement).toBeTruthy();
  expect(button).toHaveClass('items-center justify-center');
  expect(icon).toHaveAttribute('width', '30px');
});

test('forwards ref', () => {
  const ref = createRef<HTMLButtonElement>();
  render(<Basic.Component ref={ref} />);

  expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
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
  expect(button).toHaveAttribute('data-pending', 'true');
});
