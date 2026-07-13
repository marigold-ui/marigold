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
  const stickyWrapper = trigger.closest('div');

  expect(stickyWrapper).toHaveClass('sticky');
  expect(stickyWrapper).toHaveClass('top-0');
  expect(stickyWrapper).toHaveClass('z-1');
  expect(stickyWrapper).toHaveClass('backdrop-blur-xs');
  expect(stickyWrapper).toHaveClass('bg-background/90');
});

test('supports iconPosition left', () => {
  render(<IconPositionLeft.Component />);

  expect(screen.getAllByText('Settings')).toHaveLength(3);
});

test('wires up the bleed inset custom properties (Panel alignment)', () => {
  render(<Basic.Component defaultExpandedKeys={['1']} />);

  const trigger = screen.getAllByRole('button')[0];

  // Container sources the inset from a bled Panel's `--bleed-px`, falling back
  // to 0px so standalone / non-bled Accordions stay unchanged.
  // eslint-disable-next-line testing-library/no-node-access
  const container = trigger.closest('.flex-col')!;
  expect(container.className).toContain(
    '[--accordion-x-padding:var(--bleed-px,0px)]'
  );

  // Header insets itself (and its focus ring) by the inset when bled.
  expect(trigger.className).toContain('mx-(--accordion-ring-inset)');
  expect(trigger.className).toContain(
    'px-[calc(var(--accordion-x-padding)-var(--accordion-ring-inset))]'
  );

  // Expanded content picks up the same inset.
  const content = screen
    .getByText('Here are some infos')
    // eslint-disable-next-line testing-library/no-node-access
    .closest('[class*="px-(--accordion-x-padding)"]');
  expect(content).not.toBeNull();
});
