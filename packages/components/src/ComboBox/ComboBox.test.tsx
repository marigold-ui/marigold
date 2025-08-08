import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import * as stories from './ComboBox.stories';

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

test('renders an input', () => {
  render(<Basic />);

  const textField = screen.getAllByLabelText('Label')[0];

  expect(textField).toBeInTheDocument();
  expect(textField).toHaveAttribute('type', 'text');
  expect(textField instanceof HTMLInputElement).toBeTruthy();
});

test('check classname slots', () => {
  render(<Basic />);

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  const label = screen.getByText('Label');
  const button = screen.getByRole('button');

  expect(button.className).toMatchInlineSnapshot(
    `"shrink-0 cursor-pointer outline-0 absolute text-muted-foreground/80 right-2"`
  );
  expect(container?.className).toMatchInlineSnapshot(
    `"group/field flex flex-col w-full space-y-2"`
  );
  expect(label.className).toMatchInlineSnapshot(
    `"items-center gap-1 text-sm font-medium leading-none text-foreground group-disabled/field:cursor-not-allowed group-disabled/field:text-disabled-foreground inline-flex"`
  );
});

test('supports disabled', () => {
  render(<Basic disabled />);

  const textField = screen.getAllByLabelText('Label')[0];

  expect(textField).toBeDisabled();
});

test('supports required', () => {
  render(<Basic required />);

  const textField = screen.getAllByLabelText('Label')[0];

  expect(textField).toBeRequired();
});

test('supports readonly', () => {
  render(<Basic readOnly />);

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
  const description = screen.queryAllByText('Some helpful text')[0];
  const error = screen.queryByText('Whoopsie');

  expect(label).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(error).not.toBeInTheDocument();
});

test('supporst showing a help text', () => {
  render(<Basic description="This is a description" />);

  const description = screen.getAllByText('This is a description')[0];

  expect(description).toBeInTheDocument();
});

test('supporst showing an error', () => {
  render(<Basic error errorMessage="Error!" />);

  expect(screen.getByText('Error!')).toBeInTheDocument();
});

test('supports default value', () => {
  render(<Basic defaultValue="garlic" />);

  const textField = screen.getAllByLabelText('Label')[0];

  expect(textField).toHaveValue('garlic');
});
