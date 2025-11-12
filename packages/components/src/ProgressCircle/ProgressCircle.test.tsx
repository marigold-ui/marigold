import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './ProgressCircle.stories';

const { Basic } = composeStories(stories);

// Tests
// ---------------
test('renders an progressbar', () => {
  render(<Basic />);

  const progressCycle = screen.getByRole('progressbar');

  expect(progressCycle).toBeInTheDocument();
});

test('supports different sizes', () => {
  render(<Basic size="20" />);

  const progressCircle = screen.getByRole('progressbar');

  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCircle.firstChild).toHaveAttribute('height', '20px');
  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCircle.firstChild).toHaveAttribute('width', '20px');
});

test('supports strokewidth with bigger size', () => {
  render(<Basic size="40" />);

  const progressCircle = screen.getByRole('progressbar');

  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCircle.firstChild).toHaveAttribute('height', '40px');
  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCircle.firstChild).toHaveAttribute('width', '40px');
});

test('has aria label', () => {
  render(<Basic />);

  const progressCircle = screen.getByRole('progressbar');

  expect(progressCircle).toHaveAttribute('aria-label', 'loading');
});
