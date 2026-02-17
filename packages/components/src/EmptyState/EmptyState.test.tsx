import { render, screen } from '@testing-library/react';
import { Basic, WithAction } from './EmptyState.stories';

test('renders with title and description', () => {
  render(<Basic.Component />);

  const title = screen.getByText('No items found');
  const description = screen.getByText(
    'There are currently no items to display.'
  );

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});

test('renders with action buttons', () => {
  render(<WithAction.Component />);

  const primaryButton = screen.getByRole('button', { name: 'Browse Products' });
  const secondaryButton = screen.getByRole('button', { name: 'View Wishlist' });

  expect(primaryButton).toBeInTheDocument();
  expect(secondaryButton).toBeInTheDocument();
});

test('renders SVG illustration', () => {
  render(<Basic.Component />);
  const svg = screen.getByTestId('empty-state-illustration');

  expect(svg).toBeInTheDocument();
  expect(svg).toHaveAttribute('width', '151');
  expect(svg).toHaveAttribute('height', '84');
});
