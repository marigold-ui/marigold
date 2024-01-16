/* eslint-disable testing-library/no-node-access */
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

import { Theme, cva } from '@marigold/system';

import { FieldGroup } from '../FieldBase';
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
      group: cva(),
    },
    Field: cva(),
  },
};

// There is no real accesible way to get to the element that acts as checkbox
const getVisibleCheckbox = () => {
  const label = screen.getByText('With Label');
  // eslint-disable-next-line testing-library/no-node-access
  return label.parentElement?.querySelector('[aria-hidden="true"]');
};

const { render } = setup({ theme });

// Tests
// ---------------
test('renders label and (hidden) checkbox', () => {
  render(<Checkbox>With Label</Checkbox>);

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
  render(
    <Checkbox readOnly defaultChecked>
      Read Only
    </Checkbox>
  );

  const checkbox = screen.getByLabelText<HTMLInputElement>('Read Only');
  const component = screen.getByText('Read Only');

  fireEvent.click(component);
  expect(checkbox.checked).toBeTruthy();
});

test('check if all slot class names are applied correctly', () => {
  render(<Checkbox>With Label</Checkbox>);

  const label = screen.getByText('With Label');

  expect(label.parentElement?.className).toMatchInlineSnapshot(
    `"group/checkbox flex items-center gap-[0.5rem] cursor-pointer data-[disabled]:cursor-not-allowed"`
  );

  expect(getVisibleCheckbox()?.className).toMatchInlineSnapshot(
    `"flex shrink-0 grow-0 basis-4 items-center justify-center h-4 w-4 border border-solid border-checkbox-base-border bg-checkbox-base-background rounded-[2] p-0.5 data-[hover]:border-checkbox-base-hover data-[focus]:outline-offset[3] data-[focus]:outline data-[focus]:outline-2 data-[checked]:border-checkbox-base-checked data-[checked]:bg-checkbox-base-checkedBackground data-[checked]:text-white data-[indeterminate]:border-checkbox-base-indeterminate data-[indeterminate]:bg-checkbox-base-indeterminateBackground data-[indeterminate]:text-white data-[disabled]:border-checkbox-base-disabled data-[disabled]:bg-checkbox-base-disabledBackground"`
  );
  expect(label.className).toMatchInlineSnapshot(
    `"data-[disabled]:text-checkbox-label-disabled leading-[1.125]"`
  );
});

test('correct class name is set on size small', () => {
  render(<Checkbox size="small">With Label</Checkbox>);

  const label = screen.getByText('With Label');

  expect(label.parentElement?.className).toMatchInlineSnapshot(
    `"group/checkbox flex items-center gap-[0.5rem] cursor-pointer data-[disabled]:cursor-not-allowed py-1"`
  );
});

test('support default checked', () => {
  render(<Checkbox defaultChecked>With Label</Checkbox>);

  const input = screen.getByLabelText<HTMLInputElement>('With Label');
  expect(input.checked).toBeTruthy();
});

test('supports indeterminate state', () => {
  render(<Checkbox indeterminate>With Label</Checkbox>);

  const input = screen.getByLabelText<HTMLInputElement>('With Label');
  expect(input.indeterminate).toBeTruthy();
});

test('controlled', () => {
  const onChange = jest.fn();
  render(<Checkbox onChange={onChange}>With Label</Checkbox>);
  const input = screen.getByLabelText<HTMLInputElement>('With Label');

  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(true);

  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(false);
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLLabelElement>();
  render(<Checkbox ref={ref}>Check it</Checkbox>);

  expect(ref.current).toBeInstanceOf(HTMLLabelElement);
});

test('works with a <FieldGroup>', () => {
  render(
    <FieldGroup labelWidth="100px">
      <Checkbox>Check it</Checkbox>
    </FieldGroup>
  );

  const checkbox = screen.getByLabelText('Check it');
  expect(checkbox).toBeInTheDocument();
});
