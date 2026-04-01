import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { vi } from 'vitest';
import { Basic } from './Switch.stories';

const user = userEvent.setup();

test('renders as a switch role', () => {
  render(<Basic.Component label="Label" />);
  expect(screen.getByRole('switch')).toBeInTheDocument();
});

test('renders label text', () => {
  render(<Basic.Component label="Wi-Fi" />);
  expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
});

test('renders description text', () => {
  render(
    <Basic.Component label="Wi-Fi" description="Connect to nearby networks" />
  );
  expect(screen.getByText('Connect to nearby networks')).toBeInTheDocument();
});

test('connects description via aria-describedby', () => {
  render(
    <Basic.Component label="Wi-Fi" description="Connect to nearby networks" />
  );

  const input = screen.getByRole('switch');
  expect(input).toHaveAttribute('aria-describedby');

  const describedById = input.getAttribute('aria-describedby')!;
  const description = document.getElementById(describedById);
  expect(description).toHaveTextContent('Connect to nearby networks');
});

test('takes full width by default', () => {
  render(<Basic.Component label="Label" />);
  const container = screen.getByRole('switch').closest('label')!;
  expect(container).toHaveClass('w-full');
});

test('allows to set width via prop', () => {
  render(<Basic.Component width={10} label="Label" />);
  const container = screen.getByRole('switch').closest('label')!;
  expect(container).not.toHaveClass('w-full');
});

test('supports disabled prop', () => {
  render(<Basic.Component disabled label="Label" />);
  expect(screen.getByRole('switch')).toBeDisabled();
});

test('supports controlled selection', async () => {
  const onChange = vi.fn();
  render(<Basic.Component onChange={onChange} label="Label" />);

  const input = screen.getByRole('switch');

  await user.click(input);
  expect(onChange).toHaveBeenCalledWith(true);
  expect(input).toBeChecked();

  await user.click(input);
  expect(onChange).toHaveBeenCalledWith(false);
  expect(input).not.toBeChecked();
});

test('supports defaultSelected', () => {
  render(<Basic.Component defaultSelected label="Label" />);
  expect(screen.getByRole('switch')).toBeChecked();
});

test('supports name attribute for form submission', () => {
  render(<Basic.Component name="wifi" label="Wi-Fi" />);
  expect(screen.getByRole('switch')).toHaveAttribute('name', 'wifi');
});

test('forwards ref', () => {
  const ref = createRef<HTMLLabelElement>();
  render(<Basic.Component ref={ref} label="Label" />);
  expect(ref.current).toBeInstanceOf(HTMLLabelElement);
});
