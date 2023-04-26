/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';
import { Checkbox } from './Checkbox';
import { checkbox } from './../../../../themes/tailwind-core/src/components/Checkbox.styles';

const theme: Theme = {
  name: 'test',
  components: {
    Checkbox: checkbox,
  },
};

// There is no real accesible way to get to the element that acts as checkbox
const getVisibleCheckbox = () => {
  const label = screen.getByText('With Label');
  // eslint-disable-next-line testing-library/no-node-access
  return label.parentElement?.querySelector('[aria-hidden="true"]');
};

// Tests
// ---------------
test('renders label and (hidden) checkbox', () => {
  render(<Checkbox data-testid="checkbox">With Label</Checkbox>);

  const label = screen.getByText('With Label');
  expect(label).toBeInTheDocument();

  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeInstanceOf(HTMLInputElement);
  expect(checkbox).toHaveAttribute('type', 'checkbox');
});

test('allows to render without label', () => {
  render(<Checkbox data-testid="checkbox" aria-label="No Label" />);

  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeInstanceOf(HTMLInputElement);
  expect(checkbox).toHaveAttribute('type', 'checkbox');

  expect(checkbox).toHaveAttribute('aria-label', 'No Label');
});

test('supports read only state', () => {
  render(
    <Checkbox data-testid="checkbox" readOnly defaultChecked>
      Read Only
    </Checkbox>
  );

  const checkbox = screen.getByTestId<HTMLInputElement>('checkbox');
  const component = screen.getByText('Read Only');

  fireEvent.click(component);
  expect(checkbox.checked).toBeTruthy();
});

test('check if all slot class names are applied correctly', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox">With Label</Checkbox>
    </ThemeProvider>
  );

  const label = screen.getByText('With Label');

  expect(label.parentElement).toHaveClass(
    'flex item-center gap-[1ch] relative',
    { exact: true }
  );
  expect(label.parentElement?.childNodes[0]).toHaveClass(
    'absolute w-full h-full top-0 left-0 z-1 opacity-[0.0001] cursor-pointer',
    {
      exact: true,
    }
  );
  expect(getVisibleCheckbox()).toHaveClass(
    'flex items-center justify-center grow-0 shrink-0 basis-4 w-4 h-4 border border-solid rounded-[3px] rounded-[2] border-checkbox-base-border bg-checkbox-base-background p-0.5 data-[hover]:border-checkbox-base-hover data-[focus]:outline-2 data-[focus]:outline data-[focus]:outline-offset[3] data-[checked]:text-white data-[checked]:border-checkbox-base-checked data-[checked]:bg-checkbox-base-checkedBackground data-[indeterminate]:text-white data-[indeterminate]:border-checkbox-base-indeterminate data-[indeterminate]:bg-checkbox-base-indeterminateBackground data-[disabled]:border-checkbox-base-disabled data-[disabled]:bg-checkbox-base-disabledBackground',
    { exact: true }
  );
  expect(label).toHaveClass(
    'leading-[1.125] data-[disabled]:text-checkbox-label-disabled',
    { exact: true }
  );
});

test('allows styling "error" state via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox" error>
        With Label
      </Checkbox>
    </ThemeProvider>
  );
  //TODO: fix test after Helptext component is migrated to tailwind
  //const checkbox = getVisibleCheckbox();
  //expect(checkbox).toHaveClass();
});

test('correct class name is set on size small', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox" size="small">
        With Label
      </Checkbox>
    </ThemeProvider>
  );

  const label = screen.getByText('With Label');

  expect(label.parentElement).toHaveClass(
    'flex item-center gap-[1ch] relative py-1',
    { exact: true }
  );
});

test('support default checked', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox" defaultChecked>
        With Label
      </Checkbox>
    </ThemeProvider>
  );

  const input: HTMLInputElement = screen.getByTestId('checkbox');
  expect(input.checked).toBeTruthy();
});

test('supports indeterminate state', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox" indeterminate>
        With Label
      </Checkbox>
    </ThemeProvider>
  );
  const input: HTMLInputElement = screen.getByTestId('checkbox');
  expect(input.indeterminate).toBeTruthy();
});

test('controlled', () => {
  const onChange = jest.fn();
  render(
    <Checkbox data-testid="checkbox" onChange={onChange}>
      With Label
    </Checkbox>
  );
  const input: HTMLInputElement = screen.getByTestId('checkbox');

  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(true);

  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(false);
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLInputElement>();
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox" ref={ref}>
        Check it
      </Checkbox>
    </ThemeProvider>
  );

  expect(ref.current).toBeInstanceOf(HTMLInputElement);
});
