import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  const textField = screen.getAllByLabelText(/Label/i)[0];

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
    `"shrink-0 outline-0 absolute cursor-pointer pr-1 text-muted-foreground/80 right-2"`
  );
  expect(container?.className).toMatchInlineSnapshot(
    `"group/field flex flex-col w-full space-y-2"`
  );
  expect(label.className).toMatchInlineSnapshot(
    `"items-center gap-1 text-sm font-medium leading-none text-foreground group-disabled/field:cursor-not-allowed group-disabled/field:text-disabled-foreground group-required/field:after:content-["*"] group-required/field:after:-ml-1 group-required/field:after:text-destructive inline-flex"`
  );
});

test('supports disabled', () => {
  render(<Basic disabled />);

  const textField = screen.getAllByLabelText(/Label/i)[0];

  expect(textField).toBeDisabled();
});

test('supports required', () => {
  render(<Basic required />);

  const textField = screen.getAllByLabelText(/Label/i)[0];

  expect(textField).toBeRequired();
});

test('supports readonly', () => {
  render(<Basic readOnly />);

  const textField = screen.getAllByLabelText(/Label/i)[0];

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

  const textField = screen.getAllByLabelText(/Label/i)[0];

  expect(textField).toHaveValue('garlic');
});

test('supports autocompletion', async () => {
  render(<Basic label="Label" />);

  const input = screen.getAllByLabelText(/Label/i)[0];
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

  const input = screen.getAllByLabelText(/Label/i)[0];
  await user.type(input, 'xyz');

  const emptyState = await screen.findByText('No vegetables found');
  expect(emptyState).toBeInTheDocument();
});
