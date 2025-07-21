import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import * as stories from './Breadcrumbs.stories';

const { Basic, Collapsed } = composeStories(stories);

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
  render(<Basic />);

  const home = screen.getByText('Home');
  const breadcrumb1 = screen.getByText('Breadcrumb1');
  const breadcrumb2 = screen.getByText('Breadcrumb2');

  expect(home).toBeInTheDocument();
  expect(breadcrumb1).toBeInTheDocument();
  expect(breadcrumb2).toBeInTheDocument();
});

test('collapses breadcrumbs for too many items', () => {
  render(<Collapsed />);

  const ellipsis = screen.getByText('...');
  const home = screen.getByText('Home');
  const breadcrumb3 = screen.getByText('Breadcrumb3');

  fireEvent.click(ellipsis);

  expect(ellipsis).toBeInTheDocument();
  expect(home).toBeInTheDocument();
  expect(breadcrumb3).toBeInTheDocument();
  ['Breadcrumb1', 'Breadcrumb2'].forEach(text => {
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

test('handles breadcrumbs links correctly', () => {
  render(<Basic />);

  const link = screen.getByText('Home');
  const linkItems = screen.getAllByRole('link');

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'https://marigold-ui.io');
  expect(linkItems.length).toBe(3);
});

test('renders chevron separators', () => {
  render(<Basic />);

  const chevrons = screen.queryAllByTestId('breadcrumb-chevronright');

  expect(chevrons.length).toBeGreaterThan(0);
});

test('collapses breadcrumbs with links for too many items', () => {
  render(<Collapsed />);

  const ellipsis = screen.getByText('...');
  const home = screen.getByText('Home');
  const breadcrumb3 = screen.getByText('Breadcrumb3');
  const linkItems = screen.getAllByRole('link');

  fireEvent.click(ellipsis);

  expect(ellipsis).toBeInTheDocument();
  expect(home).toBeInTheDocument();
  expect(breadcrumb3).toBeInTheDocument();

  expect(linkItems.length).toBe(2);

  fireEvent.click(ellipsis);

  ['Breadcrumb1', 'Breadcrumb2'].forEach(text => {
    const breadcrumb = screen.getByText(text);
    expect(breadcrumb).toBeInTheDocument();
    const link = screen.getByRole('link', { name: text });
    expect(link).toHaveAttribute('href');
  });
});
