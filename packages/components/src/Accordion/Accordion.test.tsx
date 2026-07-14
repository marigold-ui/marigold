import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Basic, IconPositionLeft, StickyHeader } from './Accordion.stories';

const user = userEvent.setup();

test('render Accordion and more than one Item', () => {
  render(<Basic.Component />);

  const item = screen.getByText('Informations');
  const itemtwo = screen.getByText('Personal Settings');

  expect(item).toBeInTheDocument();
  expect(itemtwo).toBeInTheDocument();
});

test('items per default closed', () => {
  render(<Basic.Component defaultExpandedKeys={[]} />);

  const button = screen.queryAllByRole('button');

  expect(button[0]).toHaveAttribute('aria-expanded', 'false');
  expect(button[1]).toHaveAttribute('aria-expanded', 'false');
  expect(button[2]).toHaveAttribute('aria-expanded', 'false');
});

test('item opens content by click', async () => {
  render(<Basic.Component defaultExpandedKeys={[]} />);

  const button = screen.queryAllByRole('button');

  await user.click(button[0]);

  await waitFor(() =>
    expect(button[0]).toHaveAttribute('aria-expanded', 'true')
  );
});

test('render dynamically accordion items', async () => {
  render(<Basic.Component />);

  const button = screen.getByRole('button', { name: 'Personal Settings' });

  expect(button).toHaveAttribute('aria-expanded', 'false');

  await user.click(button);

  expect(button).toHaveAttribute('aria-expanded', 'true');
});

test('support default expanded keys', () => {
  render(<Basic.Component defaultExpandedKeys={['1']} />);

  const button = screen.queryAllByRole('button');
  const item = screen.getByText('Here are some infos');

  expect(button[0]).toHaveAttribute('aria-expanded', 'true');
  expect(item).toBeInTheDocument();
  expect(button[1]).toHaveAttribute('aria-expanded', 'false');
});

test('support default expanded keys (more than one)', () => {
  render(<Basic.Component defaultExpandedKeys={['1', '2']} />);

  const item = screen.getByText('Here are some infos');
  const itemtwo = screen.getByText('Some longer Text to see if it looks good');

  expect(item).toBeInTheDocument();
  expect(itemtwo).toBeInTheDocument();
});

test('renders sticky header wrapper with expected utility classes', () => {
  render(<StickyHeader.Component />);

  const trigger = screen.getByRole('button', {
    name: /Symfonie Abo 2025\/2026/i,
  });

  // eslint-disable-next-line testing-library/no-node-access
  const stickyWrapper = trigger.closest('.sticky');

  expect(stickyWrapper).toHaveClass('sticky');
  expect(stickyWrapper).toHaveClass('top-0');
  expect(stickyWrapper).toHaveClass('z-1');
  expect(stickyWrapper).toHaveClass('bg-surface/90');
});

test('sticky header wrapper and its panel share the same accordion item', () => {
  render(<StickyHeader.Component />);

  const trigger = screen.getByRole('button', {
    name: /Symfonie Abo 2025\/2026/i,
  });
  const panelId = trigger.getAttribute('aria-controls');

  // eslint-disable-next-line testing-library/no-node-access
  const stickyWrapper = trigger.closest('.sticky');
  // eslint-disable-next-line testing-library/no-node-access
  const panel = panelId ? document.getElementById(panelId) : null;

  // `position: sticky` only pins while its containing block (the parent) stays
  // in view. Header actions must live inside `Accordion.Header` so the sticky
  // wrapper's parent is the item that also holds the scrollable panel, rather
  // than a short action row.
  // eslint-disable-next-line testing-library/no-node-access
  expect(stickyWrapper?.parentElement).toContainElement(panel);
});

test('header actions adopt the ghost/small ButtonContext cascade', () => {
  render(<StickyHeader.Component />);

  const [deleteButton] = screen.getAllByRole('button', { name: 'Delete' });

  // `size="small"` resolves to `text-xs` (the default size is `text-sm`), so
  // this confirms the header's `ButtonContext` reached a bare `<Button>`.
  expect(deleteButton).toHaveClass('text-xs');
});

test('supports iconPosition left', () => {
  render(<IconPositionLeft.Component />);

  expect(screen.getAllByText('Settings')).toHaveLength(3);
});
