import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';
import { Checkbox } from './Checkbox';
import { act } from 'react-dom/test-utils';
import { tv } from 'tailwind-variants';

const theme: Theme = {
  name: 'test',
  components: {
    Checkbox: tv({
      slots: {
        label: 'text-[12]',
        checkbox: [
          'rounded-[2]',
          'focus:outline-1 focus:outline focus:outline-blue-600',
          'checked:text-teal-600',
          'indeterminate:text-teal-600',
          'disabled:bg-gray-600',
          'read-only:opacity-50',
          'error:bg-red-600',
        ],
      },
      variant: {
        green: {
          label: {
            color: 'green',
          },
          checkbox: {
            '&:checked': {
              color: 'green',
            },
          },
        },
      },
      size: {
        large: {
          label: {
            fontSize: 'large-1',
          },
          checkbox: {
            width: 32,
            height: 32,
          },
        },
      },
    }),
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

test('allows styling via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox">With Label</Checkbox>
    </ThemeProvider>
  );

  const label = screen.getByText('With Label');
  expect(label).toHaveStyle(`font-size: ${theme.fontSizes['small-1']}px`);

  expect(getVisibleCheckbox()).toHaveStyle(
    `border-radius: ${theme.radii['small-1']}px`
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
  expect(checkbox).toHaveStyle(`border-radius: ${theme.radii['small-1']}px`);
  expect(checkbox).toHaveStyle(`color: ${theme.colors.teal}`);
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
  expect(checkbox).toHaveStyle(`outline: 1px solid`);
  expect(checkbox).toHaveStyle(`outline-color: ${theme.colors.blue}`);
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
  expect(checkbox).toHaveStyle(`background: ${theme.colors.gray}`);
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
  expect(checkbox).toHaveStyle(`border-radius: ${theme.radii['small-1']}px`);
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
  expect(checkbox).toHaveStyle(`border-radius: ${theme.radii['small-1']}px`);
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
