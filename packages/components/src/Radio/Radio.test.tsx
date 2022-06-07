import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Radio } from './Radio';
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
  sizes: {
    none: 0,
    'large-1': 100,
    'huge-1': 200,
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
  expect(radioLabel).toHaveStyle(`font-size: ${theme.fontSizes['small-1']}px`);

  const radio = getVisibleRadios()?.[0];
  expect(radio).toHaveStyle(`border-radius: ${theme.radii['large-1']}`);
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

  const radioLabel = screen.getByText('Option 1');
  expect(radioLabel).toHaveStyle(`color: ${theme.colors.green}`);
  expect(radioLabel).toHaveStyle(`font-size: ${theme.fontSizes['large-1']}px`);

  fireEvent.click(screen.getByTestId('radio-1'));

  const radio = getVisibleRadios()?.[0];
  expect(radio).toHaveStyle(`color: ${theme.colors.green}`);
  expect(radio).toHaveStyle(`width: 32px`);
  expect(radio).toHaveStyle(`height: 32px`);
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
  expect(radioLabelOne).not.toHaveStyle(`color: ${theme.colors.green}`);
  expect(radioLabelOne).not.toHaveStyle(
    `font-size: ${theme.fontSizes['large-1']}px`
  );

  fireEvent.click(screen.getByTestId('radio-1'));

  const radioOne = getVisibleRadios()?.[0];
  expect(radioOne).not.toHaveStyle(`color: ${theme.colors.green}`);
  expect(radioOne).not.toHaveStyle(`width: 32px`);
  expect(radioOne).not.toHaveStyle(`height: 32px`);

  // 2nd option has variant / size
  const radioLabelTwo = screen.getByText('Option 2');
  expect(radioLabelTwo).toHaveStyle(`color: ${theme.colors.green}`);
  expect(radioLabelTwo).toHaveStyle(
    `font-size: ${theme.fontSizes['large-1']}px`
  );

  fireEvent.click(screen.getByTestId('radio-2'));

  const radio = getVisibleRadios()?.[1];
  expect(radio).toHaveStyle(`color: ${theme.colors.green}`);
  expect(radio).toHaveStyle(`width: 32px`);
  expect(radio).toHaveStyle(`height: 32px`);
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
  expect(containerOne).toHaveStyle('width: 100%');
});

test('set width via prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1" width="large-1">
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
  expect(containerOne).toHaveStyle(`width: ${theme.sizes['large-1']}px`);
});

test('set width via prop in group', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label" width="huge-1">
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
  expect(containerOne).toHaveStyle(`width: ${theme.sizes['huge-1']}px`);

  // eslint-disable-next-line testing-library/no-node-access
  const containerTwo = screen.getByTestId('radio-2').parentElement;
  expect(containerTwo).toHaveStyle(`width: ${theme.sizes['huge-1']}px`);
});

test('width can be overriden locally', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label" width="huge-1">
        <Radio value="1" data-testid="radio-1" width="large-1">
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
  expect(containerOne).toHaveStyle(`width: ${theme.sizes['large-1']}px`);

  // eslint-disable-next-line testing-library/no-node-access
  const containerTwo = screen.getByTestId('radio-2').parentElement;
  expect(containerTwo).toHaveStyle(`width: ${theme.sizes['huge-1']}px`);
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
  expect(radio).toHaveStyle(`color: ${theme.colors.teal}`);
});

test('allows styling "focus" state via theme', () => {
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
  input.focus();

  const radio = getVisibleRadios()?.[0];
  expect(radio).toHaveStyle(`outline: 1px solid`);
  expect(radio).toHaveStyle(`outline-color: ${theme.colors.blue}`);
});

test('allows styling "disabled" state via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1" disabled>
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
  const radio = getVisibleRadios()?.[0];
  expect(radio).toHaveStyle(`background: ${theme.colors.gray}`);
});

test('allows styling "read-only" state via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1" readOnly>
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
  const radio = getVisibleRadios()?.[0];
  expect(radio).toHaveStyle(`opacity: 0.5`);
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
