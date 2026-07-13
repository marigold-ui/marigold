import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Form } from '../Form/Form';
import {
  Basic,
  CollapseAt,
  RemovableTags,
  WithError,
} from './TagGroup.stories';

test('render tag group', () => {
  render(<Basic.Component aria-label="static tag group items" />);

  const element = screen.getByLabelText('static tag group items');
  expect(element).toBeInTheDocument();
  const tags = screen.getAllByRole('row');
  expect(tags.length).toBe(4);
});

test.each`
  name                         | props
  ${'on `Delete` keypress'}    | ${{ keyPress: '{Delete}' }}
  ${'on `Backspace` keypress'} | ${{ keyPress: '{Backspace}' }}
`('Remove tag $name', async ({ props }) => {
  let onRemoveSpy = vi.fn();
  const user = userEvent.setup();
  render(<Basic.Component aria-label="tag group" onRemove={onRemoveSpy} />);

  const gaming = screen.getByText('Gaming');

  await user.click(gaming);
  await user.keyboard(`${props.keyPress}`);
  expect(onRemoveSpy).toHaveBeenCalledTimes(1);
});

test('exposes every tag as a keyboard-focusable grid row', () => {
  render(<Basic.Component />);

  const tags = screen.getAllByRole('row');
  expect(tags).toHaveLength(4);

  // react-aria uses `keyboardNavigationBehavior: 'tab'`, so each tag is its own
  // tab stop — that is what makes the list keyboard navigable.
  //
  // Arrow-key navigation between tags is react-aria grid behaviour and is
  // verified in real browsers. It is intentionally not simulated here: the
  // TagList is rendered with `display: contents` (so the "Show more" toggle can
  // flow inline after the last tag), and @testing-library's synthetic key
  // events do not traverse that grid, dropping focus instead of moving it.
  tags.forEach(tag => expect(tag).toHaveAttribute('tabindex', '0'));
});

test('renders label', () => {
  render(<Basic.Component aria-label="tag group" label="Categories" />);

  const label = screen.queryByLabelText(/Categories/i);
  expect(label).toBeInTheDocument();
});

test('renders error message when `error` is true', () => {
  render(<WithError.Component />);

  expect(
    screen.getByText('Please pick at least one category.')
  ).toBeInTheDocument();
});

test('`disabled` cascades to tags so interaction is blocked', async () => {
  const onChange = vi.fn();
  const user = userEvent.setup();
  render(<Basic.Component disabled onChange={onChange} />);

  const tags = screen.getAllByRole('row');
  tags.forEach(tag => expect(tag).toHaveAttribute('data-disabled', 'true'));

  await user.click(screen.getByText('News'));
  expect(onChange).not.toHaveBeenCalled();
});

test('can be used like a native form element', async () => {
  let data: [string, FormDataEntryValue][] = [];
  const submit = vi.fn(event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    data = Array.from(formData.entries());
  });

  render(
    <Form onSubmit={submit}>
      <Basic.Component
        label="Categories"
        name="categories"
        selectionMode="multiple"
      />
      <button type="submit">Submit</button>
    </Form>
  );

  const user = userEvent.setup();
  await user.click(screen.getByText('Travel'));
  await user.click(screen.getByText('Gaming'));

  const submitButton = screen.getByText('Submit');
  await user.click(submitButton);

  expect(data).toMatchInlineSnapshot(`
    [
      [
        "categories",
        "travel",
      ],
      [
        "categories",
        "gaming",
      ],
    ]
  `);
});

test('collapseAt hides tags beyond the limit behind a toggle', () => {
  render(<CollapseAt.Component />);

  expect(screen.getByText('News')).toBeVisible();
  expect(screen.getByText('Sports')).toBeVisible();
  expect(screen.queryByText('Music')).not.toBeVisible();
  expect(screen.getByText('Show 5 more')).toBeVisible();
});

test('collapseAt expands automatically when a hidden tag is selected', () => {
  render(<CollapseAt.Component defaultSelectedKeys={['music']} />);

  expect(screen.getByText('Music')).toBeVisible();
  expect(screen.getByText('Show 5 less')).toBeVisible();
});

test('collapseAt is ignored for dynamic collections (function children)', () => {
  render(<RemovableTags.Component collapseAt={1} />);

  expect(screen.getByText('News')).toBeInTheDocument();
  expect(screen.getByText('Shopping')).toBeInTheDocument();
  expect(screen.queryByText(/show \d+ more/i)).not.toBeInTheDocument();
});
