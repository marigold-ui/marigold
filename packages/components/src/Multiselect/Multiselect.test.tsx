import { screen } from '@testing-library/react';
import React from 'react';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { Multiselect } from './Multiselect';

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
