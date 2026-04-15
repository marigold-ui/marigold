import { render, screen } from '@testing-library/react';
import { Basic, Bold } from './Divider.stories';

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
