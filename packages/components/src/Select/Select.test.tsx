import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '@marigold/system';

import { Select } from './Select';

const theme = {
  colors: {
    black: '#212529',
    grey: '#868e96',
    blue: '#339af0',
    lime: '#82c91e',
    violet: '#6741d9',
    error: '#c92a2a',
    disabled: '#ced4da',
  },
  fontSizes: {
    'small-1': 14,
    'medium-1': 18,
  },
  components: {
    Label: {
      base: {
        color: 'black',
      },
      variant: {
        lime: {
          color: 'lime',
        },
      },
      size: {
        small: {
          fontSize: 'small-1',
        },
      },
    },
    HelpText: {
      base: {
        color: 'black',
      },
      variant: {
        lime: {
          container: {
            color: 'lime',
          },
        },
      },
      size: {
        small: {
          container: {
            fontSize: 'small-1',
          },
        },
      },
    },
    Select: {
      base: {
        button: {
          color: 'black',
          '&:hover': {
            borderColor: 'lime',
          },
          '&:disabled': {
            color: 'disabled',
          },
          '&:focus-visible': {
            borderColor: 'blue',
          },
          '&:expanded': {
            borderColor: 'gray',
          },
          '&:error': {
            borderColor: 'error',
          },
        },
      },
      variant: {
        violet: {
          base: {
            color: 'violet',
          },
        },
      },
      size: {
        medium: {
          base: {
            fontSize: 'medium-1',
          },
        },
      },
    },
    ListBox: {
      base: {
        option: {
          color: 'black',
          '&:focus': {
            bg: 'blue',
          },
          '&:selected': {
            bg: 'lime',
          },
          '&:disabled': {
            color: 'disabled',
          },
        },
        sectionTitle: {
          fontSize: 'small-1',
        },
      },
      variant: {
        violet: {
          option: {
            color: 'violet',
          },
        },
      },
      size: {
        medium: {
          sectionTitle: {
            fontSize: 'medium-1',
          },
        },
      },
    },
  },
};

test('renders a field (label, helptext, select)', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select
          label="Label"
          description="Description"
          errorMessage="ERRR!"
          data-testid="select"
        >
          <Select.Option key="one">one</Select.Option>
          <Select.Option key="two">two</Select.Option>
          <Select.Option key="three">three</Select.Option>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  // We need to query all, since there is also a label in the hidden select
  const label = screen.queryAllByText('Label')[0];
  expect(label).toBeInTheDocument();

  const description = screen.queryByText('Description');
  expect(description).toBeInTheDocument();

  const errorMessage = screen.queryByText('ERRR!');
  expect(errorMessage).not.toBeInTheDocument();

  const button = screen.queryByTestId('select');
  expect(button).toBeInTheDocument();
});

test('visible label is not a <label> element (for a11y)', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label">
          <Select.Option key="one">one</Select.Option>
          <Select.Option key="two">two</Select.Option>
          <Select.Option key="three">three</Select.Option>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  const labels = screen.queryAllByText('Label');

  expect(labels.length).toEqual(2);
  expect(labels[0]).toBeInstanceOf(HTMLSpanElement);
  expect(labels[1]).toBeInstanceOf(HTMLLabelElement);
});

test('default placeholder is rendered', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" placeholder="placeholder" data-testid="select">
          <Select.Option key="one">one</Select.Option>
          <Select.Option key="two">two</Select.Option>
          <Select.Option key="three">three</Select.Option>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByTestId('select');
  expect(button).toHaveTextContent(/placeholder/);
});

test('custom placeholder is rendered', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" placeholder="Select me" data-testid="select">
          <Select.Option key="one">one</Select.Option>
          <Select.Option key="two">two</Select.Option>
          <Select.Option key="three">three</Select.Option>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByTestId('select');
  expect(button).toHaveTextContent(/Select me/);
});

test('option list opens when button is clicked', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select">
          <Select.Option key="one">one</Select.Option>
          <Select.Option key="two">two</Select.Option>
          <Select.Option key="three">three</Select.Option>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );
  const button = screen.getByTestId('select');

  expect(button).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(button);

  const options = screen.getByRole('listbox');
  expect(options).toBeVisible();
  expect(button).toHaveAttribute('aria-expanded', 'true');
});

test('option list closes when button is clicked', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select">
          <Select.Option key="one">one</Select.Option>
          <Select.Option key="two">two</Select.Option>
          <Select.Option key="three">three</Select.Option>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );
  const button = screen.getByTestId('select');
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');

  const options = screen.getByRole('listbox');
  expect(options).toBeVisible();

  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'false');
  expect(options).not.toBeVisible();
});

test('supports to select an option and closes listbox afterwards', () => {
  const spy = jest.fn();
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select" onSelectionChange={spy}>
          <Select.Option key="one">one</Select.Option>
          <Select.Option key="two">two</Select.Option>
          <Select.Option key="three">three</Select.Option>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );
  const button = screen.getByTestId('select');
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');

  const options = screen.getByRole('listbox');
  expect(options).toBeVisible();

  const two = within(options).getByText('two');
  fireEvent.click(two);

  expect(spy).toHaveBeenCalledWith('two');

  expect(options).not.toBeVisible();
  expect(button).toHaveAttribute('aria-expanded', 'false');
});

test('selected option is displayed in button', () => {
  const spy = jest.fn();
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select" onSelectionChange={spy}>
          <Select.Option key="one">one</Select.Option>
          <Select.Option key="two">two</Select.Option>
          <Select.Option key="three">three</Select.Option>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );
  const button = screen.getByTestId('select');
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');

  const options = screen.getByRole('listbox');
  expect(options).toBeVisible();

  const one = within(options).getByText('one');
  fireEvent.click(one);

  expect(spy).toHaveBeenCalledWith('one');

  expect(button).toHaveAttribute('aria-expanded', 'false');
  expect(button).toHaveTextContent(/one/);
});

test('dismiss when clicking escape', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select">
          <Select.Option key="one">one</Select.Option>
          <Select.Option key="two">two</Select.Option>
          <Select.Option key="three">three</Select.Option>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );
  const button = screen.getByTestId('select');
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');

  const options = screen.getByRole('listbox');
  expect(options).toBeVisible();
  userEvent.type(button, '{esc}');
});

test.only('disable select', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select" disabled>
          <Select.Option key="one">one</Select.Option>
          <Select.Option key="two">two</Select.Option>
          <Select.Option key="three">three</Select.Option>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );
  const button = screen.getByTestId('select');
  expect(button).toBeDisabled();

  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'false');
});

// controlled (onSelectionChange)
// uncontrolled -> supports "defaultSelectedKey"
// supports required
// disabled options (disabledKeys)
// error (aria-invalid) .. if we can find the <select>
// supports sections

// styling + variant + size
// button style + hover, focus, expanded, error, disabled
// option style + hover, focus, selected
