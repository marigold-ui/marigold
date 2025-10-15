import { render, screen } from '@testing-library/react';
import { SelectListDescription } from './SelectListDescription';

test('renders element with children', () => {
  render(<SelectListDescription>Description text</SelectListDescription>);

  const description = screen.getByText('Description text');

  expect(description instanceof HTMLDivElement).toBeTruthy();
  expect(description).toHaveClass('text-sm');
});
