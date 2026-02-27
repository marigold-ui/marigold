import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Basic, Controlled } from './TagField.stories';

const user = userEvent.setup();

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

  const placeholder = screen.getByText('Pick items');

  expect(placeholder).toBeInTheDocument();
});

test('allows to disable the field', () => {
  render(<Controlled.Component disabled />);

  const button = screen.getByRole('button');

  expect(button).toBeDisabled();
});

test('Selected Items are visible', () => {
  render(<Controlled.Component />);

  const rockTag = screen.getAllByText('Rock')[0];
  const popTag = screen.getAllByText('Pop')[0];

  expect(rockTag).toBeInTheDocument();
  expect(popTag).toBeInTheDocument();
});

test('error state shows error message', () => {
  render(
    <Basic.Component error errorMessage="Please select at least one genre." />
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Genres')[0].parentElement;
  const errorMessage = screen.getByText('Please select at least one genre.');

  expect(container).toHaveAttribute('data-error');
  expect(errorMessage).toBeInTheDocument();
});

test('allows removing a tag', async () => {
  render(<Controlled.Component />);

  const removeButtons = screen.getAllByRole('button', { name: /remove/i });
  expect(removeButtons).toHaveLength(2);

  await user.click(removeButtons[0]);

  expect(screen.getByTestId('selected')).toHaveTextContent('selected: ["pop"]');
});

test('clicking the field area opens the dropdown', async () => {
  render(<Basic.Component label="Label" />);

  const button = screen.getByRole('button');
  await user.click(button);

  const listbox = screen.getByRole('listbox');
  expect(listbox).toBeInTheDocument();
});

test('set width via props', () => {
  render(<Basic.Component label="Label" width="1/2" />);

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Label')[0].parentElement;

  expect(container).toHaveClass('w-(--container-width)');
  expect(container?.style.getPropertyValue('--container-width')).toBe(
    'calc((1 / 2) * 100%)'
  );
});
