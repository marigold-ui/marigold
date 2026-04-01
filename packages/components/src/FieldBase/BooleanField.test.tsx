import { render, screen } from '@testing-library/react';
import { Basic as CheckboxBasic } from '../Checkbox/Checkbox.stories';
import { Basic as SwitchBasic } from '../Switch/Switch.stories';

test('renders without wrapper when no description is provided', () => {
  render(<CheckboxBasic.Component label="Accept terms" />);

  expect(screen.getByRole('checkbox')).toBeInTheDocument();
  expect(screen.getByText('Accept terms')).toBeInTheDocument();
});

test('renders description as help text for Checkbox', () => {
  render(
    <CheckboxBasic.Component
      label="Accept terms"
      description="You must accept the terms to continue"
    />
  );

  expect(
    screen.getByText('You must accept the terms to continue')
  ).toBeInTheDocument();
});

test('connects description to Checkbox via aria-describedby', () => {
  render(
    <CheckboxBasic.Component
      label="Accept terms"
      description="You must accept the terms to continue"
    />
  );

  const checkbox = screen.getByRole('checkbox');
  const description = screen.getByText('You must accept the terms to continue');

  expect(checkbox).toHaveAttribute('aria-describedby');
  expect(checkbox.getAttribute('aria-describedby')).toBe(
    description.closest('[id]')?.id
  );
});

test('renders description as help text for Switch', () => {
  render(
    <SwitchBasic.Component
      label="Wi-Fi"
      description="Connect to nearby networks"
    />
  );

  expect(screen.getByText('Connect to nearby networks')).toBeInTheDocument();
});

test('connects description to Switch via aria-describedby', () => {
  render(
    <SwitchBasic.Component
      label="Wi-Fi"
      description="Connect to nearby networks"
    />
  );

  const switchEl = screen.getByRole('switch');
  const description = screen.getByText('Connect to nearby networks');

  expect(switchEl).toHaveAttribute('aria-describedby');
  expect(switchEl.getAttribute('aria-describedby')).toBe(
    description.closest('[id]')?.id
  );
});
