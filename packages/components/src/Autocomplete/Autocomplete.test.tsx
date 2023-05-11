import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@marigold/system';

import { Autocomplete } from './Autocomplete';

// Setup
// ---------------
const user = userEvent.setup();

const theme = {
  colors: {
    blue: '#0ea5e9',
    teal: '#5eead4',
  },
  fontSizes: {
    'small-1': 12,
  },
  sizes: {
    none: 0,
    large: 200,
  },
};

// Tests
// ---------------
test('renders an input', () => {
  render(
    <Autocomplete label="Label" data-testid="input-field">
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
      <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
      <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
    </Autocomplete>
  );

  const textField = screen.getByTestId('input-field');
  expect(textField).toBeInTheDocument();
  expect(textField).toHaveAttribute('type', 'text');
  expect(textField instanceof HTMLInputElement).toBeTruthy();
});

test('renders a label', () => {
  render(
    <Autocomplete label="Label" data-testid="input-field">
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
      <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
      <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
    </Autocomplete>
  );

  const label = screen.getByText('Label');
  expect(label).toBeInTheDocument();
  expect(label instanceof HTMLLabelElement).toBeTruthy();
});

test('takes full width by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Autocomplete label="Label" data-testid="input-field">
        <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
        <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
        <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
        <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
      </Autocomplete>
    </ThemeProvider>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  expect(container).toHaveStyle('width: 100%');
});

test('allows to set custom width', () => {
  render(
    <ThemeProvider theme={theme}>
      <Autocomplete label="Label" data-testid="input-field" width="large">
        <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
        <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
        <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
        <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
      </Autocomplete>
    </ThemeProvider>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  expect(container).toHaveStyle(`width: ${theme.sizes.large}px`);
});

test('supports disabled', () => {
  render(
    <Autocomplete label="Label" data-testid="input-field" disabled>
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
    </Autocomplete>
  );

  const textField = screen.getByTestId('input-field');
  expect(textField).toBeDisabled();
});

test('supports required', () => {
  render(
    <Autocomplete label="Label" data-testid="input-field" required>
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
    </Autocomplete>
  );

  const textField = screen.getByTestId('input-field');
  /** Note that the required attribute is not passed down! */
  expect(textField).toHaveAttribute('aria-required', 'true');
});

test('supports readonly', () => {
  render(
    <Autocomplete label="Label" data-testid="input-field" readOnly>
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
    </Autocomplete>
  );

  const textField = screen.getByTestId('input-field');
  expect(textField).toHaveAttribute('readonly');
});

test('uses field structure', () => {
  render(
    <Autocomplete
      label="Label"
      description="Some helpful text"
      errorMessage="Whoopsie"
    >
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
    </Autocomplete>
  );

  const label = screen.queryByText('Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryByText('Some helpful text');
  expect(description).toBeInTheDocument();

  const error = screen.queryByText('Whoopsie');
  expect(error).not.toBeInTheDocument();
});

test('opens the suggestions on user input', async () => {
  render(
    <Autocomplete label="Label" data-testid="input-field">
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
      <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
      <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
    </Autocomplete>
  );

  const input = screen.getByTestId('input-field');
  await user.type(input, 'br');

  const suggestions = screen.getByRole('listbox');
  expect(suggestions).toBeVisible();
});

test('opens the suggestions on focus', async () => {
  render(
    <Autocomplete label="Label" data-testid="input-field" menuTrigger="focus">
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
      <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
      <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
    </Autocomplete>
  );

  const input = screen.getByTestId('input-field');
  await user.click(input);

  const suggestions = screen.getByRole('listbox');
  expect(suggestions).toBeVisible();
});

test('opens the suggestions on arrow down (manual)', async () => {
  render(
    <Autocomplete label="Label" data-testid="input-field" menuTrigger="manual">
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
      <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
      <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
    </Autocomplete>
  );

  const input = screen.getByTestId('input-field');
  await user.type(input, '{arrowdown}');

  const suggestions = screen.getByRole('listbox');
  expect(suggestions).toBeVisible();
});

test('shows suggestions based on user input', async () => {
  render(
    <Autocomplete label="Label" data-testid="input-field">
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
      <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
      <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
    </Autocomplete>
  );

  const input = screen.getByTestId('input-field');
  await user.type(input, 'br');

  expect(screen.getByText('Broccoli')).toBeInTheDocument();

  expect(screen.queryByText('Spinach')).not.toBeInTheDocument();
  expect(screen.queryByText('Carrots')).not.toBeInTheDocument();
  expect(screen.queryByText('Garlic')).not.toBeInTheDocument();
});

test('supports disabling suggestions', async () => {
  render(
    <Autocomplete
      label="Label"
      data-testid="input-field"
      disabledKeys={['spinach']}
    >
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
      <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
      <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
    </Autocomplete>
  );

  const input = screen.getByTestId('input-field');
  await user.type(input, 'a');

  const spinach = screen.getByText('Spinach');
  expect(spinach).toHaveAttribute('aria-disabled', 'true');
});

test('supporst showing a help text', () => {
  render(
    <Autocomplete
      label="Label"
      data-testid="input-field"
      description="This is a description"
    >
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
      <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
      <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
    </Autocomplete>
  );

  expect(screen.getByText('This is a description')).toBeInTheDocument();
});

test('supporst showing an error', () => {
  render(
    <Autocomplete
      label="Label"
      data-testid="input-field"
      error
      errorMessage="Error!"
    >
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
      <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
      <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
    </Autocomplete>
  );

  expect(screen.getByText('Error!')).toBeInTheDocument();
});

test('supports default value', () => {
  render(
    <Autocomplete label="Label" data-testid="input-field" defaultValue="garlic">
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
      <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
      <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
    </Autocomplete>
  );

  expect(screen.getByTestId('input-field')).toHaveValue('garlic');
});

test('can be controlled', async () => {
  const Controlled = () => {
    const [value, setValue] = React.useState('');
    return (
      <>
        <Autocomplete
          label="Label"
          data-testid="input-field"
          value={value}
          onChange={setValue}
        >
          <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
          <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
          <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
          <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
        </Autocomplete>
        <span data-testid="output">{value}</span>
      </>
    );
  };

  render(<Controlled />);

  const input = screen.getByTestId('input-field');
  await user.type(input, 'car');

  expect(screen.getByTestId('output')).toHaveTextContent('car');
});

test('supports autocompletion', async () => {
  render(
    <Autocomplete label="Label" data-testid="input-field">
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
      <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
      <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
    </Autocomplete>
  );

  const input = screen.getByTestId('input-field');
  await user.type(input, 'sp');

  const spinach = screen.getByText('Spinach');
  await user.click(spinach);

  expect(input).toHaveValue('Spinach');
});

test('supports submit handler', async () => {
  const spy = jest.fn();

  render(
    <Autocomplete label="Label" data-testid="input-field" onSubmit={spy}>
      <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
      <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
      <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
      <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
    </Autocomplete>
  );

  const input = screen.getByTestId('input-field');
  await user.type(input, 'ga{enter}');

  expect(spy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          null,
          "ga",
        ],
      ]
    `);

  await user.type(input, 'r');
  const item = screen.getByText('Garlic');
  await user.click(item);

  expect(spy.mock.calls).toMatchInlineSnapshot(`
    [
      [
        null,
        "ga",
      ],
      [
        "garlic",
        null,
      ],
    ]
  `);
});
