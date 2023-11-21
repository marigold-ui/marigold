/* eslint-disable testing-library/no-node-access */
import { parseAbsoluteToLocal } from '@internationalized/date';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Theme, ThemeProvider, cva } from '@marigold/system';

import { setup } from '../test.utils';
import { DateField } from './_DateField';

const theme: Theme = {
  name: 'test',
  components: {
    Label: {
      container: cva('', {
        variants: {
          variant: {
            lime: 'text-lime-300',
          },
          size: {
            small: 'p-1',
          },
        },
      }),
      indicator: cva(),
    },
    HelpText: {
      container: cva(),
      icon: cva(),
    },
    DateField: {
      segment: cva('bg-white text-gray-700'),
      field: cva('p-2', {
        variants: {
          variant: {
            lime: 'text-lime-300',
          },
        },
      }),
      action: cva('p-3', {
        variants: {
          size: {
            small: 'p-1',
          },
        },
      }),
    },
    Field: cva(),
  },
};

const { render } = setup({ theme });

let onBlurSpy = jest.fn();
let onFocusChangeSpy = jest.fn();
let onFocusSpy = jest.fn();
let onKeyDownSpy = jest.fn();
let onKeyUpSpy = jest.fn();

afterEach(() => {
  onBlurSpy.mockClear();
  onFocusChangeSpy.mockClear();
  onFocusSpy.mockClear();
  onKeyDownSpy.mockClear();
  onKeyUpSpy.mockClear();
});

test('render DateField with label and helper text', () => {
  render(<DateField label="label" description="date field description" />);
  const label = screen.getByText('label');
  expect(label).toBeInTheDocument();
  const description = screen.getByText('date field description');
  expect(description).toBeInTheDocument();
});

test('supports error message', () => {
  render(
    <DateField label="date field" error errorMessage="something went wrong" />
  );
  const error = screen.getByText('something went wrong');
  expect(error).toBeInTheDocument();
});

test('render DateField with error messaege however description is set', () => {
  render(
    <DateField
      label="date field"
      error
      errorMessage="something went wrong"
      description="this is description"
    />
  );
  const description = screen.queryByText('this is description');
  expect(description).not.toBeInTheDocument();
  const error = screen.getByText('something went wrong');
  expect(error).toBeInTheDocument();
});

test('events', async () => {
  render(
    <DateField
      label="date"
      defaultValue={parseAbsoluteToLocal('2021-11-07T07:45:00Z')}
      onBlur={onBlurSpy}
      onFocus={onFocusSpy}
      onFocusChange={onFocusChangeSpy}
    />
  );
  let segments = screen.getAllByRole('spinbutton');
  expect(segments[0]).toHaveTextContent('11');
  expect(segments[1]).toHaveTextContent('07');

  expect(onBlurSpy).not.toHaveBeenCalled();
  expect(onFocusChangeSpy).not.toHaveBeenCalled();
  expect(onFocusSpy).not.toHaveBeenCalled();

  await userEvent.tab();
  expect(segments[0]).toHaveFocus();

  expect(onBlurSpy).not.toHaveBeenCalled();
  expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
  expect(onFocusSpy).toHaveBeenCalledTimes(1);

  await userEvent.tab();
  expect(segments[1]).toHaveFocus();
  expect(onBlurSpy).not.toHaveBeenCalled();
  expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
  expect(onFocusSpy).toHaveBeenCalledTimes(1);
});

test('passes down variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <DateField
        data-testid="date-field"
        label="Label"
        description="Description"
        variant="lime"
        size="small"
      />
    </ThemeProvider>
  );

  const label = screen.getByText('Label');
  expect(label.className).toMatchInlineSnapshot(
    `"text-lime-300 p-1 flex w-[var(--labelWidth)]"`
  );

  const description = screen.getByText('Description');
  expect(description.className).toMatchInlineSnapshot(`"react-aria-Text"`);

  const datefield = screen.getByTestId('date-field');
  expect(datefield.className).toMatchInlineSnapshot(`"group/field w-full"`);
});

test('renders without icons', () => {
  render(<DateField label="date field" />);
  const icon = screen.queryByRole('icon');
  const action = screen.queryByRole('action');
  expect(icon).not.toBeInTheDocument();
  expect(action).not.toBeInTheDocument();
});

test('renders label', () => {
  render(<DateField label="date field" />);
  const label = screen.getByText('date field');
  expect(label).toBeInTheDocument();
});

test('renders action', () => {
  render(<DateField label="date field" action={<div>huhu</div>} />);
  const action = screen.getByText('huhu');
  expect(action).toBeInTheDocument();
});
