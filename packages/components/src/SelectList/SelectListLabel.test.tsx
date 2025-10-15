import { render, screen } from '@testing-library/react';
import { SelectListLabel } from './SelectListLabel';

test('renders element with children', () => {
  render(<SelectListLabel>Label Text</SelectListLabel>);

  const label = screen.getByText('Label Text');

  expect(label instanceof HTMLDivElement).toBeTruthy();
  expect(label).toHaveClass('font-semibold');
});
