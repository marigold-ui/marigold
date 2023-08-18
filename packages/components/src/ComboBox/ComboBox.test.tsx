import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Theme, cva } from '@marigold/system';

import { setup } from '../test.utils';
import { ComboBox } from './ComboBox';

const user = userEvent.setup();

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva(),
    Field: cva(),
    Label: {
      container: cva('text-teal-300', {
        variants: {
          size: {
            small: 'p-2',
          },
        },
      }),
      indicator: cva(),
    },
    HelpText: {
      container: cva('', {
        variants: {
          variant: {
            one: 'text-blue-900',
          },
          size: {
            small: 'p-2',
          },
        },
      }),
      icon: cva(),
    },
    Input: {
      input: cva(),
      icon: cva(),
      action: cva('p-0'),
    },
    ListBox: {
      container: cva(),
      list: cva(),
      option: cva(),
      section: cva(),
      sectionTitle: cva(),
    },
    Popover: cva(['mt-0.5'], {
      variants: {
        variant: {
          top: ['mb-0.5'],
        },
      },
    }),
  },
};

const { render } = setup({ theme });

test('renders an input', () => {
  render(
    <ComboBox label="Label" data-testid="input-field">
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
      <ComboBox.Item key="broccoli">Broccoli</ComboBox.Item>
      <ComboBox.Item key="garlic">Garlic</ComboBox.Item>
    </ComboBox>
  );

  const textField = screen.getByTestId('input-field');
  expect(textField).toBeInTheDocument();
  expect(textField).toHaveAttribute('type', 'text');
  expect(textField instanceof HTMLInputElement).toBeTruthy();
});

