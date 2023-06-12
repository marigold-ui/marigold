import React from 'react';
import { screen, within } from '@testing-library/react';
import { Theme } from '@marigold/system';

import { NumberField } from './NumberField';
import userEvent from '@testing-library/user-event';

import { cva } from 'class-variance-authority';
import { setup } from '../test.utils';

const theme: Theme = {
  name: 'NumberField testing',
  components: {
    NumberField: {
      group: cva('rounded-sm border border-solid border-black'),
      stepper: cva('w-3.5 text-green-600'),
    },

    Field: cva(''),
    Label: { container: cva(), indicator: cva() },
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
      action: cva(),
      icon: cva(),
      input: cva(),
    },
  },
};

const { render } = setup({ theme });

// Tests
// ---------------
test('renders an input', () => {
  render(<NumberField label="Label" data-testid="number-field" />);

  const numberField = screen.getByTestId('number-field');
  expect(numberField).toBeInTheDocument();
  expect(numberField).toHaveAttribute('type', 'text');
  expect(numberField).toBeInstanceOf(HTMLInputElement);
});

test('input can be styled via "Input" styles', () => {
  render(<NumberField label="A Label" data-testid="number-field" />);
  const numberFieldContainer = screen.getByTestId('number-field-container');
  expect(numberFieldContainer).toBeInTheDocument();
  expect(numberFieldContainer.className).toMatchInlineSnapshot(
    `"flex items-stretch rounded-sm border border-solid border-black"`
  );
});

test('group and stepper can styled via "NumberField" styles', () => {
  render(<NumberField label="A Label" data-testid="number-field" />);

  const group = screen.getByRole('group');
  expect(group.className).toMatchInlineSnapshot(
    `"flex items-stretch rounded-sm border border-solid border-black"`
  );

  const steppers = within(group).getAllByRole('button');
  expect(steppers[0].className).toMatchInlineSnapshot(
    `"flex items-center justify-center cursor-pointer data-[disabled]:cursor-not-allowed w-3.5 text-green-600"`
  );
  expect(steppers[1].className).toMatchInlineSnapshot(
    `"flex items-center justify-center cursor-pointer data-[disabled]:cursor-not-allowed w-3.5 text-green-600"`
  );
});

test('allows to set width via prop', () => {
  render(<NumberField data-testid="number-field" label="Label" width="huge" />);

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  expect(container?.className).toMatchInlineSnapshot(
    `"group/field w-[--fieldWidth]"`
  );
});

test('supports disabled', () => {
  render(<NumberField label="A Label" disabled data-testid="number-field" />);

  const numberField = screen.getByTestId('number-field');
  expect(numberField).toBeDisabled();

  const group = screen.getByRole('group');
  const steppers = within(group).getAllByRole('button');
  expect(steppers[0]).toHaveAttribute('aria-disabled', 'true');
  expect(steppers[1]).toHaveAttribute('aria-disabled', 'true');
});

test('supports required', () => {
  render(<NumberField label="A Label" required data-testid="number-field" />);

  const numberField = screen.getByTestId('number-field');
  expect(numberField).toHaveAttribute('aria-required', 'true');
});

test('supports readonly', () => {
  render(<NumberField label="A Label" readOnly data-testid="number-field" />);

  const numberField = screen.getByTestId('number-field');
  expect(numberField).toHaveAttribute('readonly');
});

