import { render, screen } from '@testing-library/react';
import { SelectListAction } from './SelectListAction';

test('renders element with children', () => {
  render(
    <SelectListAction>
      <button type="button">Action Button</button>
    </SelectListAction>
  );

  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});
