import { fireEvent, screen } from '@testing-library/react';

import { Theme, cva } from '@marigold/system';

import { FieldGroup } from '../FieldBase';
import { setup } from '../test.utils';
import { CheckboxGroup } from './CheckboxGroup';
import { Checkbox } from './_Checkbox';

const theme: Theme = {
  name: 'checkbox group testing',
  components: {
    Checkbox: {
      container: cva([], {
        variants: {
          size: {
            small: 'py-1',
          },
        },
      }),
      label: cva(
        'data-[disabled]:text-checkbox-label-disabled leading-[1.125]'
      ),
      checkbox: cva([
        'border-checkbox-base-border bg-checkbox-base-background rounded-[2] p-0.5',
        'data-[hover]:border-checkbox-base-hover',
        'data-[focus]:outline-checkbox-base-focus data-[focus]:outline-offset[3] data-[focus]:outline data-[focus]:outline-2',
        'data-[checked]:border-checkbox-base-checked data-[checked]:bg-checkbox-base-checkedBackground data-[checked]:text-white',
        'data-[indeterminate]:border-checkbox-base-indeterminate data-[indeterminate]:bg-checkbox-base-indeterminateBackground data-[indeterminate]:text-white',
        'data-[disabled]:border-checkbox-base-disabled data-[disabled]:bg-checkbox-base-disabledBackground',
      ]),
    },
    Field: cva(),
    Label: { container: cva(), indicator: cva() },
    HelpText: {
      container: cva(''),
      icon: cva(''),
    },
  },
};

const { render } = setup({ theme });

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
  );

  // expect(screen.getByText('one')).toHaveClass(`data-[error]:bg-red-500`);
  // expect(screen.getByText('two')).toHaveClass(`data-[error]:bg-red-500`);
  // expect(screen.getByText('three')).toHaveClass(`data-[error]:bg-red-500`);
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

test('works with a <FieldGroup>', () => {
  render(
    <FieldGroup labelWidth="100px">
      <CheckboxGroup label="Group of Checkboxes">
        <Checkbox value="one">one</Checkbox>
        <Checkbox value="two">two</Checkbox>
        <Checkbox value="three">three</Checkbox>
      </CheckboxGroup>
    </FieldGroup>
  );

  expect(screen.getByText('Group of Checkboxes')).toBeInTheDocument();
  expect(screen.getByText('one')).toBeInTheDocument();
  expect(screen.getByText('two')).toBeInTheDocument();
  expect(screen.getByText('three')).toBeInTheDocument();
});
