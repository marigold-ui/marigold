import React from 'react';
import { cva } from 'class-variance-authority';
import { OverlayProvider } from '@react-aria/overlays';
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';

import { Theme, ThemeProvider, useResponsiveValue } from '@marigold/system';

import { Select } from './Select';

const theme: Theme = {
  name: 'test',
  components: {
    Field: cva(''),
    Label: {
      container: cva('', {
        variants: {
          variant: { lime: 'text-lime-500' },
          size: { small: 'text-sm' },
        },
      }),
      indicator: cva(),
    },
    HelpText: cva('', {
      variants: {
        variant: { lime: 'text-lime-500' },
        size: { small: 'text-sm' },
      },
    }),
    Select: {
      select: cva('text-blue-500', {
        variants: {
          variant: { violet: 'text-violet-500' },
          size: { small: 'text-sm' },
        },
      }),
      icon: cva(),
    },
    Underlay: cva(),
    ListBox: {
      container: cva(),
      list: cva(),
      option: cva(),
      section: cva(),
      sectionTitle: cva(),
    },
  },
};

/**
 * We need to mock `matchMedia` because JSOM does not
 * implements it.
 */
const mockMatchMedia = (matches: string[]) =>
  jest.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));
afterEach(cleanup);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: () => {
    return {
      matches: false,

      addListener: () => {},
      removeListener: () => {},
    };
  },
});

test('renders a field (label, helptext, select)', () => {
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
    'screen and (min-width: 64em)',
  ]);

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
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
    'screen and (min-width: 64em)',
  ]);
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
        <Select label="Label" data-testid="select" onChange={spy}>
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

  expect(three).toHaveAttribute('aria-selected', 'true');
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

test('supports styling classnames with variants and sizes from theme', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select
          label="Label"
          data-testid="select"
          variant="violet"
          size="small"
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

  expect(button.className).toContain('text-violet-500');
  expect(button.className).toContain('text-sm');
});

test('set width via props', () => {
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select" width="200">
          <Select.Option key="one">one</Select.Option>
          <Select.Option key="two">two</Select.Option>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  // We need to query all, since there is also a label in the hidden select
  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Label')[0].parentElement;
  expect(container).toHaveStyle('width: 200');
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select" ref={ref}>
          <Select.Section title="Section 1">
            <Select.Option key="one">one</Select.Option>
            <Select.Option key="two">two</Select.Option>
          </Select.Section>
        </Select>
      </ThemeProvider>
    </OverlayProvider>
  );

  expect(ref.current).toBeInstanceOf(HTMLButtonElement);
});

test('renders as tray', () => {
  const ref = React.createRef<HTMLButtonElement>();

  let resize: Function;
  window.addEventListener = jest.fn().mockImplementation((event, cb) => {
    if (event === 'resize') resize = cb;
  });

  const { result } = renderHook(() =>
    useResponsiveValue(['one', 'two', 'three', 'four'])
  );
  window.matchMedia = mockMatchMedia([]);
  act(() => resize());

  expect(result.current).toEqual('one');

  render(
    <OverlayProvider>
      <ThemeProvider theme={theme}>
        <Select label="Label" data-testid="select" ref={ref}>
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
  const tray = screen.getByTestId('tray');
  expect(tray).toBeInTheDocument();
});
