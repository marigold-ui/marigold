import { screen } from '@testing-library/react';
import { renderWithOverlay } from '../test.utils';
import { Basic, WithSize, WithVariant } from './Underlay.stories';

test('renders underlay', () => {
  renderWithOverlay(<Basic.Component />);

  const underlay = screen.getByText('something');
  expect(underlay).toBeInTheDocument();
});

test('underlay supports variant', () => {
  renderWithOverlay(<WithVariant.Component />);

  const underlay = screen.getByTestId('underlay-id');
  expect(underlay).toBeInTheDocument();
  expect(underlay).toHaveAttribute('data-testid', 'underlay-id');
});

test('underlay supports size', () => {
  renderWithOverlay(<WithSize.Component />);

  const underlay = screen.getByTestId('underlay-id');
  expect(underlay).toBeInTheDocument();
  expect(underlay).toHaveAttribute('data-testid', 'underlay-id');
});
