import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockMatchMedia, renderWithOverlay } from '../test.utils';
import {
  AutoCollapse,
  Basic,
  Collapsed,
  ManyItems,
} from './Breadcrumbs.stories';
import { BreadcrumbsItem } from './BreadcrumbsItem';

const user = userEvent.setup();

window.matchMedia = mockMatchMedia(['(width < 640px)']);

test('renders breadcrumb items correctly', () => {
  render(<Basic.Component />);

  const home = screen.getByText('Home');
  const breadcrumb1 = screen.getByText('Breadcrumb1');
  const breadcrumb2 = screen.getByText('Breadcrumb2');

  expect(home).toBeInTheDocument();
  expect(breadcrumb1).toBeInTheDocument();
  expect(breadcrumb2).toBeInTheDocument();
});

test('collapses breadcrumbs for too many items', async () => {
  renderWithOverlay(<Collapsed.Component />);

  const ellipsis = screen.getByText('...');
  const home = screen.getByText('Home');
  const breadcrumb3 = screen.getByText('Breadcrumb3');

  await user.click(ellipsis);

  expect(ellipsis).toBeInTheDocument();
  expect(home).toBeInTheDocument();
  expect(breadcrumb3).toBeInTheDocument();
  ['Breadcrumb1', 'Breadcrumb2'].forEach(text => {
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

test('handles breadcrumbs links correctly', () => {
  render(<Basic.Component />);

  const link = screen.getByText('Home');
  const linkItems = screen.getAllByRole('link');

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'https://marigold-ui.io');
  expect(linkItems.length).toBe(3);
});

test('renders chevron separators', () => {
  render(<Basic.Component />);

  const chevrons = screen.queryAllByTestId('breadcrumb-chevronright');

  expect(chevrons.length).toBeGreaterThan(0);
});

test('collapses breadcrumbs with links for too many items', () => {
  renderWithOverlay(<Collapsed.Component />);

  // First
  expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  // Last
  expect(screen.getByRole('link', { name: 'Breadcrumb3' })).toBeInTheDocument();

  // Collapsed items
  expect(
    screen.getByRole('button', { name: 'These breadcrumbs are hidden' })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: 'Breadcrumb1' })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: 'Breadcrumb2' })
  ).not.toBeInTheDocument();
});

test('expand collapsed items', async () => {
  renderWithOverlay(<Collapsed.Component />);

  const ellipsis = screen.getByRole('button', {
    name: 'These breadcrumbs are hidden',
  });
  await user.click(ellipsis);

  expect(
    screen.getByRole('menuitem', { name: 'Breadcrumb1' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('menuitem', { name: 'Breadcrumb2' })
  ).toBeInTheDocument();
});

test('auto-collapse starts collapsed with current item visible', () => {
  renderWithOverlay(<AutoCollapse.Component />);

  // Auto mode starts collapsed (ellipsis + current).
  // In jsdom there is no ResizeObserver, so it stays collapsed.
  expect(
    screen.getByRole('link', { name: 'Event Details Page' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'These breadcrumbs are hidden' })
  ).toBeInTheDocument();

  // All other items are hidden inside the ellipsis menu
  expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: 'Events' })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: 'Summer Festival' })
  ).not.toBeInTheDocument();
});

test('maxVisibleItems=2 shows only ellipsis and current item', () => {
  renderWithOverlay(<ManyItems.Component />);

  // Current (last) item is visible
  expect(
    screen.getByRole('link', { name: 'Breadcrumb 30' })
  ).toBeInTheDocument();
  // Ellipsis is visible
  expect(
    screen.getByRole('button', { name: 'These breadcrumbs are hidden' })
  ).toBeInTheDocument();
  // First item is hidden (maxVisibleItems=2 hides everything except current)
  expect(
    screen.queryByRole('link', { name: 'Breadcrumb 1' })
  ).not.toBeInTheDocument();
});

test('BreadcrumbsItem renders nothing', () => {
  render(
    <BreadcrumbsItem href="https://example.com">Test Item</BreadcrumbsItem>
  );

  expect(screen.queryByText('Test Item')).not.toBeInTheDocument();
});
