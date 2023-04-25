import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';
import { Checkbox } from './Checkbox';
import { act } from 'react-dom/test-utils';
import { tv } from 'tailwind-variants';
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

test.only('check if all slot class names are applied correctly', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox">With Label</Checkbox>
    </ThemeProvider>
  );

  const label = screen.getByLabelText('With Label');
  // // eslint-disable-next-line testing-library/no-node-access
  // const input = label.firstChild;

  expect(label).toHaveClass('flex item-center gap-[1ch] relative', {
    exact: true,
  });

  // expect(input).toHaveClass('leading-[1.125]');
  expect(getVisibleCheckbox()).toHaveClass(
    'flex items-center justify-center grow-0 shrink-0 basis-4 w-4 h-4 border border-solid rounded-[3px] rounded-[2] border-checkbox-base-border bg-checkbox-base-background p-0.5 data-[hover]:border-checkbox-base-hover data-[focus]:outline-2 data-[focus]:outline data-[focus]:outline-offset[3] data-[checked]:text-white data-[checked]:border-checkbox-base-checked data-[checked]:bg-checkbox-base-checkedBackground data-[indeterminate]:text-white data-[indeterminate]:border-checkbox-base-indeterminate data-[indeterminate]:bg-checkbox-base-indeterminateBackground data-[disabled]:border-checkbox-base-disabled data-[disabled]:bg-checkbox-base-disabledBackground',
    { exact: true }
  );
});

test('allows styling "checked" state via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox" checked>
        With Label
      </Checkbox>
    </ThemeProvider>
  );

  const checkbox = getVisibleCheckbox();
  expect(checkbox).toHaveClass('rounded-[2]');
  expect(checkbox).toHaveClass('data-[checked]:text-teal-600');
});

test('allows styling "focus" state via theme', async () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox">With Label</Checkbox>
    </ThemeProvider>
  );
  const input = screen.getByTestId('checkbox');
  const checkbox = await waitFor(() => getVisibleCheckbox());
  act(() => {
    input.focus();
  });
  expect(checkbox).toHaveClass('focus:outline-1');
  expect(checkbox).toHaveClass('focus:outline');
  expect(checkbox).toHaveClass('focus:outline-blue-600');
});

test('allows styling "disabled" state via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox" disabled>
        With Label
      </Checkbox>
    </ThemeProvider>
  );
  const checkbox = getVisibleCheckbox();
  expect(checkbox).toHaveClass(
    ' flex items-center justify-center grow-0 shrink-0 basis-4 w-4 h-4 border border-solid rounded-[3px] rounded-[2] border-checkbox-base-border bg-checkbox-base-background p-0.5 data-[hover]:border-checkbox-base-hover data-[focus]:outline-2 data-[focus]:outline data-[focus]:outline-offset[3] data-[checked]:text-white data-[checked]:border-checkbox-base-checked data-[checked]:bg-checkbox-base-checkedBackground data-[indeterminate]:text-white data-[indeterminate]:border-checkbox-base-indeterminate data-[indeterminate]:bg-checkbox-base-indeterminateBackground data-[disabled]:border-checkbox-base-disabled data-[disabled]:bg-checkbox-base-disabledBackground',
    { exact: true }
  );
});

test('allows styling "read-only" state via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox" readOnly>
        With Label
      </Checkbox>
    </ThemeProvider>
  );
  const checkbox = getVisibleCheckbox();
  expect(checkbox).toHaveStyle(`opacity: 0.5`);
});

test('allows styling "error" state via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox" error>
        With Label
      </Checkbox>
    </ThemeProvider>
  );
  const checkbox = getVisibleCheckbox();
  expect(checkbox).toHaveStyle(`background: ${theme.colors.red}`);
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

  // Visible checkbox looks checked
  const checkbox = getVisibleCheckbox();
  expect(checkbox).toHaveClass('rounded-[2]');
  expect(checkbox).toHaveStyle(`color: ${theme.colors.teal}`);
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

  // Visible checkbox looks checked
  const checkbox = getVisibleCheckbox();
  expect(checkbox).toHaveClass('rounded-[2]');
  expect(checkbox).toHaveStyle(`color: ${theme.colors.teal}`);
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
