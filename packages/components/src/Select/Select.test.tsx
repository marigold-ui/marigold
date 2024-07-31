import {
  act,
  fireEvent,
  renderHook,
  screen,
  within,
} from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Theme, cva, useSmallScreen } from '@marigold/system';
import { Header } from '../Header';
import { setup } from '../test.utils';
import { Select } from './Select';

// Setup
// ---------------
const user = userEvent.setup();

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
    Popover: cva(['mt-0.5'], {
      variants: {
        variant: {
          top: ['mb-0.5'],
        },
      },
    }),
    Header: cva('text-xl'),
    HelpText: {
      container: cva('', {
        variants: {
          variant: {
            lime: 'text-lime-600',
          },
          size: {
            small: 'text-sm',
          },
        },
      }),
      icon: cva(''),
    },
    Select: {
      select: cva('text-blue-500', {
        variants: {
          variant: { violet: 'text-violet-500' },
          size: { small: 'text-sm' },
        },
      }),
      icon: cva('text-zinc-600'),
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

const { render } = setup({ theme });

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
    <Select
      label="Label"
      description="Description"
      errorMessage="ERRR!"
      data-testid="select"
    >
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
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
    <Select label="Label">
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
  );

  const labels = screen.queryAllByText('Label');
  expect(labels.length).toEqual(1);
});

test('default placeholder is rendered', () => {
  render(
    <Select label="Label" placeholder="placeholder" data-testid="select">
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
  );

  const button = screen.getByRole('button');
  expect(button).toHaveTextContent(/placeholder/);
});

test('custom placeholder is rendered', () => {
  render(
    <Select label="Label" placeholder="Select me" data-testid="select">
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
  );

  const button = screen.getByRole('button');
  expect(button).toHaveTextContent(/Select me/);
});

test('option list opens when button is clicked', () => {
  render(
    <Select label="Label">
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
  );
  const button = screen.getByRole('button');

  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(button);
  const options = screen.getByRole('listbox');
  expect(options).toBeVisible();
  expect(button).toHaveAttribute('aria-expanded', 'true');
});

test('option list closes when button is clicked', async () => {
  render(
    <Select data-testid="select-id">
      <Select.Option id="Harry Potter">Harry Potter</Select.Option>
      <Select.Option id="Lord of the Rings">Lord of the Rings</Select.Option>
      <Select.Option id="Star Wars">Star Wars</Select.Option>
      <Select.Option id="Star Trek">Star Trek</Select.Option>
      <Select.Option id="Firefly">Firefly</Select.Option>
    </Select>
  );
  const button = screen.getByRole('button');

  await user.click(button);
  expect(button).toHaveAttribute('aria-expanded');

  const options = screen.getByRole('listbox');
  expect(options).toBeVisible();

  await user.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'false');
  expect(options).not.toBeVisible();
});

test('supports to select an option and closes listbox afterwards', () => {
  window.matchMedia = mockMatchMedia(['screen and (min-width: 600px)']);
  render(
    <Select label="Label" data-testid="select">
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
  );
  const button = screen.getByRole('button');
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
    <Select label="Label" data-testid="select">
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
  );
  const button = screen.getByRole('button');
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
    <Select label="Label" data-testid="select">
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
  );
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');

  const options = screen.getByRole('listbox');
  expect(options).toBeVisible();
  userEvent.type(button, '{esc}');
});

test('allows to disable select', () => {
  render(
    <Select label="Label" data-testid="select" disabled>
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
  );
  const button = screen.getByRole('button');
  expect(button).toBeDisabled();

  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'false');
});

test('allows to disable options', () => {
  render(
    <Select label="Label" data-testid="select" disabledKeys={['two']}>
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
  );

  const button = screen.getByRole('button');
  fireEvent.click(button);

  const options = screen.getByRole('listbox');
  const two = within(options).getByText('two');

  expect(two).toHaveAttribute('aria-disabled', 'true');
});

