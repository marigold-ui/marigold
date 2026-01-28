import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { vi } from 'vitest';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { Select } from './Select';
import { Basic } from './Select.stories';

// Setup
// ---------------
const user = userEvent.setup();

const theme: Theme = {
  name: 'test',
  components: {
    Field: cva(''),
    Label: cva('', {
      variants: {
        variant: { lime: 'text-lime-500' },
        size: { small: 'text-sm' },
      },
    }),
    Text: cva(),
    Popover: cva(['mt-0.5'], {
      variants: {
        variant: {
          top: ['mb-0.5'],
        },
      },
    }),
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
      item: cva(),
      section: cva(),
      header: cva(),
    },
    IconButton: cva(''),
  },
};

const { render } = setup({ theme });

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
  render(
    <Basic.Component
      data-testid="select"
      label="Label"
      errorMessage={'ERRR!'}
      description="Description"
    />
  );

  // We need to query all, since there is also a label in the hidden select
  const label = screen.queryAllByText('Label')[0];
  const description = screen.queryAllByText('Description')[0];
  const errorMessage = screen.queryByText('ERRR!');
  const button = screen.queryByTestId('select');

  expect(label).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(errorMessage).not.toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test('visible label is not a <label> element (for a11y)', () => {
  render(<Basic.Component label="Label" />);

  const labels = screen.queryAllByText('Label');

  expect(labels.length).toEqual(1);
});

test('placeholder is rendered', () => {
  render(<Basic.Component />);

  const button = screen.getByRole('button');

  expect(button).toHaveTextContent(/Select Item/);
});

test('allows to disable select', async () => {
  render(<Basic.Component disabled />);
  const button = screen.getByRole('button');

  expect(button).toBeDisabled();

  await user.click(button);

  expect(button).toHaveAttribute('aria-expanded', 'false');
});

test('allows to disable options', async () => {
  render(
    <Select label="Label" data-testid="select" disabledKeys={['two']}>
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
  );

  const button = screen.getByRole('button');
  await user.click(button);

  const options = screen.getByRole('listbox');
  const twoo = within(options).getByRole('option', { name: 'two' });

  expect(twoo).toHaveAttribute('aria-disabled', 'true');
});

test('controlled', async () => {
  const spy = vi.fn();
  render(
    <Select label="Label" data-testid="select" onChange={spy}>
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
  );

  const button = screen.getByRole('button');
  await user.click(button);

  const options = screen.getByRole('listbox');
  const three = within(options).getByText('three');
  await user.click(three);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith('three');
});

test('supports default value via "defaultSelectedKey"', async () => {
  render(
    <Select label="Label" data-testid="select" defaultSelectedKey="three">
      <Select.Option id="one">one</Select.Option>
      <Select.Option id="two">two</Select.Option>
      <Select.Option id="three">three</Select.Option>
    </Select>
  );

  const button = screen.getByRole('button');
  expect(button).toHaveTextContent(/three/);

  await user.click(button);

  const options = screen.getByRole('listbox');
  const three = within(options).getByRole('option', { name: 'three' });

  expect(three).toHaveAttribute('aria-selected', 'true');
});

test('supports sections', async () => {
  render(
    <Select label="Label" data-testid="select">
      <Select.Section header="Section 1">
        <Select.Option id="one">one</Select.Option>
        <Select.Option id="two">two</Select.Option>
      </Select.Section>
      <Select.Section header="Section 2">
        <Select.Option id="three">three</Select.Option>
        <Select.Option id="four">four</Select.Option>
      </Select.Section>
    </Select>
  );

  const button = screen.getByRole('button');
  await user.click(button);

  const options = screen.getByRole('listbox');
  const sectionOne = within(options).getByText('Section 1');
  const sectionTwo = within(options).getByText('Section 2');

  expect(sectionOne).toBeVisible();
  expect(sectionTwo).toBeVisible();
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
  expect(container?.className).toMatchInlineSnapshot(
    `"group/field flex flex-col w-1/2"`
  );
});

test('forwards ref', () => {
  const ref = createRef<HTMLButtonElement>();
  render(
    <Select label="Label" data-testid="select" ref={ref as any}>
      <Select.Section header="Section 1">
        <Select.Option id="one">one</Select.Option>
        <Select.Option id="two">two</Select.Option>
      </Select.Section>
    </Select>
  );

  expect(ref.current).toBeInstanceOf(HTMLDivElement);
});

test('error is there', () => {
  render(<Basic.Component label="Label" error />);

  // We need to query all, since there is also a label in the hidden select
  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Label')[0].parentElement;

  expect(container).toHaveAttribute('data-error');
});
