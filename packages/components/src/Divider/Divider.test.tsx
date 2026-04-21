import { render, screen } from '@testing-library/react';
import { Basic, Bold, Vertical } from './Divider.stories';

test('renders as hr element', () => {
  render(<Basic.Component data-testid="divider" />);
  const divider = screen.getByTestId('divider');

  expect(divider).toBeInstanceOf(HTMLHRElement);
});

test('applies border-none base class', () => {
  render(<Basic.Component data-testid="divider" />);
  const divider = screen.getByTestId('divider');

  expect(divider).toHaveClass('border-none');
});

test('bold variant has different styling than default', () => {
  const { unmount } = render(<Basic.Component data-testid="divider-default" />);
  const defaultDivider = screen.getByTestId('divider-default');
  const defaultClasses = defaultDivider.className;
  unmount();

  render(<Bold.Component data-testid="divider-bold" />);
  const boldDivider = screen.getByTestId('divider-bold');

  expect(boldDivider.className).not.toBe(defaultClasses);
});

test('default orientation applies horizontal classes', () => {
  render(<Basic.Component data-testid="divider" />);
  const divider = screen.getByTestId('divider');

  expect(divider).toHaveClass('h-px', 'min-w-full');
});

test('vertical orientation applies vertical classes', () => {
  render(<Vertical.Component data-testid="divider" />);
  const divider = screen.getByTestId('divider');

  expect(divider).toHaveClass(
    'min-h-full',
    'w-px',
    'shrink-0',
    'border-0',
    'self-stretch'
  );
});
