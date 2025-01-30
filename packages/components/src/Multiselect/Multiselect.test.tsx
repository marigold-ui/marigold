import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { Multiselect2 } from './Multiselect2';

const user = userEvent.setup();

// Reuse or adapt your existing theme setup
const theme: Theme = {
  name: 'test',
  components: {
    MultiSelect: {
      field: cva('group/field w-full'),
      input: cva('base-input-style'),
      tag: cva('tag-style'),
      closeButton: cva('close-button-style'),
      listContainer: cva('list-container'),
      list: cva('list-style'),
      option: cva('option-style'),
      icon: cva('icon-style'),
    },
    Label: cva('label-style'),
    HelpText: cva('help-text-style'),
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
  render(<Multiselect2 label="Vegetables" items={options} />);

  expect(screen.getByLabelText('Vegetables')).toBeInTheDocument();
  expect(screen.getByText('Vegetables')).toBeInTheDocument();
});

test('supports disabled state', () => {
  render(<Multiselect2 label="Vegetables" disabled items={options} />);

  const input = screen.getByLabelText('Vegetables');
  expect(input).toBeInTheDocument();
  expect(input).toBeDisabled();
  // expect(document.querySelector('button')).toBeDisabled();
});

test('shows selected options as tags', async () => {
  render(
    <Multiselect2
      label="Vegetables"
      items={options}
      defaultSelectedItems={[options[0], options[1]]}
    />
  );

  expect(screen.getByText('Spinach')).toBeInTheDocument();
  expect(screen.getByText('Carrots')).toBeInTheDocument();
});

test('allows selecting multiple options', async () => {
  render(<Multiselect2 label="Vegetables" items={options} />);

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
    <Multiselect2
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
    <Multiselect2
      label="Vegetables"
      error
      errorMessage="Invalid selection"
      items={options}
    />
  );

  expect(screen.getByText('Invalid selection')).toBeInTheDocument();
});

test('supports controlled selection', async () => {
  const Controlled = () => {
    const [selected, setSelected] = React.useState([]);
    return (
      <>
        <Multiselect2
          label="Vegetables"
          items={options}
          onSelectionChange={setSelected}
        />
        <div data-testid="output">{selected.length}</div>
      </>
    );
  };

  render(<Controlled />);

  const input = screen.getByLabelText('Vegetables');

  await user.click(input);

  const spinach = await screen.findByText('Spinach');
  await user.click(spinach);

  expect(await screen.findByTestId('output')).toHaveTextContent('1');

  const carrots = await screen.findByText('Carrots');
  await user.click(carrots);

  expect(await screen.findByTestId('output')).toHaveTextContent('2');
});

// test('shows loading state when async options', async () => {
//     render(
//         <Multiselect2
//             label="Vegetables"
//             options={options}
//             isLoading
//         />
//     );

//     await user.click(screen.getByLabelText('Vegetables'));
//     expect(screen.getByText('Loading...')).toBeInTheDocument();
// });

// test('applies custom classnames from theme', () => {
//     render(<Multiselect2 label="Vegetables" options={options} />);

//     const container = document.querySelector('.group\\/field');
//     expect(container).toHaveClass('w-full');

//     const tag = screen.queryByText('Spinach');
//     expect(tag).toHaveClass('tag-style');
// });
