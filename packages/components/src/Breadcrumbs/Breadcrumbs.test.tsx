import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Basic, Collapsed } from './Breadcrumbs.stories';
import { BreadcrumbsItem } from './BreadcrumbsItem';

const CollapsedComponent = (props: any) => (
  <div id="storybook-root">
    <Collapsed.Component {...props} />
  </div>
);

const user = userEvent.setup();

/**
 * We need to mock `matchMedia` because JSOM does not
 * implements it.
 */
const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

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
  render(<CollapsedComponent />);

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
  render(<CollapsedComponent />);

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
  render(<CollapsedComponent />);

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

test('BreadcrumbsItem renders nothing', () => {
  render(
    <BreadcrumbsItem href="https://example.com">Test Item</BreadcrumbsItem>
  );

  expect(screen.queryByText('Test Item')).not.toBeInTheDocument();
});
