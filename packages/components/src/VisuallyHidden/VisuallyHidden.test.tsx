import { render, screen } from '@testing-library/react';
import { VisuallyHidden } from './VisuallyHidden';

test('is visually hidden', () => {
  render(<VisuallyHidden>Default</VisuallyHidden>);
  const hidden = screen.getByText('Default');

  expect(hidden).toHaveStyle(`overflow: hidden`);
});
