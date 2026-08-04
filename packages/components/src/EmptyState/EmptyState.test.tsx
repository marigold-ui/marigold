import { render, screen } from '@testing-library/react';
import { Provider } from 'react-aria-components/slots';
import { ButtonContext } from '../Button/Context';
import { Basic, WithAction } from './EmptyState.stories';

test('renders with title and description', () => {
  render(<Basic.Component />);

  const title = screen.getByText('No items found');
  const description = screen.getByText(
    'There are currently no items to display.'
  );

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();

  // The description renders through the `<Description>` primitive but keeps
  // the same DOM as before (a styled `<div>` via the slot's `elementType`).
  expect(description.tagName).toBe('DIV');
});

test('renders the title as a semantic heading (default level 3)', () => {
  render(<Basic.Component />);

  const heading = screen.getByRole('heading', { name: 'No items found' });
  expect(heading.tagName).toBe('H3');
});

test('supports configuring the heading level', () => {
  render(<Basic.Component headingLevel={2} />);

  const heading = screen.getByRole('heading', { name: 'No items found' });
  expect(heading.tagName).toBe('H2');
});

test('renders with action buttons', () => {
  render(<WithAction.Component />);

  const primaryButton = screen.getByRole('button', { name: 'Browse Products' });
  const secondaryButton = screen.getByRole('button', { name: 'View Wishlist' });

  expect(primaryButton).toBeInTheDocument();
  expect(secondaryButton).toBeInTheDocument();
});

test('scopes the action from an inherited ButtonContext cascade', () => {
  render(
    <Provider values={[[ButtonContext, { className: 'leaked-grid' }]]}>
      <WithAction.Component />
    </Provider>
  );

  expect(
    screen.getByRole('button', { name: 'Browse Products' })
  ).not.toHaveClass('leaked-grid');
});

test('renders SVG illustration', () => {
  render(<Basic.Component />);
  const svg = screen.getByTestId('empty-state-illustration');

  expect(svg).toBeInTheDocument();
  expect(svg).toHaveAttribute('width', '151');
  expect(svg).toHaveAttribute('height', '84');
});