test('supports field structure', () => {
  render(
    <NumberField
      label="A Label"
      description="Some helpful text"
      errorMessage="Whoopsie"
    />
  );

  const label = screen.queryByText('A Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryByText('Some helpful text');
  expect(description).toBeInTheDocument();

  const error = screen.queryByText('Whoopsie');
  expect(error).not.toBeInTheDocument();
});

test('supports field structure (with error)', () => {
  render(
    <NumberField
      label="A Label"
      description="Some helpful text"
      error={true}
      errorMessage="Whoopsie"
    />
  );

  const label = screen.queryByText('A Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryByText('Some helpful text');
  expect(description).not.toBeInTheDocument();

  const error = screen.queryByText('Whoopsie');
  expect(error).toBeInTheDocument();
});

test('can have default value', () => {
  render(
    <NumberField data-testid="number-field" label="A Label" defaultValue={50} />
  );

  const input = screen.getByTestId('number-field');
  expect(input).toHaveValue('50');
});

test('can be controlled', async () => {
  const user = userEvent.setup();

  const Controlled = () => {
    const [value, setValue] = React.useState(0);

    return (
      <>
        <NumberField
          data-testid="number-field"
          label="A Label"
          value={value}
          onChange={setValue}
        />
        <span data-testid="output">{value}</span>
      </>
    );
  };

  render(<Controlled />);

  const input = screen.getByTestId('number-field');
  await user.click(input);
  await user.type(input, '42');
  await user.tab();

  expect(screen.getByTestId('output')).toHaveTextContent('42');
});

test('allows to specify min and max value', async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(
    <NumberField
      label="A Label"
      data-testid="number-field"
      minValue={0}
      maxValue={10}
      onChange={onChange}
    />
  );

  const input: HTMLInputElement = screen.getByTestId('number-field');

  await user.click(input);
  await user.type(input, '100');
  await user.tab();

  expect(input.value).toEqual('10');
  expect(onChange).toHaveBeenCalledWith(10);
});

test('increment and decrement value via stepper', async () => {
  const user = userEvent.setup();

  render(
    <NumberField label="A Label" data-testid="number-field" defaultValue={50} />
  );

  const input: HTMLInputElement = screen.getByTestId('number-field');
  const [decrement, increment] = screen.getAllByRole('button');

  user.click(increment);
  await user.click(increment);
  await user.click(increment);

  expect(input.value).toEqual('53');

  await user.click(decrement);
  await user.click(decrement);

  expect(input.value).toEqual('51');
});

test('increment and decrement value via stepper (with min and max)', async () => {
  const user = userEvent.setup();

  render(
    <NumberField
      label="A Label"
      data-testid="number-field"
      minValue={0}
      maxValue={5}
      defaultValue={1}
    />
  );

  const input: HTMLInputElement = screen.getByTestId('number-field');
  const group = screen.getByRole('group');
  const [decrement, increment] = within(group).getAllByRole('button');

  user.click(decrement);
  await user.click(decrement);
  await user.click(decrement);
  await user.click(decrement);
  await user.click(decrement);

  expect(input.value).toEqual('0');

  await user.click(increment);
  await user.click(increment);
  await user.click(increment);
  await user.click(increment);
  await user.click(increment);
  await user.click(increment);

  expect(input.value).toEqual('5');
});

test('increment and decrement with custom steps', async () => {
  const user = userEvent.setup();

  render(
    <NumberField
      label="A Label"
      data-testid="number-field"
      defaultValue={0}
      step={10}
    />
  );

  const input: HTMLInputElement = screen.getByTestId('number-field');
  const group = screen.getByRole('group');
  const [decrement, increment] = within(group).queryAllByRole('button');

  user.click(increment);
  await user.click(increment);

  expect(input.value).toEqual('20');

  await user.click(decrement);

  expect(input.value).toEqual('10');
});

test('hide stepper buttons', () => {
  render(
    <NumberField label="A Label" data-testid="number-field" hideStepper />
  );

  const group = screen.getByRole('group');
  const stepper = within(group).queryAllByRole('button');

  expect(stepper).toHaveLength(0);
});

test('allows formatting of displayed value', () => {
  render(
    <>
      <NumberField
        label="A Label"
        data-testid="number-field-decimal"
        defaultValue={3.41}
        formatOptions={{
          signDisplay: 'exceptZero',
          minimumFractionDigits: 1,
          maximumFractionDigits: 2,
        }}
      />
      <NumberField
        label="A Label"
        data-testid="number-field-money"
        defaultValue={9.99}
        formatOptions={{
          style: 'currency',
          currency: 'EUR',
        }}
      />
      <NumberField
        label="A Label"
        data-testid="number-field-percentage"
        defaultValue={0.34}
        formatOptions={{
          style: 'percent',
        }}
      />
      <NumberField
        label="A Label"
        data-testid="number-field-unit"
        defaultValue={150}
        formatOptions={{
          style: 'unit',
          unit: 'centimeter',
          unitDisplay: 'short',
        }}
      />
    </>
  );

  const decimal: HTMLInputElement = screen.getByTestId('number-field-decimal');
  expect(decimal.value).toEqual('+3.41');

  const money: HTMLInputElement = screen.getByTestId('number-field-money');
  expect(money.value).toEqual('€9.99');

  const percentage: HTMLInputElement = screen.getByTestId(
    'number-field-percentage'
  );
  expect(percentage.value).toEqual('34%');

  const unit: HTMLInputElement = screen.getByTestId('number-field-unit');
  expect(unit.value).toEqual('150 cm');
});
