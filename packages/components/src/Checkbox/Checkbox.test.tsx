/* eslint-disable testing-library/no-node-access */
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { Checkbox } from './Checkbox';

const theme: Theme = {
  name: 'test',
  components: {
    Checkbox: {
      container: cva([], {
        variants: {
          size: {
            small: 'py-1',
          },
        },
      }),
      label: cva('data-disabled:text-checkbox-label-disabled leading-[1.125]'),
      checkbox: cva([
        'border-checkbox-base-border bg-checkbox-base-background rounded-[2] p-0.5',
        'data-hover:border-checkbox-base-hover',
        'data-focus:outline-checkbox-base-focus data-focus:outline-offset[3] data-focus:outline data-focus:outline-2',
        'data-checked:border-checkbox-base-checked data-checked:bg-checkbox-base-checkedBackground data-checked:text-white',
        'data-indeterminate:border-checkbox-base-indeterminate data-indeterminate:bg-checkbox-base-indeterminateBackground data-indeterminate:text-white',
        'data-disabled:border-checkbox-base-disabled data-disabled:bg-checkbox-base-disabledBackground',
      ]),
      group: cva(),
    },
    Field: cva(),
  },
};

// There is no real accesible way to get to the element that acts as checkbox
const getVisibleCheckbox = () => {
  const label = screen.getByText('With Label');

  return label.parentElement?.querySelector('[aria-hidden="true"]');
};

const { render } = setup({ theme });

// Tests
// ---------------
test('renders label and (hidden) checkbox', () => {
  render(<Checkbox label="With Label" />);

  const label = screen.getByText('With Label');
  expect(label).toBeInTheDocument();

  const checkbox = screen.getByLabelText('With Label');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeInstanceOf(HTMLInputElement);
  expect(checkbox).toHaveAttribute('type', 'checkbox');
});

test('allows to render without label', () => {
  render(<Checkbox aria-label="No Label" />);

  const checkbox = screen.getByLabelText('No Label');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeInstanceOf(HTMLInputElement);
  expect(checkbox).toHaveAttribute('type', 'checkbox');

  expect(checkbox).toHaveAttribute('aria-label', 'No Label');
});

test('supports read only state', () => {
  render(<Checkbox label="Read Only" readOnly defaultChecked />);

  const checkbox = screen.getByLabelText<HTMLInputElement>('Read Only');
  const component = screen.getByText('Read Only');

  fireEvent.click(component);
  expect(checkbox.checked).toBeTruthy();
});

test('check if all slot class names are applied correctly', () => {
  render(<Checkbox label="With Label" />);

  const label = screen.getByText('With Label');

  expect(label.parentElement?.className).toMatchInlineSnapshot(
    `"group/checkbox flex items-center gap-[0.5rem] cursor-pointer data-disabled:cursor-not-allowed"`
  );

  expect(getVisibleCheckbox()?.className).toMatchInlineSnapshot(
    `"flex shrink-0 grow-0 basis-4 items-center justify-center h-4 w-4 border border-solid border-checkbox-base-border bg-checkbox-base-background rounded-[2] p-0.5 data-hover:border-checkbox-base-hover data-focus:outline-offset[3] data-focus:outline-2 data-checked:border-checkbox-base-checked data-checked:bg-checkbox-base-checkedBackground data-checked:text-white data-indeterminate:border-checkbox-base-indeterminate data-indeterminate:bg-checkbox-base-indeterminateBackground data-indeterminate:text-white data-disabled:border-checkbox-base-disabled data-disabled:bg-checkbox-base-disabledBackground"`
  );
  expect(label.className).toMatchInlineSnapshot(
    `"data-disabled:text-checkbox-label-disabled leading-[1.125]"`
  );
});

test('correct class name is set on size small', () => {
  render(<Checkbox label="With Label" size="small" />);

  const label = screen.getByText('With Label');

  expect(label.parentElement?.className).toMatchInlineSnapshot(
    `"group/checkbox flex items-center gap-[0.5rem] cursor-pointer data-disabled:cursor-not-allowed py-1"`
  );
});

test('support default checked', () => {
  render(<Checkbox label="With Label" defaultChecked />);

  const input = screen.getByLabelText<HTMLInputElement>('With Label');
  expect(input.checked).toBeTruthy();
});

test('supports indeterminate state', () => {
  render(<Checkbox label="With Label" indeterminate />);

  const input = screen.getByLabelText<HTMLInputElement>('With Label');
  expect(input.indeterminate).toBeTruthy();
});

test('controlled', () => {
  const onChange = vi.fn();
  render(<Checkbox label="With Label" onChange={onChange} />);
  const input = screen.getByLabelText<HTMLInputElement>('With Label');

  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(true);

  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(false);
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLLabelElement>();
  render(<Checkbox label="Check it" ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLLabelElement);
});
