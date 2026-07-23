import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Basic } from './OverflowRegion.stories';

test('renders items alongside pinned siblings', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('searchbox')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /category/i })).toBeInTheDocument();
});

test('indicator is hidden while all items fit', () => {
  render(<Basic.Component />);

  // Wide viewport: everything fits, so the "More" indicator is inert and
  // removed from the accessibility tree.
  expect(screen.queryByRole('button', { name: /more/i })).toBeNull();
});
