import { render, screen } from '@testing-library/react';
import { WithDescription } from './ListBox.stories';

test('exposes label/description as first-class slots without descendant selectors', () => {
  render(<WithDescription.Component />);

  const description = screen.getByText('Anyone with the link can view.');

  // Theme classNames are applied directly on the slot element.
  expect(description).toHaveClass('text-xs', 'text-secondary');
});

test('preserves RAC aria-describedby wiring after merging classNames', () => {
  render(<WithDescription.Component />);

  const option = screen.getAllByRole('option')[0];
  const describedById = option.getAttribute('aria-describedby');

  // RAC injects `descriptionProps` (carrying the `id`) into TextContext;
  // the merge step must keep it intact for screen readers.
  expect(describedById).toBeTruthy();

  const description = screen.getByText('Anyone with the link can view.');
  expect(description).toHaveAttribute('id', describedById);
});
