import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { Autocomplete } from './Autocomplete';

// Setup
// ---------------
const user = userEvent.setup();

const theme: Theme = {
  name: 'test',
  components: {
    Field: cva(),
    ComboBox: cva(),
    Label: {
      container: cva('', {
        variants: {
          variant: {
            lime: 'text-lime-600',
          },
          size: {
            small: 'p-1',
          },
        },
      }),
      indicator: cva(''),
    },
    HelpText: {
      container: cva('', {
        variants: {
          variant: {
            lime: 'text-lime-600',
          },
          size: {
            small: 'p-2',
          },
        },
      }),
      icon: cva(''),
    },
    Input: {
      input: cva('border-blue-700'),
      icon: cva(),
      action: cva(),
    },
    Underlay: cva(),
    Popover: cva(['mt-0.5'], {
      variants: {
        variant: {
          top: ['mb-0.5'],
        },
      },
    }),
    ListBox: {
      container: cva(),
      list: cva(),
      item: cva(),
      section: cva(),
      header: cva(),
    },
    Button: cva(),
    ProgressCycle: cva(''),
  },
};

const { render } = setup({ theme });

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
  render(
    <Autocomplete label="vegetables">
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  );

  const textField = screen.getByRole('combobox');
  expect(textField).toBeInTheDocument();
  expect(textField).toHaveAttribute('type', 'search');
  expect(textField instanceof HTMLInputElement).toBeTruthy();
});

test('renders a label', () => {
  render(
    <Autocomplete label="Label">
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  );

  const label = screen.getByText('Label');
  expect(label).toBeInTheDocument();
  expect(label instanceof HTMLLabelElement).toBeTruthy();
});

test('supports disabled', () => {
  render(
    <Autocomplete label="Label" disabled>
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
    </Autocomplete>
  );

  const textField = screen.getByRole('combobox');
  expect(textField).toBeDisabled();
});

test('supports required', () => {
  render(
    <Autocomplete label="Label" required>
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
    </Autocomplete>
  );

  const textField = screen.getByRole('combobox');
  expect(textField).toBeRequired();
});

test('supports readonly', () => {
  render(
    <Autocomplete label="Label" readOnly>
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
    </Autocomplete>
  );

  const textField = screen.getByRole('combobox');
  expect(textField).toHaveAttribute('readonly');
});

test('uses field structure', () => {
  render(
    <Autocomplete
      label="Label"
      description="Some helpful text"
      errorMessage="Whoopsie"
    >
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
    </Autocomplete>
  );

  const label = screen.queryByText('Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryAllByText('Some helpful text')[0];
  expect(description).toBeInTheDocument();

  const error = screen.queryByText('Whoopsie');
  expect(error).not.toBeInTheDocument();
});

test('opens the suggestions on user input', async () => {
  render(
    <Autocomplete label="Label">
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  );

  const input = screen.getByRole('combobox');
  await user.type(input, 'br');

  const suggestions = await screen.findByText('Broccoli');
  expect(suggestions).toBeVisible();
});

test('opens the suggestions on focus', async () => {
  render(
    <Autocomplete label="Label" menuTrigger="focus">
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  );

  const input = screen.getByRole('combobox');
  await user.click(input);

  const suggestions = await screen.findByText('Broccoli');
  expect(suggestions).toBeVisible();
});

test('opens the suggestions on arrow down (manual)', async () => {
  render(
    <Autocomplete label="Label" menuTrigger="manual">
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  );

  const input = screen.getByRole('combobox');
  await user.type(input, '{arrowdown}');

  const suggestions = await screen.findByText('Broccoli');
  expect(suggestions).toBeVisible();
});

test('shows suggestions based on user input', async () => {
  render(
    <Autocomplete label="Label">
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  );

  const input = screen.getByRole('combobox');
  await user.type(input, 'br');

  expect(screen.getByText('Broccoli')).toBeInTheDocument();

  expect(screen.queryByText('Spinach')).not.toBeInTheDocument();
  expect(screen.queryByText('Carrots')).not.toBeInTheDocument();
  expect(screen.queryByText('Garlic')).not.toBeInTheDocument();
});

test('supports disabling suggestions', async () => {
  render(
    <Autocomplete label="Label" disabledKeys={['spinach']}>
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  );

  const input = screen.getAllByLabelText('Label')[0];
  await user.type(input, 'a');

  const spinach = screen.getByRole('option', { name: 'Spinach' });
  expect(spinach).toHaveAttribute('aria-disabled', 'true');
});

test('supports sections', async () => {
  render(
    <Autocomplete label="Label" data-testid="Autocomplete">
      <Autocomplete.Section header="Section 1">
        <Autocomplete.Option id="one">one</Autocomplete.Option>
        <Autocomplete.Option id="two">two</Autocomplete.Option>
      </Autocomplete.Section>
      <Autocomplete.Section header="Section 2">
        <Autocomplete.Option id="three">three</Autocomplete.Option>
        <Autocomplete.Option id="four">four</Autocomplete.Option>
      </Autocomplete.Section>
    </Autocomplete>
  );

  const input = screen.getAllByLabelText('Label')[0];
  await user.type(input, 'o');

  const s1 = await screen.findByText('Section 1');
  const s2 = await screen.findByText('Section 2');

  expect(s1).toBeVisible();
  expect(s2).toBeVisible();
});

test('supporst showing a help text', () => {
  render(
    <Autocomplete label="Label" description="This is a description">
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  );

  const description = screen.queryAllByText('This is a description')[0];
  expect(description).toBeInTheDocument();
});

test('supporst showing an error', () => {
  render(
    <Autocomplete label="Label" error errorMessage="Error!">
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  );

  expect(screen.getByText('Error!')).toBeInTheDocument();
});

test('supports default value', () => {
  render(
    <Autocomplete label="Label" defaultValue="garlic">
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  );

  expect(screen.getByRole('combobox')).toHaveValue('garlic');
});

test('can be controlled', async () => {
  const Controlled = () => {
    const [value, setValue] = React.useState('');
    return (
      <>
        <Autocomplete label="Label" value={value} onChange={setValue}>
          <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
          <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
          <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
          <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
        </Autocomplete>
        <span data-testid="output">{value}</span>
      </>
    );
  };

  render(<Controlled />);

  const input = screen.getByRole('combobox');
  await user.type(input, 'car');

  expect(screen.getByTestId('output')).toHaveTextContent('car');
});

test('supports autocompletion', async () => {
  render(
    <Autocomplete label="Label">
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  );

  const input = screen.getByRole('combobox');
  await user.type(input, 'sp');

  const spinach = screen.getByText('Spinach');
  await user.click(spinach);

  expect(input).toHaveValue('Spinach');
});

test('supports clear input value', async () => {
  render(
    <Autocomplete label="Label">
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  );

  const input = screen.getByRole('combobox');
  await user.type(input, 'sp');

  const clearButton = screen.getByLabelText('Clear search');
  expect(clearButton).toBeInTheDocument();
  await user.click(clearButton);
  expect(input).toHaveValue('');
});

test('supports submit handler', async () => {
  const spy = vi.fn();

  render(
    <Autocomplete label="Label" onSubmit={spy}>
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  );

  const input = screen.getByRole('combobox');
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

test('supports loading state', () => {
  render(
    <Autocomplete label="Label" loading>
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
    </Autocomplete>
  );

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('hides loading state when loading is false', () => {
  render(
    <Autocomplete label="Label" loading={false}>
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
    </Autocomplete>
  );

  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});
