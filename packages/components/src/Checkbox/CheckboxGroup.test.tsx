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
  },
  fontSizes: {
    'small-1': 12,
    'large-1': 24,
  },
  components: {
    Checkbox: {
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

test('label is optional', () => {
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

// pass down error?
