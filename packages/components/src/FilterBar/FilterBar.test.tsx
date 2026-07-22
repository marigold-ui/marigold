import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { Basic } from './FilterBar.stories';
import { FilterBarPanel } from './FilterBarPanel';

test('renders search, quick filters, and the panel trigger', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('searchbox')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /category/i })).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /all filters/i })
  ).toBeInTheDocument();
});

test('panel subcomponent requires a surrounding FilterBar', () => {
  // Silence React's error boundary logging for the expected throw.
  const consoleError = vi
    .spyOn(console, 'error')
    .mockImplementation(() => undefined);

  expect(() => render(<FilterBarPanel>content</FilterBarPanel>)).toThrow(
    'FilterBar subcomponents must be used within a <FilterBar>.'
  );

  consoleError.mockRestore();
});
