import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AutocompleteProps } from '@marigold/components';
import { Basic, WithSections } from './Autocomplete.stories';

// Setup
// ---------------
const BasicComponent = (props: AutocompleteProps) => (
  <div id="storybook-root">
    <Basic.Component {...props} />
  </div>
);

const user = userEvent.setup();

/**
 * We need to mock `matchMedia` because JSOM does not
 * implements it.
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }),
});

// Tests
// ---------------
test('renders an input', () => {
  render(<BasicComponent />);

  const textField = screen.getByRole('combobox');

  expect(textField).toBeInTheDocument();
  expect(textField).toHaveAttribute('type', 'search');
  expect(textField instanceof HTMLInputElement).toBeTruthy();
});

test('renders a label', () => {
  render(<BasicComponent label="Label" />);

  const label = screen.getByText('Label');

  expect(label).toBeInTheDocument();
  expect(label instanceof HTMLLabelElement).toBeTruthy();
});

test('supports disabled', () => {
  render(<BasicComponent disabled />);

  const textField = screen.getByRole('combobox');

  expect(textField).toBeDisabled();
});

test('supports required', () => {
  render(<BasicComponent required />);

  const textField = screen.getByRole('combobox');

  expect(textField).toBeRequired();
});

test('supports readonly', () => {
  render(<BasicComponent readOnly />);

  const textField = screen.getByRole('combobox');

  expect(textField).toHaveAttribute('readonly');
});

test('supports showing an error', () => {
  render(<BasicComponent error errorMessage="Error!" />);

  expect(screen.getByText('Error!')).toBeInTheDocument();
});

test('supports default value', () => {
  render(<BasicComponent defaultValue="garlic" />);

  expect(screen.getByRole('combobox')).toHaveValue('garlic');
});

test('uses field structure', () => {
  render(
    <BasicComponent
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
  render(<BasicComponent label="Label" />);

  const input = screen.getByRole('combobox');
  await user.type(input, 'ha');

  const suggestions = await screen.findByText('Harry Potter');
  expect(suggestions).toBeVisible();
});

test('supports default empty state text', async () => {
  render(<BasicComponent label="Label" allowsEmptyCollection />);

  const input = screen.getByRole('combobox');
  await user.type(input, 'xyz');

  const result = await screen.findByText('No result found');
  expect(result).toBeVisible();
});

test('supports passting  empty state text', async () => {
  render(
    <BasicComponent
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
  render(<BasicComponent label="Label" menuTrigger="focus" />);

  const input = screen.getByRole('combobox');
  await user.click(input);

  const suggestions = await screen.findByText('Harry Potter');
  expect(suggestions).toBeVisible();
});

test('opens the suggestions on arrow down (manual)', async () => {
  render(<BasicComponent label="Label" menuTrigger="manual" />);

  const input = screen.getByRole('combobox');
  await user.type(input, '{arrowdown}');

  const suggestions = await screen.findByText('Harry Potter');
  expect(suggestions).toBeVisible();
});

test('shows suggestions based on user input', async () => {
  render(<BasicComponent label="Label" />);

  const input = screen.getByRole('combobox');
  await user.type(input, 'ha');

  expect(screen.getByText('Harry Potter')).toBeInTheDocument();

  expect(screen.queryByText('Lord of the Rings')).not.toBeInTheDocument();
  expect(screen.queryByText('Star Trek')).not.toBeInTheDocument();
  expect(screen.queryByText('Firefly')).not.toBeInTheDocument();
});

test('supports disabling suggestions', async () => {
  render(<BasicComponent label="Label" disabledKeys={['Firefly']} />);

  const input = screen.getAllByLabelText(/Label/i)[0];
  await user.type(input, 'fi');

  const spinach = screen.getByRole('option', { name: 'Firefly' });
  expect(spinach).toHaveAttribute('aria-disabled', 'true');
});

test('supports sections', async () => {
  render(
    <div id="storybook-root">
      <WithSections.Component label="Label" />
    </div>
  );

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
  render(<BasicComponent label="Label" description="This is a description" />);

  const description = screen.queryAllByText('This is a description')[0];
  expect(description).toBeInTheDocument();
});

test('supports loading state', () => {
  render(
    <BasicComponent label="Label" loading description="This is a description" />
  );

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('hides loading state when loading is false', () => {
  render(
    <BasicComponent
      label="Label"
      loading={false}
      description="This is a description"
    />
  );

  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});
