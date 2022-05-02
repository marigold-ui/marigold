import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '@marigold/system';

import { Select } from './Select';

const theme = {
  colors: {
    black: '#212529',
    gray: '#868e96',
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
          button: {
            color: 'violet',
          },
        },
      },
      size: {
        medium: {
          button: {
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

  const two = within(options).getByText('two');
  fireEvent.click(two);

  expect(options).not.toBeVisible();
  expect(button).toHaveAttribute('aria-expanded', 'false');
});

test('selected option is displayed in button', () => {
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

  const one = within(options).getByText('one');
  fireEvent.click(one);

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

test('allows to disable select', () => {
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

test('allows to disable options', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select" disabledKeys={['two']}>
          <Select.Option key="one">one</Select.Option>
          <Select.Option key="two">two</Select.Option>
          <Select.Option key="three">three</Select.Option>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByTestId('select');
  fireEvent.click(button);

  const options = screen.getByRole('listbox');
  const two = within(options).getByText('two');

  expect(two).toHaveAttribute('aria-disabled', 'true');
});

test('allows select to be required', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select" required>
          <Select.Option key="one">one</Select.Option>
          <Select.Option key="two">two</Select.Option>
          <Select.Option key="three">three</Select.Option>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const label = screen.getAllByText('Label')[0].parentElement!;
  const requiredIcon = within(label).getByRole('presentation');
  expect(requiredIcon).toBeInTheDocument();
});

test('controlled', () => {
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

  const options = screen.getByRole('listbox');
  const three = within(options).getByText('three');
  fireEvent.click(three);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith('three');
});

test('supports default value via "defaultSelectedKey"', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select" defaultSelectedKey="three">
          <Select.Option key="one">one</Select.Option>
          <Select.Option key="two">two</Select.Option>
          <Select.Option key="three">three</Select.Option>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByTestId('select');
  expect(button).toHaveTextContent(/three/);

  fireEvent.click(button);

  const options = screen.getByRole('listbox');
  const three = within(options).getByText('three');

  expect(three).toHaveStyle(`background: ${theme.colors.lime}`);
});

test('supports sections', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select">
          <Select.Section title="Section 1">
            <Select.Option key="one">one</Select.Option>
            <Select.Option key="two">two</Select.Option>
          </Select.Section>
          <Select.Section title="Section 2">
            <Select.Option key="three">three</Select.Option>
            <Select.Option key="four">four</Select.Option>
          </Select.Section>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByTestId('select');
  fireEvent.click(button);

  const options = screen.getByRole('listbox');
  const sectionOne = within(options).getByText('Section 1');
  const sectionTwo = within(options).getByText('Section 2');

  expect(sectionOne).toBeVisible();
  expect(sectionTwo).toBeVisible();
});

test('supports styling with variants and sizes from theme', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select
          label="Label"
          data-testid="select"
          variant="violet"
          size="medium"
        >
          <Select.Section title="Section 1">
            <Select.Option key="one">one</Select.Option>
            <Select.Option key="two">two</Select.Option>
          </Select.Section>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByTestId('select');
  expect(button).toHaveStyle(`color: ${theme.colors.violet}`);
  expect(button).toHaveStyle(`font-size: ${theme.fontSizes['medium-1']}px`);
  fireEvent.click(button);

  const options = screen.getByRole('listbox');

  const one = within(options).getByText('one');
  expect(one).toHaveStyle(`color: ${theme.colors.violet}`);

  const section = within(options).getByText('Section 1');
  expect(section).toHaveStyle(`font-size: ${theme.fontSizes['medium-1']}px`);
});

test('supports focus styling for button', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select">
          <Select.Section title="Section 1">
            <Select.Option key="one">one</Select.Option>
            <Select.Option key="two">two</Select.Option>
          </Select.Section>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByTestId('select');
  userEvent.tab();

  expect(button).toHaveStyle(`border-color: ${theme.colors.blue}`);
});

test('supports styling when select is open', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select">
          <Select.Section title="Section 1">
            <Select.Option key="one">one</Select.Option>
            <Select.Option key="two">two</Select.Option>
          </Select.Section>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByTestId('select');
  userEvent.tab();
  userEvent.keyboard('[ArrowDown]');

  expect(button).toHaveStyle(`border-color: ${theme.colors.gray}`);
});

test('supports styling error state', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select" error>
          <Select.Section title="Section 1">
            <Select.Option key="one">one</Select.Option>
            <Select.Option key="two">two</Select.Option>
          </Select.Section>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByTestId('select');
  expect(button).toHaveStyle(`border-color: ${theme.colors.error}`);
});

test('supports styling disabled state', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select" disabled>
          <Select.Section title="Section 1">
            <Select.Option key="one">one</Select.Option>
            <Select.Option key="two">two</Select.Option>
          </Select.Section>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByTestId('select');
  expect(button).toHaveStyle(`color: ${theme.colors.disabled}`);
});

test('supports styling selected option', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select" defaultSelectedKey="one">
          <Select.Section title="Section 1">
            <Select.Option key="one">one</Select.Option>
            <Select.Option key="two">two</Select.Option>
          </Select.Section>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByTestId('select');
  fireEvent.click(button);

  const options = screen.getByRole('listbox');
  const one = within(options).getByText('one');

  expect(one).toHaveStyle(`background: ${theme.colors.lime}`);
});

test('supports styling disabled option', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select" disabledKeys={['two']}>
          <Select.Section title="Section 1">
            <Select.Option key="one">one</Select.Option>
            <Select.Option key="two">two</Select.Option>
          </Select.Section>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  const button = screen.getByTestId('select');
  fireEvent.click(button);

  const options = screen.getByRole('listbox');
  const two = within(options).getByText('two');

  expect(two).toHaveStyle(`color: ${theme.colors.disabled}`);
});

// FIXME: We currently have no easy way to test the focus + hover styling
