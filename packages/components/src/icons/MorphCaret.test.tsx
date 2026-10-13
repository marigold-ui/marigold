import { render, screen } from '@testing-library/react';
import { MorphCaret } from './MorphCaret';

// Safari ignores the CSS `d` property, so the caret needs a `d` attribute.
test('draws the caret with a d attribute in both states', () => {
  const { rerender } = render(<MorphCaret data-testid="caret" />);
  const caret = () =>
    // eslint-disable-next-line testing-library/no-node-access
    screen.getByTestId('caret').querySelector('path');

  expect(caret()).toHaveAttribute('d', 'M 6 10 L 12 16 L 18 10');

  rerender(<MorphCaret data-testid="caret" expanded />);

  expect(caret()).toHaveAttribute('d', 'M 6 16 L 12 10 L 18 16');
});
