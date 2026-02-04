import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
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
    Field: cva({ base: '' }),
    Label: cva({
      base: '',
      variants: {
        variant: { lime: 'text-lime-500' },
        size: { small: 'text-sm' },
      },
    }),
    Text: cva({}),
    Popover: cva({
      base: ['mt-0.5'],
      variants: {
        variant: {
          top: ['mb-0.5'],
        },
      },
    }),
    HelpText: {
      container: cva({
        base: '',
        variants: {
          variant: {
            lime: 'text-lime-600',
          },
          size: {
            small: 'text-sm',
          },
        },
      }),
      icon: cva({ base: '' }),
    },
    Select: {
      select: cva({
        base: 'text-blue-500',
        variants: {
          variant: { violet: 'text-violet-500' },
          size: { small: 'text-sm' },
        },
      }),
      icon: cva({ base: 'text-zinc-600' }),
    },
    Underlay: cva({}),
    ListBox: {
      container: cva({}),
      list: cva({}),
      item: cva({}),
      section: cva({}),
      header: cva({}),
    },
    IconButton: cva({ base: '' }),
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

test('renders correct HTML element', () => {
  render(
    <Select label="Label">
      <Select.Option id="one">One</Select.Option>
      <Select.Option id="two">Two</Select.Option>
      <Select.Option id="three">Three</Select.Option>
    </Select>
  );
  const select = screen.getByLabelText('Label');
  expect(select instanceof HTMLButtonElement).toBeTruthy();
});

test('supports label', () => {
  render(
    <Select label="Label">
      <Select.Option id="one">One</Select.Option>
      <Select.Option id="two">Two</Select.Option>
      <Select.Option id="three">Three</Select.Option>
    </Select>
  );
  const label = screen.getAllByText('Label');
  expect(label[0]).toBeInTheDocument();
});

test('supports required', () => {
  render(
    <Select label="Label" required>
      <Select.Option id="one">One</Select.Option>
      <Select.Option id="two">Two</Select.Option>
      <Select.Option id="three">Three</Select.Option>
    </Select>
  );
  const select = screen.getByLabelText('Label');

  expect(select).toHaveAttribute('aria-required');
});

test('supports disabled', () => {
  render(
    <Select label="Label" disabled>
      <Select.Option id="one">One</Select.Option>
      <Select.Option id="two">Two</Select.Option>
      <Select.Option id="three">Three</Select.Option>
    </Select>
  );
  const select = screen.getByLabelText('Label');

  expect(select).toBeDisabled();
});

test('supports description', () => {
  render(
    <Select label="Label" description="This is a description.">
      <Select.Option id="one">One</Select.Option>
      <Select.Option id="two">Two</Select.Option>
      <Select.Option id="three">Three</Select.Option>
    </Select>
  );
  const description = screen.getByText('This is a description.');
  expect(description).toBeInTheDocument();
});

test('supports error message', () => {
  render(
    <Select label="Label" error errorMessage="This is an error message.">
      <Select.Option id="one">One</Select.Option>
      <Select.Option id="two">Two</Select.Option>
      <Select.Option id="three">Three</Select.Option>
    </Select>
  );
  const error = screen.getByText('This is an error message.');
  expect(error).toBeInTheDocument();
});

test('supports default open', async () => {
  render(
    <Select label="Label" defaultOpen>
      <Select.Option id="one">One</Select.Option>
      <Select.Option id="two">Two</Select.Option>
      <Select.Option id="three">Three</Select.Option>
    </Select>
  );
  const listbox = screen.getByRole('listbox');
  expect(listbox).toBeInTheDocument();
});

test('supports controlled open with onOpenChange', async () => {
  const MockComponent = () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <button onClick={() => setOpen(!open)}>Toggle</button>
        <Select label="Label" open={open} onOpenChange={setOpen}>
          <Select.Option id="one">One</Select.Option>
          <Select.Option id="two">Two</Select.Option>
          <Select.Option id="three">Three</Select.Option>
        </Select>
      </>
    );
  };

  render(<MockComponent />);
  const trigger = screen.getByText('Toggle');
  await user.click(trigger);

  const listbox = screen.getByRole('listbox');
  expect(listbox).toBeInTheDocument();
});

test('allows to select option per keyboard (arrow down + enter)', async () => {
  render(<Basic.Component />);
  const button = screen.getByRole('button');

  // Open
  await user.click(button);

  const listbox = screen.getByRole('listbox');
  expect(listbox).toBeInTheDocument();

  // Navigate down
  await user.keyboard('{ArrowDown}');

  const option = within(listbox).getByText('Banana');
  expect(option).toHaveAttribute('aria-selected', 'true');

  // Select
  await user.keyboard('{Enter}');
  expect(button).toHaveTextContent('Banana');
});

test('allows to select option per keyboard (arrow up + enter)', async () => {
  render(<Basic.Component />);
  const button = screen.getByRole('button');

  // Open
  await user.click(button);

  const listbox = screen.getByRole('listbox');
  expect(listbox).toBeInTheDocument();

  // Navigate up
  await user.keyboard('{ArrowUp}');

  const option = within(listbox).getByText('Strawberry');
  expect(option).toHaveAttribute('aria-selected', 'true');

  // Select
  await user.keyboard('{Enter}');
  expect(button).toHaveTextContent('Strawberry');
});

test('select option per click', async () => {
  render(<Basic.Component />);
  const button = screen.getByRole('button');

  // Open
  await user.click(button);

  const listbox = screen.getByRole('listbox');
  expect(listbox).toBeInTheDocument();

  const option = within(listbox).getByText('Orange');
  await user.click(option);

  expect(button).toHaveTextContent('Orange');
});

test('allows setting default selected option', () => {
  render(
    <Select label="Label" defaultSelectedKey="two">
      <Select.Option id="one">One</Select.Option>
      <Select.Option id="two">Two</Select.Option>
      <Select.Option id="three">Three</Select.Option>
    </Select>
  );
  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('Two');
});

test('calls onSelectionChange', async () => {
  const onChange = vi.fn();
  render(
    <Select label="Label" onSelectionChange={onChange}>
      <Select.Option id="one">One</Select.Option>
      <Select.Option id="two">Two</Select.Option>
      <Select.Option id="three">Three</Select.Option>
    </Select>
  );
  const button = screen.getByRole('button');

  // Open
  await user.click(button);

  const listbox = screen.getByRole('listbox');
  expect(listbox).toBeInTheDocument();

  const option = within(listbox).getByText('Two');
  await user.click(option);

  expect(onChange).toHaveBeenCalledWith('two');
});

test('forwards ref', () => {
  const ref = createRef<HTMLButtonElement>();
  render(
    <Select label="Label" ref={ref}>
      <Select.Option id="one">One</Select.Option>
      <Select.Option id="two">Two</Select.Option>
      <Select.Option id="three">Three</Select.Option>
    </Select>
  );
  expect(ref.current).toBeInstanceOf(HTMLButtonElement);
});

test('supports theming on container', () => {
  render(
    <Select label="Label" variant="violet">
      <Select.Option id="one">One</Select.Option>
      <Select.Option id="two">Two</Select.Option>
      <Select.Option id="three">Three</Select.Option>
    </Select>
  );
  const select = screen.getByLabelText('Label');
  expect(select).toHaveClass('text-violet-500');
});
