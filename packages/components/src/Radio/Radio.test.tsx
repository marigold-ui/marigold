import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { Theme, ThemeProvider, cva } from '@marigold/system';

import { setup } from '../test.utils';
import { Radio } from './_Radio';

const theme: Theme = {
  name: 'test',
  components: {
    Field: cva(),
    Label: {
      container: cva(),
      indicator: cva(),
    },
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
    Radio: {
      container: cva('', {
        variants: {
          variant: {
            green: 'text-green-800',
          },
          size: {
            large: 'p-9',
          },
        },
      }),
      radio: cva('rounded border-solid checked:text-blue-700'),
      label: cva('text-base'),
      group: cva(),
    },
  },
};

const { render } = setup({ theme });

// There is no real accesible way to get to the element that acts as radio
const getVisibleRadios = () => {
  const label = screen.getByText('With Label');
  // eslint-disable-next-line testing-library/no-node-access
  return label.parentElement?.querySelectorAll('[aria-hidden="true"]');
};

// Tests
// ---------------
test('allows styling via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1">
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
        <Radio value="3" data-testid="radio-3">
          Option 3
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );

  const radioLabel = screen.getByText('Option 1');
  expect(radioLabel.className).toMatchInlineSnapshot(`"text-base"`);

  const radio = getVisibleRadios()?.[0];
  expect(radio?.className).toMatchInlineSnapshot(
    `"bg-secondary-50 flex h-4 w-4 items-center justify-center border p-1 rounded border-solid checked:text-blue-700"`
  );
});

test('supports styling via variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1" variant="green" size="large">
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2" variant="green" size="large">
          Option 2
        </Radio>
        <Radio value="3" data-testid="radio-3" variant="green" size="large">
          Option 3
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );

  const radioLabel = screen.getByText('Option 1');
  expect(radioLabel.className).toMatchInlineSnapshot(`"text-base"`);

  fireEvent.click(screen.getByTestId('radio-1'));

  const radio = getVisibleRadios()?.[0];
  expect(radio?.className).toMatchInlineSnapshot(
    `"bg-secondary-50 flex h-4 w-4 items-center justify-center border p-1 rounded border-solid checked:text-blue-700"`
  );
});

test('variant and size styling on radio option', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1">
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2" variant="green" size="large">
          Option 2
        </Radio>
        <Radio value="3" data-testid="radio-3">
          Option 3
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );

  // 1st option has no variant / size
  const radioLabelOne = screen.getByText('Option 1');
  expect(radioLabelOne.className).toMatchInlineSnapshot(`"text-base"`);

  fireEvent.click(screen.getByTestId('radio-1'));

  const radioOne = getVisibleRadios()?.[0];
  expect(radioOne?.className).toMatchInlineSnapshot(
    `"bg-secondary-50 flex h-4 w-4 items-center justify-center border p-1 rounded border-solid checked:text-blue-700"`
  );

  // 2nd option has variant / size
  const radioLabelTwo = screen.getByText('Option 2');
  expect(radioLabelTwo.className).toMatchInlineSnapshot(`"text-base"`);

  fireEvent.click(screen.getByTestId('radio-2'));

  const radio = getVisibleRadios()?.[1];
  expect(radio?.className).toMatchInlineSnapshot(
    `"bg-secondary-50 flex h-4 w-4 items-center justify-center border p-1 rounded border-solid checked:text-blue-700"`
  );
});

test('takes full width by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1">
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const containerOne = screen.getByTestId('radio-1').parentElement;
  expect(containerOne).toHaveClass(`w-full`);
});

test('set width via prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1" width="200px">
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const containerOne = screen.getByTestId('radio-1').parentElement;
  expect(containerOne).toHaveClass(`200px`);
});

test('allows styling "checked" state via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1">
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
        <Radio value="3" data-testid="radio-3">
          Option 3
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );

  fireEvent.click(screen.getByTestId('radio-1'));

  const radio = getVisibleRadios()?.[0];
  expect(radio?.className).toMatchInlineSnapshot(
    `"bg-secondary-50 flex h-4 w-4 items-center justify-center border p-1 rounded border-solid checked:text-blue-700"`
  );
});

test('allows styling "focus" state via theme', async () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1">
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
        <Radio value="3" data-testid="radio-3">
          Option 3
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );
  const input = screen.getByTestId('radio-1');

  const radio = await waitFor(() => getVisibleRadios()?.[0]);
  act(() => {
    input.focus();
  });
  expect(radio?.className).toMatchInlineSnapshot(
    `"bg-secondary-50 flex h-4 w-4 items-center justify-center border p-1 rounded border-solid checked:text-blue-700"`
  );
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLInputElement>();
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1" ref={ref}>
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );

  expect(ref.current).toBeInstanceOf(HTMLInputElement);
});

test('radio accepts helptext', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label" description="This is my Helptext.">
        <Radio value="1" data-testid="radio-1">
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );
  expect(screen.getByText('This is my Helptext.')).toBeInTheDocument();
});

test('radio accepts error message', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group
        label="With Label"
        error
        errorMessage="This is my error message"
      >
        <Radio value="1" data-testid="radio-1">
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );
  expect(screen.getByText('This is my error message')).toBeInTheDocument();
});

test('disabled prop and styles', () => {
  const ref = React.createRef<HTMLInputElement>();
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1" ref={ref} disabled>
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );

  const radio1 = screen.getByTestId('radio-1');

  expect(radio1).toHaveAttribute('disabled');
  expect(radio1.className).toMatchInlineSnapshot(
    `"absolute left-0 top-0 z-[1] h-full w-full opacity-[0.0001] cursor-not-allowed"`
  );
});
