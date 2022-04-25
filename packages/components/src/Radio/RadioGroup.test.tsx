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

// error
// default value
// value (controlled)
// orientation?
