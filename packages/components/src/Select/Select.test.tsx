import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Form } from 'react-aria-components';
import { renderWithOverlay } from '../test.utils';
import { Basic, Sections } from './Select.stories';

const user = userEvent.setup();

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
  // Basic story has disabledKeys={['Firefly']} built-in
  renderWithOverlay(<Basic.Component label="Label" data-testid="select" />);

  const button = screen.getByRole('button');
  await user.click(button);

  const options = screen.getByRole('listbox');
  const firefly = within(options).getByRole('option', { name: 'Firefly' });

  expect(firefly).toHaveAttribute('aria-disabled', 'true');
});

test('controlled', async () => {
  // Basic story already has onChange that updates selected state
  renderWithOverlay(<Basic.Component label="Label" data-testid="select" />);

  const button = screen.getByRole('button');
  await user.click(button);

  const options = screen.getByRole('listbox');
  const starWars = within(options).getByText('Star Wars');
  await user.click(starWars);

  // Basic story renders selected value in a pre element
  expect(screen.getByTestId('selected')).toHaveTextContent(
    'selected: Star Wars'
  );
});

test('supports default value via "defaultSelectedKey"', async () => {
  renderWithOverlay(
    <Basic.Component
      label="Label"
      data-testid="select"
      defaultSelectedKey="Star Trek"
    />
  );

  const button = screen.getByRole('button');
  expect(button).toHaveTextContent(/Star Trek/);

  await user.click(button);

  const options = screen.getByRole('listbox');
  const starTrek = within(options).getByRole('option', { name: 'Star Trek' });

  expect(starTrek).toHaveAttribute('aria-selected', 'true');
});

test('supports sections', async () => {
  renderWithOverlay(<Sections.Component label="Label" data-testid="select" />);

  const button = screen.getByRole('button');
  await user.click(button);

  const options = screen.getByRole('listbox');
  const fantasy = within(options).getByText('Fantasy');
  const sciFi = within(options).getByText('Sci-Fi');

  expect(fantasy).toBeVisible();
  expect(sciFi).toBeVisible();
});

test('set width via props', () => {
  render(<Basic.Component label="Label" data-testid="select" width="1/2" />);

  // We need to query all, since there is also a label in the hidden select
  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Label')[0].parentElement;
  expect(container).toHaveClass('w-1/2');
});

test('forwards ref', () => {
  const ref = createRef<HTMLButtonElement>();
  render(
    <Basic.Component label="Label" data-testid="select" ref={ref as any} />
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

test('supports multiple selection', async () => {
  const handleSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    return { formData };
  });

  render(
    <Form onSubmit={handleSubmit}>
      <Select
        label="Favorite"
        name="favorite"
        selectionMode="multiple"
        data-testid="select"
      >
        <Select.Option id="Harry Potter">Harry Potter</Select.Option>
        <Select.Option id="Lord of the Rings">Lord of the Rings</Select.Option>
        <Select.Option id="Star Wars">Star Wars</Select.Option>
        <Select.Option id="Star Trek">Star Trek</Select.Option>
        <Select.Option id="Firefly">Firefly</Select.Option>
      </Select>
    </Form>
  );

  const selectButton = screen.getByRole('button', { name: /favorite/i });
  await user.click(selectButton);

  // Wait for the listbox to appear
  await waitFor(() => {
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  const listbox = screen.getByRole('listbox');

  // Select multiple options
  const starWars = within(listbox).getByText('Star Wars');
  await user.click(starWars);

  const firefly = within(listbox).getByText('Firefly');
  await user.click(firefly);

  // Verify both options are selected
  expect(
    within(listbox).getByRole('option', { name: 'Star Wars' })
  ).toHaveAttribute('aria-selected', 'true');
  expect(
    within(listbox).getByRole('option', { name: 'Firefly' })
  ).toHaveAttribute('aria-selected', 'true');

  // Close the listbox
  await user.keyboard('{Escape}');

  // Get the form element and submit it
  // eslint-disable-next-line testing-library/no-node-access
  const form = screen
    .getByRole('button', { name: /favorite/i })
    .closest('form');
  expect(form).not.toBeNull();

  // Trigger form submission
  form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

  expect(handleSubmit).toHaveBeenCalledTimes(1);

  const formData = handleSubmit.mock.results[0].value.formData;
  const favorites = formData.getAll('favorite');
  expect(favorites).toEqual(['Star Wars', 'Firefly']);
});
