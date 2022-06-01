import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Radio } from '.';
import { ThemeProvider } from '@marigold/system';

const theme = {
  colors: {
    gray: '#868e96',
    blue: '#a5d8ff',
    teal: '#099268',
    green: '#2b8a3e',
    red: '#c92a2a',
  },
  fontSizes: {
    'small-1': 12,
    'large-1': 24,
  },
  radii: {
    none: 0,
    'large-1': '9999px',
  },
  components: {
    Radio: {
      base: {
        label: {
          fontSize: 'small-1',
        },
        radio: {
          borderRadius: 'large-1',
          '&:focus': {
            outline: '1px solid',
            outlineColor: 'blue',
          },
          '&:checked': {
            color: 'teal',
          },
          '&:disabled': {
            bg: 'gray',
          },
          '&:read-only': {
            opacity: 0.5,
          },
          '&:error': {
            bg: 'red',
          },
        },
      },
      variant: {
        green: {
          label: {
            color: 'green',
          },
          radio: {
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
          radio: {
            width: 32,
            height: 32,
          },
        },
      },
    },
    RadioGroup: {
      base: {
        container: {
          bg: 'gray',
        },
        group: {
          fontStyle: 'italic',

          '&[data-orientation="horizontal"]': {
            gap: '3ch',
          },
        },
      },
      variant: {
        green: {
          container: {
            bg: 'green',
          },
        },
      },
      size: {
        large: {
          group: {
            fontSize: 'large-1',
          },
        },
      },
    },
  },
};

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

  const container = screen.getByRole('radiogroup');
  expect(container).toHaveStyle(`background: ${theme.colors.gray}`);

  const group = screen.getByRole('presentation');
  expect(group).toHaveStyle(`font-style: italic`);
});

test('supports styling via variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label" variant="green" size="large">
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

  const container = screen.getByRole('radiogroup');
  expect(container).toHaveStyle(`background: ${theme.colors.green}`);

  const group = screen.getByRole('presentation');
  expect(group).toHaveStyle(`font-size: ${theme.fontSizes['large-1']}px`);
});

test('support vertical orientation by default', () => {
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

  const group = screen.getByRole('presentation');
  expect(group).toHaveAttribute('data-orientation', 'vertical');
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

  const group = screen.getByRole('presentation');
  expect(group).toHaveAttribute('data-orientation', 'horizontal');

  expect(group).toHaveStyle(`gap: 3ch;`);
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
  expect(radio).toHaveStyle(`background: ${theme.colors.red}`);
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
  expect(checkedRadio).toHaveStyle(`color: ${theme.colors.teal}`);
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
  expect(checkedRadio).toHaveStyle(`color: ${theme.colors.teal}`);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('1');
});

// orientation?
