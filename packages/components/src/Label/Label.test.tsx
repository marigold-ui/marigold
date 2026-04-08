import { render, screen } from '@testing-library/react';
import { Basic } from './Label.stories';

test('supports htmlFor prop', () => {
  render(<Basic.Component htmlFor="labelId">label</Basic.Component>);
  const label = screen.getByText('label');

  expect(label).toHaveAttribute('for', 'labelId');
});

test('applies base styles', () => {
  render(<Basic.Component>label</Basic.Component>);
  const label = screen.getByText('label');

  expect(label).toHaveClass('inline-flex');
});
