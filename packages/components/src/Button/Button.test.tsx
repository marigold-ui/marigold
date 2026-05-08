import { render, screen } from '@testing-library/react';
import { Basic, WithIcon } from './Button.stories';

test('add icon in button works as expected', () => {
  render(<WithIcon.Component>iconbutton</WithIcon.Component>);

  const button = screen.getByText(/iconbutton/);
  const icon = screen.getByTestId(/download/);

  expect(button).toHaveClass('items-center justify-center');
  expect(getComputedStyle(icon).width).toBe('16px');
});

test('forwards ref', () => {
  let refValue: HTMLButtonElement | null = null;
  render(
    <Basic.Component
      ref={node => {
        refValue = node;
      }}
    />
  );

  expect(refValue).toBeInstanceOf(HTMLButtonElement);
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
