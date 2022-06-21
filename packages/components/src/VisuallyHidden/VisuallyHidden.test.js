import React from 'react';
import { render, screen } from '@testing-library/react';
import { VisuallyHidden } from './VisuallyHidden';
test('is visually hidden', () => {
  render(React.createElement(VisuallyHidden, null, 'Default'));
  const hidden = screen.getByText('Default');
  expect(hidden).toHaveStyle(`overflow: hidden`);
});
//# sourceMappingURL=VisuallyHidden.test.js.map
