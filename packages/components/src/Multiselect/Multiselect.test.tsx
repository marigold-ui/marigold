import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { Multiselect } from './Multiselect';

const user = userEvent.setup();

const theme: Theme = {
  name: 'test',
  components: {
    MultiSelect: {
      container: cva(''),
      field: cva('group/field w-full'),
      input: cva('base-input-style'),
      tag: cva('tag-style'),
      closeButton: cva('close-button-style'),
      listContainer: cva('list-container'),
      list: cva('list-style'),
      option: cva('option-style'),
      icon: cva('icon-style'),
      valueContainer: cva('bg-red-300'),
    },
    Label: {
      container: cva('label-style'),
      indicator: cva('indicator-style'),
    },
    HelpText: {
      container: cva('help-text-style'),
      icon: cva('icon-style'),
    },
  },
};

const { render } = setup({ theme });

const options = [
  { value: 'spinach', label: 'Spinach' },
  { value: 'carrots', label: 'Carrots' },
  { value: 'broccoli', label: 'Broccoli' },
  { value: 'garlic', label: 'Garlic' },
];

test('renders input and label', () => {
  render(<Multiselect label="Vegetables" items={options} />);

  expect(screen.getByLabelText('Vegetables')).toBeInTheDocument();
  expect(screen.getByText('Vegetables')).toBeInTheDocument();
});

test('supports disabled state', () => {
  render(<Multiselect label="Vegetables" disabled items={options} />);

  const input = screen.getByLabelText('Vegetables');
  expect(input).toBeInTheDocument();
  expect(input).toBeDisabled();
});

test('shows selected options as tags', async () => {
  render(
    <Multiselect
      label="Vegetables"
      items={options}
      defaultSelectedItems={[options[0], options[1]]}
    />
  );

  expect(screen.getByText('Spinach')).toBeInTheDocument();
  expect(screen.getByText('Carrots')).toBeInTheDocument();
});

test('allows selecting multiple options', async () => {
  render(<Multiselect label="Vegetables" items={options} />);

  const input = screen.getByLabelText('Vegetables');
  await user.click(input);

  const spinachOption = await screen.findByText('Spinach');
  await user.click(spinachOption);

  expect(await screen.findByText('Spinach')).toBeInTheDocument();

  await user.click(input);

  const carrotsOption = await screen.findByText('Carrots');
  await user.click(carrotsOption);

  expect(await screen.findByText('Spinach')).toBeInTheDocument();
  expect(await screen.findByText('Carrots')).toBeInTheDocument();
});

test('supports removing selections', async () => {
  render(
    <Multiselect
      label="Vegetables"
      items={options}
      defaultSelectedItems={[options[0]]}
    />
  );

  const removeButton = screen.getByRole('button', { name: /remove/i });
  await user.click(removeButton);

  expect(screen.queryByText('Spinach')).not.toBeInTheDocument();
});

test('shows error message when error is present', () => {
  render(
    <Multiselect
      label="Vegetables"
      error
      errorMessage="Invalid selection"
      items={options}
    />
  );

  expect(screen.getByText('Invalid selection')).toBeInTheDocument();
});

it.each([
  ['1', 'Spinach'],
  ['1', 'Carrots'],
])('supports controlled selection', async (expected, item) => {
  const Controlled = () => {
    const [selected, setSelected] = React.useState<typeof options>([]);
    return (
      <>
        <Multiselect
          label="Vegetables"
          items={options}
          onSelectionChange={setSelected}
          // @ts-expect-error should be fixed
          menuIsOpen={true} // Force menu to stay open
        />
        <div data-testid="output">{selected.length}</div>
      </>
    );
  };
  render(<Controlled />);
  const input = screen.getByLabelText('Vegetables');
  await user.click(input);
  const menu = await screen.findByRole('listbox');

  const menuItem = within(menu).getByText(item);

  await user.click(menuItem);
  expect(await screen.findByTestId('output')).toHaveTextContent(expected);
});

test('renders close button in selected tags', async () => {
  render(
    <Multiselect
      label="Vegetables"
      items={options}
      defaultSelectedItems={[options[0]]}
    />
  );

  const removeButton = await screen.findByRole('button', {
    name: /remove spinach/i,
  });
  expect(removeButton).toBeInTheDocument();
  // eslint-disable-next-line testing-library/no-node-access
  expect(removeButton.querySelector('svg')).toBeVisible();
});

test('handles close button click', async () => {
  render(
    <Multiselect
      label="Vegetables"
      items={options}
      defaultSelectedItems={[options[0]]}
    />
  );

  const removeButton = await screen.findByRole('button', {
    name: /remove spinach/i,
  });
  await user.click(removeButton);

  await waitFor(() => {
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.queryByText('Spinach')).not.toBeInTheDocument();
  });
});

test('Allow styling container & input via theme', () => {
  render(<Multiselect label="label" items={options} defaultValue="Apple" />);

  // eslint-disable-next-line testing-library/no-node-access
  const field = screen.getByText('label').parentElement;
  expect(field?.className).toMatchInlineSnapshot(
    `"group/field w-full group/field"`
  );

  const input = screen.getByDisplayValue('Apple');
  expect(input.className).toMatchInlineSnapshot(`"base-input-style"`);
});
