import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComboBoxProps } from '@marigold/components';
import { Basic } from './ComboBox.stories';

const BasicComponent = (props: ComboBoxProps) => (
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

test('renders an input', () => {
  render(<BasicComponent />);

  const textField = screen.getAllByLabelText(/Label/i)[0];

  expect(textField).toBeInTheDocument();
  expect(textField).toHaveAttribute('type', 'text');
  expect(textField instanceof HTMLInputElement).toBeTruthy();
});

test('check classname slots', () => {
  render(<BasicComponent />);

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
  render(<BasicComponent disabled />);

  const textField = screen.getAllByLabelText(/Label/i)[0];

  expect(textField).toBeDisabled();
});

test('supports required', () => {
  render(<BasicComponent required />);

  const textField = screen.getAllByLabelText(/Label/i)[0];

  expect(textField).toBeRequired();
});

test('supports readonly', () => {
  render(<BasicComponent readOnly />);

  const textField = screen.getAllByLabelText(/Label/i)[0];

  expect(textField).toHaveAttribute('readonly');
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
  const description = screen.queryAllByText('Some helpful text')[0];
  const error = screen.queryByText('Whoopsie');

  expect(label).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(error).not.toBeInTheDocument();
});

test('supporst showing a help text', () => {
  render(<BasicComponent description="This is a description" />);

  const description = screen.getAllByText('This is a description')[0];

  expect(description).toBeInTheDocument();
});

test('supporst showing an error', () => {
  render(<BasicComponent error errorMessage="Error!" />);

  expect(screen.getByText('Error!')).toBeInTheDocument();
});

test('supports default value', () => {
  render(<BasicComponent defaultValue="garlic" />);

  const textField = screen.getAllByLabelText(/Label/i)[0];

  expect(textField).toHaveValue('garlic');
});

test('supports autocompletion', async () => {
  render(<BasicComponent label="Label" />);

  const input = screen.getAllByLabelText(/Label/i)[0];
  await user.type(input, 'do');

  const dog = screen.getByText('Dog');
  await user.click(dog);

  expect(input).toHaveValue('Dog');
});

test('supports loading state', () => {
  render(<BasicComponent label="Label" loading />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('hides loading state when loading is false', () => {
  render(<BasicComponent label="Label" loading={false} />);
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('supports specific empty state text', async () => {
  render(
    <BasicComponent
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
