import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const theme = {
  colors: {
    gray: '#868e96',
    white: '#f8f9fa',
    teal: '#099268',
    red: '#c92a2a',
  },
  fontSizes: {
    'small-1': 12,
    'large-1': 24,
  },
  components: {
    Checkbox: {
      base: {
        label: {
          '&:error': {
            bg: 'red',
          },
        },
      },
      variant: {
        teal: {
          label: {
            color: 'teal',
          },
        },
      },
      size: {
        large: {
          fontSize: 'small-1',
        },
      },
    },
    CheckboxGroup: {
      base: {
        container: {
          bg: 'gray',
        },
        group: {
          fontStyle: 'italic',
        },
      },
      variant: {
        teal: {
          container: {
            bg: 'white',
          },
        },
      },
      size: {
        large: {
          container: {
            fontSize: 'large-1',
          },
        },
      },
    },
  },
};

test('renders label and group of checkboxes', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes">
      <Checkbox value="one">one</Checkbox>
      <Checkbox value="two">two</Checkbox>
      <Checkbox value="three">three</Checkbox>
    </CheckboxGroup>
  );

  expect(screen.getByText('Group of Checkboxes')).toBeInTheDocument();
  expect(screen.getByText('one')).toBeInTheDocument();
  expect(screen.getByText('two')).toBeInTheDocument();
  expect(screen.getByText('three')).toBeInTheDocument();
});

test('label is optional (can use aria-label instead)', () => {
  render(
    <CheckboxGroup aria-label="Aria Label">
      <Checkbox value="one">one</Checkbox>
      <Checkbox value="two">two</Checkbox>
      <Checkbox value="three">three</Checkbox>
    </CheckboxGroup>
  );

  expect(screen.queryByText('Group of Checkboxes')).not.toBeInTheDocument();
  expect(screen.getByText('one')).toBeInTheDocument();
  expect(screen.getByText('two')).toBeInTheDocument();
  expect(screen.getByText('three')).toBeInTheDocument();
});

test('passes down "disabled" to checkboxes', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes" disabled>
      <Checkbox value="one" data-testid="one">
        one
      </Checkbox>
      <Checkbox value="two" data-testid="two">
        two
      </Checkbox>
      <Checkbox value="three" data-testid="three">
        three
      </Checkbox>
    </CheckboxGroup>
  );

  expect(screen.getByTestId('one')).toBeDisabled();
  expect(screen.getByTestId('two')).toBeDisabled();
  expect(screen.getByTestId('three')).toBeDisabled();
});

test('passes down "read-only" to checkboxes', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes" readOnly>
      <Checkbox value="one" data-testid="one">
        one
      </Checkbox>
      <Checkbox value="two" data-testid="two">
        two
      </Checkbox>
      <Checkbox value="three" data-testid="three">
        three
      </Checkbox>
    </CheckboxGroup>
  );

  expect(screen.getByTestId('one')).toHaveAttribute('aria-readonly', 'true');
  expect(screen.getByTestId('two')).toHaveAttribute('aria-readonly', 'true');
  expect(screen.getByTestId('three')).toHaveAttribute('aria-readonly', 'true');
});

test('passes down "error" to checkboxes', () => {
  render(
    <ThemeProvider theme={theme}>
      <CheckboxGroup label="Group of Checkboxes" error>
        <Checkbox value="one" data-testid="one">
          one
        </Checkbox>
        <Checkbox value="two" data-testid="two">
          two
        </Checkbox>
        <Checkbox value="three" data-testid="three">
          three
        </Checkbox>
      </CheckboxGroup>
    </ThemeProvider>
  );

  expect(screen.getByText('one')).toHaveStyle(
    `background: ${theme.colors.red}`
  );
  expect(screen.getByText('two')).toHaveStyle(
    `background: ${theme.colors.red}`
  );
  expect(screen.getByText('three')).toHaveStyle(
    `background: ${theme.colors.red}`
  );
});
