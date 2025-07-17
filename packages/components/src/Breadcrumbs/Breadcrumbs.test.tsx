import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import * as stories from './Breadcrumbs.stories';

const { Basic, CollapsedText, BasicWithLinks, CollapsedWithLinks } =
  composeStories(stories);

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
  render(<CollapsedText />);

  const ellipsis = screen.getByText('...');
  const home = screen.getByText('Home');
  const breadcrumb3 = screen.getByText('Breadcrumb3');

  expect(ellipsis).toBeInTheDocument();
  expect(home).toBeInTheDocument();
  expect(breadcrumb3).toBeInTheDocument();

  fireEvent.click(ellipsis);

  ['Breadcrumb1', 'Breadcrumb2'].forEach(text => {
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

test('handles breadcrumbs correctly with links', () => {
  render(<BasicWithLinks />);

  const link = screen.getByText('Home');
  const linkItems = screen.getAllByRole('link');

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'https://marigold-ui.io');
  expect(linkItems.length).toBe(2);
});

test('renders chevron separators', () => {
  render(<Basic />);

  const chevrons = screen.queryAllByTestId('breadcrumb-chevronright');

  expect(chevrons.length).toBeGreaterThan(0);
});

test('renders slash separators', () => {
  render(<Basic {...Basic.args} separatorType="slash" />);

  const slashes = screen.getAllByText('/');

  expect(slashes.length).toBeGreaterThan(0);
});

test('collapses breadcrumbs with links for too many items', () => {
  render(<CollapsedWithLinks />);

  const ellipsis = screen.getByText('...');
  const home = screen.getByText('Home');
  const breadcrumb3 = screen.getByText('Breadcrumb3');
  const linkItems = screen.getAllByRole('link');

  expect(ellipsis).toBeInTheDocument();
  expect(home).toBeInTheDocument();
  expect(breadcrumb3).toBeInTheDocument();

  expect(linkItems.length).toBe(1);

  fireEvent.click(ellipsis);

  ['Breadcrumb1', 'Breadcrumb2'].forEach(text => {
    const breadcrumb = screen.getByText(text);
    expect(breadcrumb).toBeInTheDocument();
    const link = screen.getByRole('link', { name: text });
    expect(link).toHaveAttribute('href');
  });
});
