import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';

import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

import { tv } from 'tailwind-variants';

const theme: Theme = {
  name: 'test',
  components: {
    Checkbox: tv({
      slots: {
        label: ['data-[error]:bg-red-500'],
        container: [''],
        checkbox: [''],
      },
      variants: {
        variant: {
          teal: {
            label: ['text-teal-500'],
          },
        },
        size: {
          large: {
            label: ['font-[18px]'],
          },
        },
      },
    }),
    CheckboxGroup: tv({
      slots: {
        container: ['bg-gray-600'],
        group: ['italic	'],
      },
      variants: {
        variant: {
          teal: {
            container: ['bg-teal-600'],
          },
        },
        size: {
          large: {
            group: ['font-[18px]'],
          },
        },
      },
    }),
  },
};

test('renders label and group of checkboxes', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes">
      <Checkbox value="one">one</Checkbox>
      <Checkbox value="two">two</Checkbox>
      <Checkbox value="three">three</Checkbox>
    </CheckboxGroup>
  );

  expect(screen.getByText('Group of Checkboxes')).toBeInTheDocument();
  expect(screen.getByText('one')).toBeInTheDocument();
  expect(screen.getByText('two')).toBeInTheDocument();
  expect(screen.getByText('three')).toBeInTheDocument();
});

test('label is optional (can use aria-label instead)', () => {
  render(
    <CheckboxGroup aria-label="Aria Label">
      <Checkbox value="one">one</Checkbox>
      <Checkbox value="two">two</Checkbox>
      <Checkbox value="three">three</Checkbox>
    </CheckboxGroup>
  );

  expect(screen.queryByText('Group of Checkboxes')).not.toBeInTheDocument();
  expect(screen.getByText('one')).toBeInTheDocument();
  expect(screen.getByText('two')).toBeInTheDocument();
  expect(screen.getByText('three')).toBeInTheDocument();
});

test('passes down "disabled" to checkboxes', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes" disabled>
      <Checkbox value="one" data-testid="one">
        one
      </Checkbox>
      <Checkbox value="two" data-testid="two">
        two
      </Checkbox>
      <Checkbox value="three" data-testid="three">
        three
      </Checkbox>
    </CheckboxGroup>
  );

  expect(screen.getByTestId('one')).toBeDisabled();
  expect(screen.getByTestId('two')).toBeDisabled();
  expect(screen.getByTestId('three')).toBeDisabled();
});

test('passes down "read-only" to checkboxes', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes" readOnly>
      <Checkbox value="one" data-testid="one">
        one
      </Checkbox>
      <Checkbox value="two" data-testid="two">
        two
      </Checkbox>
      <Checkbox value="three" data-testid="three">
        three
      </Checkbox>
    </CheckboxGroup>
  );

  expect(screen.getByTestId('one')).toHaveAttribute('aria-readonly', 'true');
  expect(screen.getByTestId('two')).toHaveAttribute('aria-readonly', 'true');
  expect(screen.getByTestId('three')).toHaveAttribute('aria-readonly', 'true');
});

test('passes down "error" to checkboxes', () => {
  render(
    <ThemeProvider theme={theme}>
      <CheckboxGroup label="Group of Checkboxes" error>
        <Checkbox value="one" data-testid="one">
          one
        </Checkbox>
        <Checkbox value="two" data-testid="two">
          two
        </Checkbox>
        <Checkbox value="three" data-testid="three">
          three
        </Checkbox>
      </CheckboxGroup>
    </ThemeProvider>
  );

  expect(screen.getByText('one')).toHaveClass(`data-[error]:bg-red-500`);
  expect(screen.getByText('two')).toHaveClass(`data-[error]:bg-red-500`);
  expect(screen.getByText('three')).toHaveClass(`data-[error]:bg-red-500`);
});

test('controlled', () => {
  const onChange = jest.fn();
  render(
    <CheckboxGroup label="Group of Checkboxes" onChange={onChange}>
      <Checkbox value="one" data-testid="one">
        one
      </Checkbox>
      <Checkbox value="two" data-testid="two">
        two
      </Checkbox>
      <Checkbox value="three" data-testid="three">
        three
      </Checkbox>
    </CheckboxGroup>
  );

  fireEvent.click(screen.getByTestId('one'));
  expect(onChange).toHaveBeenCalledWith(['one']);

  fireEvent.click(screen.getByTestId('three'));
  expect(onChange).toHaveBeenCalledWith(['one', 'three']);

  fireEvent.click(screen.getByTestId('two'));
  expect(onChange).toHaveBeenCalledWith(['one', 'three', 'two']);

  fireEvent.click(screen.getByTestId('three'));
  expect(onChange).toHaveBeenCalledWith(['one', 'two']);
});

test('accepts description', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes" description="My description">
      <Checkbox value="one" data-testid="one">
        one
      </Checkbox>
      <Checkbox value="two" data-testid="two">
        two
      </Checkbox>
      <Checkbox value="three" data-testid="three">
        three
      </Checkbox>
    </CheckboxGroup>
  );

  expect(screen.getByText('My description')).toBeInTheDocument();
});

test('accepts error message', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes" error errorMessage="My Error">
      <Checkbox value="one" data-testid="one">
        one
      </Checkbox>
      <Checkbox value="two" data-testid="two">
        two
      </Checkbox>
      <Checkbox value="three" data-testid="three">
        three
      </Checkbox>
    </CheckboxGroup>
  );

  expect(screen.getByText('My Error')).toBeInTheDocument();
});
