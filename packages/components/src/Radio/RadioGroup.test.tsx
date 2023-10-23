import { fireEvent, screen } from '@testing-library/react';

import { Theme, ThemeProvider, cva } from '@marigold/system';

import { Radio } from '.';
import { setup } from '../test.utils';

const theme: Theme = {
  name: 'test',
  components: {
    Field: cva(),
    Label: {
      container: cva(),
      indicator: cva(),
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
      group: cva('pt-4'),
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
test('renders label(s) and (hidden) radio', () => {
  render(
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
  );

  const label = screen.queryByText('With Label');
  expect(label).toBeInTheDocument();

  const radios = screen.queryAllByTestId(/radio/);
  expect(radios).toHaveLength(3);

  expect(screen.getByText('Option 1')).toBeInTheDocument();
  expect(screen.getByText('Option 2')).toBeInTheDocument();
  expect(screen.getByText('Option 3')).toBeInTheDocument();
});

test('applies group styles from theme', () => {
  render(
    <Radio.Group aria-label="With Label">
      <Radio value="1" data-testid="radio-1">
        Option 1
      </Radio>
      <Radio value="2" data-testid="radio-2">
        Option 2
      </Radio>
    </Radio.Group>
  );

  const group = screen.getByRole('presentation');
  expect(group.className).toContain('pt-4');
});

test('label is optional (can use aria-label instead)', () => {
  render(
    <Radio.Group aria-label="With Label">
      <Radio value="1" data-testid="radio-1">
        Option 1
      </Radio>
      <Radio value="2" data-testid="radio-2">
        Option 2
      </Radio>
    </Radio.Group>
  );

  expect(screen.queryByText('With Label')).not.toBeInTheDocument();
});

test('support vertical orientation by default', () => {
  render(
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
  );

  const group = screen.getByRole('radiogroup');
  expect(group).toHaveAttribute('aria-orientation', 'vertical');
});

test('support horizontal orientation', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label" orientation="horizontal">
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

  // eslint-disable-next-line testing-library/no-node-access
  const group = screen.getByLabelText('With Label').lastChild;

  expect(group).toHaveAttribute('data-orientation', 'horizontal');
});

test('supports error styling via theme & passes down error', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label" error>
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

  // Note that there is no error styling for the container and group yet!
  const radio = getVisibleRadios()?.[0];
  expect(radio?.className).toMatchInlineSnapshot(
    `"bg-secondary-50 flex h-4 w-4 items-center justify-center border p-1 rounded border-solid checked:text-blue-700"`
  );
});

test('supports default value (uncontrolled)', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label" defaultValue="3">
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

  const checkedRadio = getVisibleRadios()?.[2];
  expect(checkedRadio?.className).toMatchInlineSnapshot(
    `"bg-secondary-50 flex h-4 w-4 items-center justify-center border p-1 rounded border-solid checked:text-blue-700"`
  );
});

test('controlled', () => {
  const onChange = jest.fn();

  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label" onChange={onChange}>
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

  fireEvent.click(getVisibleRadios()?.[0]!);

  const checkedRadio = getVisibleRadios()?.[0];
  expect(checkedRadio?.className).toMatchInlineSnapshot(
    `"bg-secondary-50 flex h-4 w-4 items-center justify-center border p-1 rounded border-solid checked:text-blue-700"`
  );

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('1');
});
