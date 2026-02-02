import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { TagField } from './TagField';
import { Basic } from './TagField.stories';

// Setup
// ---------------
const user = userEvent.setup();

const theme: Theme = {
  name: 'test',
  components: {
    Field: cva(''),
    Label: cva(''),
    Text: cva(),
    Popover: cva('mt-0.5'),
    HelpText: {
      container: cva(''),
      icon: cva(''),
    },
    TagField: {
      trigger: cva('border'),
      tags: cva(''),
      listItems: cva(''),
      button: cva(''),
      icon: cva(''),
      emptyState: cva(''),
      search: cva(''),
      searchInput: cva(''),
      input: cva(''),
    },
    Tag: {
      container: cva(),
      tag: cva(),
      closeButton: cva(),
      listItems: cva(),
      removeAll: cva(),
    },
    CloseButton: cva(''),
    Underlay: cva(),
    ListBox: {
      container: cva(),
      list: cva(),
      item: cva(),
      section: cva(),
      header: cva(),
    },
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

test('renders a field (label, helptext, tagfield)', () => {
  render(
    <Basic.Component
      label="Label"
      errorMessage="ERRR!"
      description="Description"
    />
  );

  const label = screen.queryAllByText('Label')[0];
  const description = screen.queryAllByText('Description')[0];
  const errorMessage = screen.queryByText('ERRR!');

  expect(label).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(errorMessage).not.toBeInTheDocument();
});

test('placeholder is rendered when no items are selected', () => {
  render(<Basic.Component label="Label" placeholder="Pick items" />);

  expect(screen.getByText('Pick items')).toBeInTheDocument();
});

test('allows to disable the field', async () => {
  render(
    <TagField label="Label" disabled>
      <TagField.Option id="one">one</TagField.Option>
      <TagField.Option id="two">two</TagField.Option>
    </TagField>
  );

  const button = screen.getByRole('button');
  expect(button).toBeDisabled();
});

test('opens popover on click', async () => {
  render(
    <TagField label="Label">
      <TagField.Option id="one">one</TagField.Option>
      <TagField.Option id="two">two</TagField.Option>
    </TagField>
  );

  const button = screen.getByRole('button');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();
});

test('selected items appear as tags', async () => {
  render(
    <TagField label="Label" defaultValue={['one', 'two']}>
      <TagField.Option id="one">one</TagField.Option>
      <TagField.Option id="two">two</TagField.Option>
      <TagField.Option id="three">three</TagField.Option>
    </TagField>
  );

  expect(screen.getAllByText('one')[0]).toBeInTheDocument();
  expect(screen.getAllByText('two')[0]).toBeInTheDocument();
});

test('error state shows error message', () => {
  render(
    <TagField label="Label" error errorMessage="Something went wrong">
      <TagField.Option id="one">one</TagField.Option>
    </TagField>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Label')[0].parentElement;
  expect(container).toHaveAttribute('data-error');
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});

test('set width via props', () => {
  render(
    <TagField label="Label" width="1/2">
      <TagField.Option id="one">one</TagField.Option>
    </TagField>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Label')[0].parentElement;
  expect(container?.className).toContain('w-1/2');
});