test('allows select to be required', () => {
  render(
    <Select label="Label" data-testid="select" required>
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const label = screen.getAllByText('Label')[0].parentElement!;
  const requiredIcon = within(label).getByRole('presentation');
  expect(requiredIcon).toBeInTheDocument();
});

test('controlled', () => {
  const spy = jest.fn();
  render(
    <Select label="Label" data-testid="select" onChange={spy}>
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
  );

  const button = screen.getByRole('button');
  fireEvent.click(button);

  const options = screen.getByRole('listbox');
  const three = within(options).getByText('three');
  fireEvent.click(three);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith('three');
});

test('supports default value via "defaultSelectedKey"', () => {
  render(
    <Select label="Label" data-testid="select" defaultSelectedKey="three">
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
  );

  const button = screen.getByRole('button');
  expect(button).toHaveTextContent(/three/);

  fireEvent.click(button);

  const options = screen.getByRole('listbox');
  const three = within(options).getByText('three');

  expect(three).toHaveAttribute('aria-selected', 'true');
});

test('supports sections', () => {
  render(
    <Select label="Label" data-testid="select">
      <Select.Section>
        <Header>Section 1</Header>
        <Select.Option id="one">one</Select.Option>
        <Select.Option id="two">two</Select.Option>
      </Select.Section>
      <Select.Section>
        <Header>Section 2</Header>
        <Select.Option id="three">three</Select.Option>
        <Select.Option id="four">four</Select.Option>
      </Select.Section>
    </Select>
  );

  const button = screen.getByRole('button');
  fireEvent.click(button);

  const options = screen.getByRole('listbox');
  const sectionOne = within(options).getByText('Section 1');
  const sectionTwo = within(options).getByText('Section 2');

  expect(sectionOne).toBeVisible();
  expect(sectionTwo).toBeVisible();
});

test('supports styling classnames with variants and sizes from theme', () => {
  render(
    <Select label="Label" data-testid="select" variant="violet" size="small">
      <Select.Section>
        <Header>Section 1</Header>
        <Select.Option id="one">one</Select.Option>
        <Select.Option id="two">two</Select.Option>
      </Select.Section>
    </Select>
  );

  const button = screen.getByRole('button');

  expect(button.className).toContain('text-violet-500');
  expect(button.className).toContain('text-sm');
});

test('supports applying styles to the caret icon', () => {
  render(
    <Select label="Label" data-testid="select">
      <Select.Section>
        <Select.Option id="one">one</Select.Option>
        <Select.Option id="two">two</Select.Option>
      </Select.Section>
    </Select>
  );

  const button = screen.getByRole('button');
  // eslint-disable-next-line testing-library/no-node-access
  const icon = button.querySelector('svg');

  expect(icon).toHaveClass('text-zinc-600');
});

test('set width via props', () => {
  render(
    <Select label="Label" data-testid="select" width="1/2">
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
    </Select>
  );

  // We need to query all, since there is also a label in the hidden select
  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Label')[0].parentElement;
  expect(container?.className).toMatchInlineSnapshot(`"group/field w-1/2"`);
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(
    <Select label="Label" data-testid="select" ref={ref as any}>
      <Select.Section>
        <Header>Section 1</Header>
        <Select.Option id="one">one</Select.Option>
        <Select.Option id="two">two</Select.Option>
      </Select.Section>
    </Select>
  );

  expect(ref.current).toBeInstanceOf(HTMLDivElement);
});

test('renders as tray', () => {
  const ref = React.createRef<HTMLButtonElement>();

  let resize: Function;
  window.addEventListener = jest.fn().mockImplementation((event, cb) => {
    if (event === 'resize') resize = cb;
  });

  const { result } = renderHook(() => useSmallScreen());
  window.matchMedia = mockMatchMedia(['(max-width: 600px)']);
  act(() => resize());

  expect(result.current).toBeTruthy();

  render(
    <Select label="Label" data-testid="select" ref={ref as any}>
      <Select.Section>
        <Header>Section 1</Header>
        <Select.Option id="one">one</Select.Option>
        <Select.Option id="two">two</Select.Option>
      </Select.Section>
    </Select>
  );

  const button = screen.getByRole('button');
  fireEvent.click(button);
  const tray = screen.getByTestId('underlay-id');
  expect(tray).toBeInTheDocument();
});

test('error is there', () => {
  render(
    <Select
      label="Label"
      data-testid="select"
      width="1/2"
      error
      errorMessage="Error"
    >
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
    </Select>
  );

  // We need to query all, since there is also a label in the hidden select
  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Label')[0].parentElement;
  expect(container).toHaveAttribute('data-error');
});
