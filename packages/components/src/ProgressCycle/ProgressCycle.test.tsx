import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './ProgressCycle.stories';

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

  const progressCycle = screen.getByRole('progressbar');

  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCycle.firstChild).toHaveAttribute('height', '20px');
  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCycle.firstChild).toHaveAttribute('width', '20px');
});

test('supports strokewidth with bigger size', () => {
  render(<Basic size="40" />);

  const progressCycle = screen.getByRole('progressbar');

  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCycle.firstChild).toHaveAttribute('height', '40px');
  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCycle.firstChild).toHaveAttribute('width', '40px');
});

test('has aria label', () => {
  render(<Basic />);

  const progressCycle = screen.getByRole('progressbar');

  expect(progressCycle).toHaveAttribute('aria-label', 'loading');
});
