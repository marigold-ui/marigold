import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { ComboBox } from './ComboBox';

const user = userEvent.setup();

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva(),
    Field: cva(),
    Label: {
      container: cva('text-teal-300', {
        variants: {
          size: {
            small: 'p-2',
          },
        },
      }),
      indicator: cva(),
    },
    HelpText: {
      container: cva('', {
        variants: {
          variant: {
            one: 'text-blue-900',
          },
          size: {
            small: 'p-2',
          },
        },
      }),
      icon: cva(),
    },
    ComboBox: cva(),
    Input: {
      input: cva(),
      icon: cva(),
      action: cva('p-0'),
    },
    ListBox: {
      container: cva(),
      list: cva(),
      item: cva(),
      section: cva(),
      header: cva(),
    },
    Popover: cva(['mt-0.5'], {
      variants: {
        variant: {
          top: ['mb-0.5'],
        },
      },
    }),
    Dialog: {
      closeButton: cva(),
      container: cva(),
      header: cva(),
      title: cva(),
      content: cva(),
      actions: cva(),
    },
    Underlay: cva('', {
      variants: {
        variant: {
          modal: ' bg-red-500',
        },
      },
    }),
    IconButton: cva(),
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

window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

const { render } = setup({ theme });

test('renders an input', () => {
  render(
    <ComboBox label="Label">
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
      <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
      <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
    </ComboBox>
  );

  const textField = screen.getAllByLabelText('Label')[0];
  expect(textField).toBeInTheDocument();
  expect(textField).toHaveAttribute('type', 'text');
  expect(textField instanceof HTMLInputElement).toBeTruthy();
});

