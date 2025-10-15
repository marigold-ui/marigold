import { render, screen } from '@testing-library/react';
import { SelectListImage } from './SelectListImage';

test('renders img element with src and alt', () => {
  render(<SelectListImage src="/test.jpg" alt="Test image" />);

  const img = screen.getByAltText('Test image');

  expect(img instanceof HTMLImageElement).toBeTruthy();
  expect(img).toHaveAttribute('src', '/test.jpg');
});

test('applies size variants', () => {
  const { rerender } = render(
    <SelectListImage src="/test.jpg" alt="Test" size="small" />
  );
  expect(screen.getByAltText('Test')).toHaveClass('w-8', 'h-8');

  rerender(<SelectListImage src="/test.jpg" alt="Test" size="large" />);
  expect(screen.getByAltText('Test')).toHaveClass('w-16', 'h-16');
});
