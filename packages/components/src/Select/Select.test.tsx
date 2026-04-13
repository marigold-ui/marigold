import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { RefObject } from 'react';
import { mockMatchMedia, renderWithOverlay } from '../test.utils';
import { Basic, Sections } from './Select.stories';

const user = userEvent.setup();

window.matchMedia = mockMatchMedia([]);

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

test('supports default value via "defaultValue"', async () => {
  renderWithOverlay(
    <Basic.Component
      label="Label"
      data-testid="select"
      defaultValue="Star Trek"
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
  expect(container).toHaveClass('w-(--container-width)');
});

test('forwards ref', () => {
  const ref = { current: null } as unknown as RefObject<HTMLButtonElement>;
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
