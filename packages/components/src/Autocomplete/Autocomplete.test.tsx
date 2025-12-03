import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import * as stories from './Autocomplete.stories';

// Setup
// ---------------
const { Basic, WithSections } = composeStories(stories, {
  decorators: Story => (
    <div id="storybook-root">
      <Story />
    </div>
  ),
});
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

  const input = screen.getByRole('combobox');
  await user.type(input, 'ha');

  const suggestions = await screen.findByText('Harry Potter');
  expect(suggestions).toBeVisible();
});

test('supports default empty state text', async () => {
  render(<Basic label="Label" allowsEmptyCollection />);

  const input = screen.getByRole('combobox');
  await user.type(input, 'xyz');

  const result = await screen.findByText('No result found');
  expect(result).toBeVisible();
});

test('supports passting  empty state text', async () => {
  render(
    <Basic
      label="Label"
      emptyState={<span>can not find value</span>}
      allowsEmptyCollection
    />
  );

  const input = screen.getByRole('combobox');
  await user.type(input, 'xyz');

  const result = await screen.findByText('can not find value');
  expect(result).toBeVisible();
});

test('opens the suggestions on focus', async () => {
  render(<Basic label="Label" menuTrigger="focus" />);

  const input = screen.getByRole('combobox');
  await user.click(input);

  const suggestions = await screen.findByText('Harry Potter');
  expect(suggestions).toBeVisible();
});

test('opens the suggestions on arrow down (manual)', async () => {
  render(<Basic label="Label" menuTrigger="manual" />);

  const input = screen.getByRole('combobox');
  await user.type(input, '{arrowdown}');

  const suggestions = await screen.findByText('Harry Potter');
  expect(suggestions).toBeVisible();
});

test('shows suggestions based on user input', async () => {
  render(<Basic label="Label" />);

  const input = screen.getByRole('combobox');
  await user.type(input, 'ha');

  expect(screen.getByText('Harry Potter')).toBeInTheDocument();

  expect(screen.queryByText('Lord of the Rings')).not.toBeInTheDocument();
  expect(screen.queryByText('Star Trek')).not.toBeInTheDocument();
  expect(screen.queryByText('Firefly')).not.toBeInTheDocument();
});

test('supports disabling suggestions', async () => {
  render(<Basic label="Label" disabledKeys={['Firefly']} />);

  const input = screen.getAllByLabelText(/Label/i)[0];
  await user.type(input, 'fi');

  const spinach = screen.getByRole('option', { name: 'Firefly' });
  expect(spinach).toHaveAttribute('aria-disabled', 'true');
});

test('supports sections', async () => {
  render(<WithSections label="Label" />);

  const input = screen.getAllByLabelText(/Label/i)[0];
  await user.type(input, 'a');

  const s1 = await screen.findByText('Veggies');
  const s2 = await screen.findByText('Protein');
  const s3 = await screen.findByText('Condiments');

  expect(s1).toBeVisible();
  expect(s2).toBeVisible();
  expect(s3).toBeVisible();
});

test('supporst showing a help text', () => {
  render(<Basic label="Label" description="This is a description" />);

  const description = screen.queryAllByText('This is a description')[0];
  expect(description).toBeInTheDocument();
});

test('supports loading state', () => {
  render(<Basic label="Label" loading description="This is a description" />);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('hides loading state when loading is false', () => {
  render(
    <Basic label="Label" loading={false} description="This is a description" />
  );

  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});
