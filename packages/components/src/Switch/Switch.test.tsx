import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { RefObject } from 'react';
import { vi } from 'vitest';
import { Basic, Settings } from './Switch.stories';

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

  expect(input).toHaveAccessibleDescription('Connect to nearby networks');
});

test('shows error message instead of description when error is set', () => {
  render(
    <Basic.Component
      label="Wi-Fi"
      error
      description="Connect to nearby networks"
      errorMessage="Wi-Fi is required"
    />
  );

  expect(screen.getByText('Wi-Fi is required')).toBeInTheDocument();
  expect(
    screen.queryByText('Connect to nearby networks')
  ).not.toBeInTheDocument();
});

test('connects error message via aria-describedby', () => {
  render(
    <Basic.Component label="Wi-Fi" error errorMessage="Wi-Fi is required" />
  );

  const input = screen.getByRole('switch');

  expect(input).toHaveAccessibleDescription('Wi-Fi is required');
});

test('does not render help text when neither description nor error is set', () => {
  render(<Basic.Component label="Wi-Fi" />);

  const input = screen.getByRole('switch');

  expect(input).not.toHaveAttribute('aria-describedby');
});

test('ignores errorMessage while error is not set', () => {
  render(<Basic.Component label="Wi-Fi" errorMessage="Wi-Fi is required" />);

  const input = screen.getByRole('switch');

  expect(screen.queryByText('Wi-Fi is required')).not.toBeInTheDocument();
  expect(input).not.toHaveAttribute('aria-describedby');
});

test('takes full width by default', () => {
  render(<Basic.Component label="Label" />);
  const switchEl = screen.getByRole('switch');
  // eslint-disable-next-line testing-library/no-node-access -- need to check style on the label wrapper
  const container = switchEl.closest('label')!;
  expect(container.style.getPropertyValue('--width')).toBe('100%');
});

test('allows to set width via prop', () => {
  render(<Basic.Component width={10} label="Label" />);
  const switchEl = screen.getByRole('switch');
  // eslint-disable-next-line testing-library/no-node-access -- need to check style on the label wrapper
  const container = switchEl.closest('label')!;
  expect(container.style.getPropertyValue('--width')).not.toBe('100%');
});

test('supports disabled prop', () => {
  render(<Basic.Component disabled label="Label" />);
  expect(screen.getByRole('switch')).toBeDisabled();
});

test('supports controlled component usage', async () => {
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
  const ref: RefObject<HTMLLabelElement | null> = { current: null };
  render(<Basic.Component ref={ref} label="Label" />);
  expect(ref.current).toBeInstanceOf(HTMLLabelElement);
});

test('renders settings variant with description', () => {
  render(<Settings.Component />);

  expect(screen.getByRole('switch')).toBeInTheDocument();
  expect(screen.getByText('Email notifications')).toBeInTheDocument();
  expect(
    screen.getByText('Receive email notifications when someone mentions you')
  ).toBeInTheDocument();
});