test('supports width classname', () => {
  render(
    <ComboBox label="Label" data-testid="input-field">
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
      <ComboBox.Item key="broccoli">Broccoli</ComboBox.Item>
      <ComboBox.Item key="garlic">Garlic</ComboBox.Item>
    </ComboBox>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  expect(container?.className).toMatchInlineSnapshot(`"group/field w-full"`);
});

test('supports classnames', () => {
  render(
    <ComboBox
      label="Label"
      data-testid="input-field"
      variant="one"
      size="small"
    >
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
      <ComboBox.Item key="broccoli">Broccoli</ComboBox.Item>
      <ComboBox.Item key="garlic">Garlic</ComboBox.Item>
    </ComboBox>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  const label = screen.getByText('Label');
  const button = screen.getByRole('button');
  expect(button.className).toMatchInlineSnapshot(
    `"inline-flex items-center justify-center gap-[0.5ch] absolute right-2 h-4 w-4 border-none bg-transparent p-0"`
  );
  expect(container?.className).toMatchInlineSnapshot(`"group/field w-full"`);
  expect(label.className).toMatchInlineSnapshot(
    `"text-teal-300 flex w-[var(--labelWidth)]"`
  );
});

test('supports disabled', () => {
  render(
    <ComboBox label="Label" data-testid="input-field" disabled>
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
    </ComboBox>
  );

  const textField = screen.getByTestId('input-field');
  expect(textField).toBeDisabled();
});

test('supports required', () => {
  render(
    <ComboBox label="Label" data-testid="input-field" required>
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
    </ComboBox>
  );

  const textField = screen.getByTestId('input-field');
  /** Note that the required attribute is not passed down! */
  expect(textField).toHaveAttribute('aria-required', 'true');
});

test('supports readonly', () => {
  render(
    <ComboBox label="Label" data-testid="input-field" readOnly>
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
    </ComboBox>
  );

  const textField = screen.getByTestId('input-field');
  expect(textField).toHaveAttribute('readonly');
});

test('uses field structure', () => {
  render(
    <ComboBox
      label="Label"
      description="Some helpful text"
      errorMessage="Whoopsie"
    >
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
    </ComboBox>
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
    <ComboBox label="Label" data-testid="input-field">
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
      <ComboBox.Item key="broccoli">Broccoli</ComboBox.Item>
      <ComboBox.Item key="garlic">Garlic</ComboBox.Item>
    </ComboBox>
  );

  const input = screen.getByTestId('input-field');
  await user.type(input, 'br');

  const suggestions = screen.getByRole('listbox');
  expect(suggestions).toBeVisible();
});

test('opens the suggestions on focus', async () => {
  render(
    <ComboBox label="Label" data-testid="input-field" menuTrigger="focus">
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
      <ComboBox.Item key="broccoli">Broccoli</ComboBox.Item>
      <ComboBox.Item key="garlic">Garlic</ComboBox.Item>
    </ComboBox>
  );

  const input = screen.getByTestId('input-field');
  await user.click(input);

  const suggestions = screen.getByRole('listbox');
  expect(suggestions).toBeVisible();
});

test('opens the suggestions on arrow down (manual)', async () => {
  render(
    <ComboBox label="Label" data-testid="input-field" menuTrigger="manual">
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
      <ComboBox.Item key="broccoli">Broccoli</ComboBox.Item>
      <ComboBox.Item key="garlic">Garlic</ComboBox.Item>
    </ComboBox>
  );

  const input = screen.getByTestId('input-field');
  await user.type(input, '{arrowdown}');

  const suggestions = screen.getByRole('listbox');
  expect(suggestions).toBeVisible();
});

test('shows suggestions based on user input', async () => {
  render(
    <ComboBox label="Label" data-testid="input-field">
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
      <ComboBox.Item key="broccoli">Broccoli</ComboBox.Item>
      <ComboBox.Item key="garlic">Garlic</ComboBox.Item>
    </ComboBox>
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
    <ComboBox
      label="Label"
      data-testid="input-field"
      disabledKeys={['spinach']}
    >
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
      <ComboBox.Item key="broccoli">Broccoli</ComboBox.Item>
      <ComboBox.Item key="garlic">Garlic</ComboBox.Item>
    </ComboBox>
  );

  const input = screen.getByTestId('input-field');
  await user.type(input, 'a');

  const spinach = screen.getByText('Spinach');
  expect(spinach).toHaveAttribute('aria-disabled', 'true');
});

test('supporst showing a help text', () => {
  render(
    <ComboBox
      label="Label"
      data-testid="input-field"
      description="This is a description"
    >
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
      <ComboBox.Item key="broccoli">Broccoli</ComboBox.Item>
      <ComboBox.Item key="garlic">Garlic</ComboBox.Item>
    </ComboBox>
  );

  expect(screen.getByText('This is a description')).toBeInTheDocument();
});

test('supporst showing an error', () => {
  render(
    <ComboBox
      label="Label"
      data-testid="input-field"
      error
      errorMessage="Error!"
    >
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
      <ComboBox.Item key="broccoli">Broccoli</ComboBox.Item>
      <ComboBox.Item key="garlic">Garlic</ComboBox.Item>
    </ComboBox>
  );

  expect(screen.getByText('Error!')).toBeInTheDocument();
});

test('supports default value', () => {
  render(
    <ComboBox label="Label" data-testid="input-field" defaultValue="garlic">
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
      <ComboBox.Item key="broccoli">Broccoli</ComboBox.Item>
      <ComboBox.Item key="garlic">Garlic</ComboBox.Item>
    </ComboBox>
  );

  expect(screen.getByTestId('input-field')).toHaveValue('garlic');
});

test('can be controlled', async () => {
  const Controlled = () => {
    const [value, setValue] = React.useState('');
    return (
      <>
        <ComboBox
          label="Label"
          data-testid="input-field"
          value={value}
          onChange={setValue}
        >
          <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
          <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
          <ComboBox.Item key="broccoli">Broccoli</ComboBox.Item>
          <ComboBox.Item key="garlic">Garlic</ComboBox.Item>
        </ComboBox>
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
    <ComboBox label="Label" data-testid="input-field">
      <ComboBox.Item key="spinach">Spinach</ComboBox.Item>
      <ComboBox.Item key="carrots">Carrots</ComboBox.Item>
      <ComboBox.Item key="broccoli">Broccoli</ComboBox.Item>
      <ComboBox.Item key="garlic">Garlic</ComboBox.Item>
    </ComboBox>
  );

  const input = screen.getByTestId('input-field');
  await user.type(input, 'sp');

  const spinach = screen.getByText('Spinach');
  await user.click(spinach);

  expect(input).toHaveValue('Spinach');
});
