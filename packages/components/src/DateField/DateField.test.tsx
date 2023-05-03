/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import userEvent from '@testing-library/user-event';
import { DateField } from './DateField';
import { Calendar, SmilieSatisfied } from '@marigold/icons';
import { parseAbsoluteToLocal } from '@internationalized/date';

const theme = {
  colors: {
    blue: '#00f',
    lime: '#82c91e',
  },
  fontSizes: {
    'small-1': 12,
  },
  sizes: {
    none: 0,
    large: 60,
  },
  components: {
    Label: {
      variant: {
        lime: {
          color: 'lime',
        },
      },
      size: {
        small: {
          fontSize: 'small-1',
        },
      },
    },
    HelpText: {
      variant: {
        lime: {
          container: {
            color: 'lime',
          },
        },
      },
      size: {
        small: {
          container: {
            fontSize: 'small-1',
          },
        },
      },
    },
    DateField: {
      base: {
        borderColor: 'blue',
      },
      variant: {
        lime: {
          color: 'lime',
        },
      },
      size: {
        small: {
          fontSize: 'small-1',
        },
      },
    },
  },
};

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
  expect(label).toHaveStyle(`color: ${theme.colors.lime}`);
  expect(label).toHaveStyle(`font-size: ${theme.fontSizes['small-1']}px`);

  const description = screen.getByText('Description');
  expect(description).toHaveStyle(`color: ${theme.colors.lime}`);
  expect(description).toHaveStyle(`font-size: ${theme.fontSizes['small-1']}px`);
});

test('renders with icon', () => {
  render(
    <DateField
      label="date field"
      icon={<SmilieSatisfied />}
      action={<Calendar />}
    />
  );
  const icon = screen.getByTestId('icon');
  const action = screen.getByTestId('action');
  expect(icon).toBeInTheDocument();
  expect(action).toBeInTheDocument();
});

test('renders without icons', () => {
  render(<DateField label="date field" />);
  const icon = screen.queryByRole('icon');
  const action = screen.queryByRole('action');
  expect(icon).not.toBeInTheDocument();
  expect(action).not.toBeInTheDocument();
});
