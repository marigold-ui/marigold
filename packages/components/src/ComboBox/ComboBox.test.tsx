import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';
import * as stories from './ComboBox.stories';

const { Basic } = composeStories(stories);

const user = userEvent.setup();

/**
 * We need to mock `matchMedia` because JSOM does not
 * implements it.
 */

const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

test('renders an input', () => {
  render(<Basic />);

  const textField = screen.getByRole('combobox');

  expect(textField).toBeInTheDocument();
  expect(textField).toHaveAttribute('type', 'text');
  expect(textField instanceof HTMLInputElement).toBeTruthy();
});

test('supports disabled', () => {
  render(<Basic label="Label" disabled />);

  const textField = screen.getAllByLabelText('Label')[0];
  expect(textField).toBeDisabled();
});

test('supports required', () => {
  render(<Basic label={'Label'} required />);

  const textField = screen.getAllByLabelText('Label')[0];
  expect(textField).toBeRequired();
});

test('supports readonly', () => {
  render(<Basic label="Label" readOnly />);

  const textField = screen.getAllByLabelText('Label')[0];
  expect(textField).toHaveAttribute('readonly');
});

test('uses field structure', () => {
  render(
    <Basic
      label="Label"
      description="Some helpful text"
      errorMessage="Whoopsie"
    />
  );

  const label = screen.queryByText('Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryAllByText('Some helpful text')[0];
  expect(description).toBeInTheDocument();

  const error = screen.queryByText('Whoopsie');
  expect(error).not.toBeInTheDocument();
});

test('opens the suggestions on user input', async () => {
  render(<Basic label="Label" />);

  const input = screen.getAllByLabelText('Label')[0];
  await user.type(input, 'C');

  const item = await screen.findByText('Cat');
  expect(item).toBeInTheDocument();
});

test('opens the suggestions on focus', async () => {
  render(<Basic label="Label" menuTrigger="focus" />);

  const input = screen.getAllByLabelText('Label')[0];
  await user.click(input);

  const item = await screen.findByText('Dog');
  expect(item).toBeInTheDocument();
});

test('supports disabling suggestions', async () => {
  render(<Basic label="Label" disabledKeys={['dog']} />);

  const input = screen.getAllByLabelText('Label')[0];
  await user.type(input, 'd');

  const spinach = screen.getByRole('option', { name: 'Dog' });
  expect(spinach).toHaveAttribute('aria-disabled', 'true');
});

test('supporst showing a help text', () => {
  render(<Basic label="Label" description="This is a description" />);

  const description = screen.getAllByText('This is a description')[0];
  expect(description).toBeInTheDocument();
});

test('supporst showing an error', () => {
  render(
    <Basic
      label="Label"
      data-testid="input-field"
      error
      errorMessage="Error!"
    />
  );

  expect(screen.getByText('Error!')).toBeInTheDocument();
});

test('supports default value', () => {
  render(<Basic label="Label" defaultValue="garlic" />);

  const textField = screen.getAllByLabelText('Label')[0];
  expect(textField).toHaveValue('garlic');
});

test('supports autocompletion', async () => {
  render(<Basic label="Label" />);

  const input = screen.getAllByLabelText('Label')[0];
  await user.type(input, 'do');

  const dog = screen.getByText('Dog');
  await user.click(dog);

  expect(input).toHaveValue('Dog');
});

test('supports loading state', () => {
  render(<Basic label="Label" loading />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('hides loading state when loading is false', () => {
  render(<Basic label="Label" loading={false} />);
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('supports specific empty state text', async () => {
  render(
    <Basic
      label="Label"
      allowsEmptyCollection
      emptyState="No vegetables found"
    />
  );

  const input = screen.getAllByLabelText('Label')[0];
  await user.type(input, 'xyz');

  const emptyState = await screen.findByText('No vegetables found');
  expect(emptyState).toBeInTheDocument();
});
