import { render, screen } from '@testing-library/react';
import { EmptyStateProps } from '@marigold/components';
import { Basic, WithAction } from './EmptyState.stories';

// Setup
// ---------------

const BasicComponent = (props?: Partial<EmptyStateProps>) => (
  <div id="storybook-root">
    <Basic.Component {...props} />
  </div>
);

const WithActionComponent = () => (
  <div id="storybook-root">
    <WithAction.Component />
  </div>
);

// Tests
// ---------------
test('renders basic empty state with title', () => {
  render(<BasicComponent />);

  const title = screen.getByText('No items found');

  expect(title).toBeInTheDocument();
});

test('renders with title and description', () => {
  render(<BasicComponent />);

  const title = screen.getByText('No items found');
  const description = screen.getByText(
    'There are currently no items to display.'
  );

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});

test('renders with custom title', () => {
  render(<BasicComponent title="Custom Title" />);

  const title = screen.getByText('Custom Title');

  expect(title).toBeInTheDocument();
});

test('renders with custom description', () => {
  render(
    <BasicComponent title="Title" description="Custom description text" />
  );

  const description = screen.getByText('Custom description text');

  expect(description).toBeInTheDocument();
});

test('renders with action buttons', () => {
  render(<WithActionComponent />);

  const title = screen.getByText('No products in your cart');
  const description = screen.getByText(
    'Start adding items to your cart to see them here.'
  );
  const primaryButton = screen.getByRole('button', { name: 'Browse Products' });
  const secondaryButton = screen.getByRole('button', { name: 'View Wishlist' });

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(primaryButton).toBeInTheDocument();
  expect(secondaryButton).toBeInTheDocument();
});

test('renders SVG illustration', () => {
  render(<BasicComponent />);
  const svg = screen.getByRole('img', { hidden: true });

  expect(svg).toBeInTheDocument();
  expect(svg).toHaveAttribute('width', '151');
  expect(svg).toHaveAttribute('height', '84');
});
