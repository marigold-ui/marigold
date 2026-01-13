import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Form } from '../Form/Form';
import { Basic } from './TagGroup.stories';

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

test('should navigate with keyboard keys through items', async () => {
  const user = userEvent.setup();
  render(<Basic.Component />);

  const tags = screen.getAllByRole('row');
  await user.tab();

  await user.keyboard('{arrowRight}');
  expect(tags[1]).toHaveFocus();
  expect(tags[0]).not.toHaveFocus();
  expect(tags[2]).not.toHaveFocus();

  await user.keyboard('{arrowRight}');
  expect(tags[2]).toHaveFocus();
  expect(tags[0]).not.toHaveFocus();
  expect(tags[1]).not.toHaveFocus();

  await user.keyboard('{arrowLeft}');
  expect(tags[1]).toHaveFocus();
  expect(tags[0]).not.toHaveFocus();
  expect(tags[2]).not.toHaveFocus();
});

test('renders label', () => {
  render(<Basic.Component aria-label="tag group" label="Categories" />);

  const label = screen.queryByLabelText(/Categories/i);
  expect(label).toBeInTheDocument();
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