test('supports width classname', () => {
  render(
    <ComboBox label="Label" data-testid="input-field">
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
      <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
      <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
    </ComboBox>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  expect(container?.className).toMatchInlineSnapshot(`"group/field w-full"`);
});

test('supports classnames', () => {
  render(
    <ComboBox
      label="Label"
      data-testid="input-field"
      variant="one"
      size="small"
    >
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
      <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
      <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
    </ComboBox>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  const label = screen.getByText('Label');
  const button = screen.getByRole('button');
  expect(button.className).toMatchInlineSnapshot(
    `"shrink-0 cursor-pointer outline-0 absolute right-0 p-0"`
  );
  expect(container?.className).toMatchInlineSnapshot(`"group/field w-full"`);
  expect(label.className).toMatchInlineSnapshot(
    `"text-teal-300 inline-flex w-[var(--labelWidth)]"`
  );
});

test('supports disabled', () => {
  render(
    <ComboBox label="Label" disabled>
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
    </ComboBox>
  );

  const textField = screen.getAllByLabelText('Label')[0];
  expect(textField).toBeDisabled();
});

test('supports required', () => {
  render(
    <ComboBox label="Label" required>
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
    </ComboBox>
  );

  const textField = screen.getAllByLabelText('Label')[0];
  expect(textField).toBeRequired();
});

test('supports readonly', () => {
  render(
    <ComboBox label="Label" readOnly>
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
    </ComboBox>
  );

  const textField = screen.getAllByLabelText('Label')[0];
  expect(textField).toHaveAttribute('readonly');
});

test('uses field structure', () => {
  render(
    <ComboBox
      label="Label"
      description="Some helpful text"
      errorMessage="Whoopsie"
    >
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
    </ComboBox>
  );

  const label = screen.queryByText('Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryAllByText('Some helpful text')[0];
  expect(description).toBeInTheDocument();

  const error = screen.queryByText('Whoopsie');
  expect(error).not.toBeInTheDocument();
});

test('opens the suggestions on user input', async () => {
  render(
    <ComboBox label="Label">
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
      <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
      <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
    </ComboBox>
  );

  const input = screen.getAllByLabelText('Label')[0];
  await user.type(input, 'br');

  const item = await screen.findByText('Broccoli');
  expect(item).toBeInTheDocument();
});

test('opens the suggestions on focus', async () => {
  render(
    <ComboBox label="Label" menuTrigger="focus">
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
      <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
      <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
    </ComboBox>
  );

  const input = screen.getAllByLabelText('Label')[0];
  await user.click(input);

  const item = await screen.findByText('Broccoli');
  expect(item).toBeInTheDocument();
});

test('opens the suggestions on arrow down (manual)', async () => {
  render(
    <ComboBox label="Label" menuTrigger="manual">
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
      <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
      <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
    </ComboBox>
  );

  const input = screen.getAllByLabelText('Label')[0];
  await user.type(input, '{arrowdown}');

  const item = await screen.findByText('Broccoli');
  expect(item).toBeInTheDocument();
});

test('shows suggestions based on user input', async () => {
  render(
    <ComboBox label="Label">
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
      <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
      <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
    </ComboBox>
  );

  const input = screen.getAllByLabelText('Label')[0];
  await user.type(input, 'br');

  expect(screen.getByText('Broccoli')).toBeInTheDocument();

  expect(screen.queryByText('Spinach')).not.toBeInTheDocument();
  expect(screen.queryByText('Carrots')).not.toBeInTheDocument();
  expect(screen.queryByText('Garlic')).not.toBeInTheDocument();
});

test('supports disabling suggestions', async () => {
  render(
    <ComboBox label="Label" disabledKeys={['spinach']}>
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
      <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
      <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
    </ComboBox>
  );

  const input = screen.getAllByLabelText('Label')[0];
  await user.type(input, 'a');

  const spinach = await screen.findByText('Spinach');
  expect(spinach).toHaveAttribute('aria-disabled', 'true');
});

test('supporst showing a help text', () => {
  render(
    <ComboBox label="Label" description="This is a description">
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
      <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
      <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
    </ComboBox>
  );

  const description = screen.getAllByText('This is a description')[0];
  expect(description).toBeInTheDocument();
});

test('supporst showing an error', () => {
  render(
    <ComboBox
      label="Label"
      data-testid="input-field"
      error
      errorMessage="Error!"
    >
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
      <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
      <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
    </ComboBox>
  );

  expect(screen.getByText('Error!')).toBeInTheDocument();
});

test('supports default value', () => {
  render(
    <ComboBox label="Label" defaultValue="garlic">
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
      <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
      <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
    </ComboBox>
  );

  const textField = screen.getAllByLabelText('Label')[0];
  expect(textField).toHaveValue('garlic');
});

test('supports sections', async () => {
  render(
    <ComboBox label="Label" data-testid="ComboBox">
      <ComboBox.Section header="Section 1">
        <ComboBox.Option id="one">one</ComboBox.Option>
        <ComboBox.Option id="two">two</ComboBox.Option>
      </ComboBox.Section>
      <ComboBox.Section header="Section 2">
        <ComboBox.Option id="three">three</ComboBox.Option>
        <ComboBox.Option id="four">four</ComboBox.Option>
      </ComboBox.Section>
    </ComboBox>
  );

  const input = screen.getAllByLabelText('Label')[0];
  await user.type(input, 'o');

  const s1 = await screen.findByText('Section 1');
  const s2 = await screen.findByText('Section 2');

  expect(s1).toBeVisible();
  expect(s2).toBeVisible();
});

test('can be controlled', async () => {
  const Controlled = () => {
    const [value, setValue] = React.useState('');
    return (
      <>
        <ComboBox label="Label" value={value} onChange={setValue}>
          <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
          <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
          <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
          <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
        </ComboBox>
        <span data-testid="output">{value}</span>
      </>
    );
  };

  render(<Controlled />);

  const input = screen.getAllByLabelText('Label')[0];
  await user.type(input, 'car');

  expect(screen.getByTestId('output')).toHaveTextContent('car');
});

test('supports autocompletion', async () => {
  render(
    <ComboBox label="Label">
      <ComboBox.Option id="spinach">Spinach</ComboBox.Option>
      <ComboBox.Option id="carrots">Carrots</ComboBox.Option>
      <ComboBox.Option id="broccoli">Broccoli</ComboBox.Option>
      <ComboBox.Option id="garlic">Garlic</ComboBox.Option>
    </ComboBox>
  );

  const input = screen.getAllByLabelText('Label')[0];
  await user.type(input, 'sp');

  const spinach = screen.getByText('Spinach');
  await user.click(spinach);

  expect(input).toHaveValue('Spinach');
});
