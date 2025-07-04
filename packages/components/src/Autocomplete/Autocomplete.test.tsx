import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import * as stories from './Autocomplete.stories';

// Setup
// ---------------
const { Basic } = composeStories(stories);

/**
 * We need to mock `matchMedia` because JSOM does not
 * implements it.
 */
const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

// Tests
// ---------------
test('renders an input', () => {
  render(<Basic />);

  const textField = screen.getByRole('combobox');

  expect(textField).toBeInTheDocument();
  expect(textField).toHaveAttribute('type', 'search');
  expect(textField instanceof HTMLInputElement).toBeTruthy();
});

test('renders a label', () => {
  render(<Basic label="Label" />);

  const label = screen.getByText('Label');

  expect(label).toBeInTheDocument();
  expect(label instanceof HTMLLabelElement).toBeTruthy();
});

test('supports disabled', () => {
  render(<Basic disabled />);

  const textField = screen.getByRole('combobox');

  expect(textField).toBeDisabled();
});

test('supports required', () => {
  render(<Basic required />);

  const textField = screen.getByRole('combobox');

  expect(textField).toBeRequired();
});

test('supports readonly', () => {
  render(<Basic readOnly />);

  const textField = screen.getByRole('combobox');

  expect(textField).toHaveAttribute('readonly');
});

test('supports showing an error', () => {
  render(<Basic error errorMessage="Error!" />);

  expect(screen.getByText('Error!')).toBeInTheDocument();
});

test('supports default value', () => {
  render(<Basic defaultValue="garlic" />);

  expect(screen.getByRole('combobox')).toHaveValue('garlic');
});
