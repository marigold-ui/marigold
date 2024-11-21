import { screen } from '@testing-library/react';
import { Theme } from '@marigold/system';
import { setup } from '../test.utils';
import { ProgressCycle } from './ProgressCycle';

const theme: Theme = {
  name: 'Progress Cycle testing',
  components: {},
};

const { render } = setup({ theme });

// Tests
// ---------------
test('renders an progressbar', () => {
  render(<ProgressCycle />);

  const progressCycle = screen.getByRole('progressbar');
  expect(progressCycle).toBeInTheDocument();
});

test('supports different sizes', () => {
  render(<ProgressCycle size="20" />);

  const progressCycle = screen.getByRole('progressbar');
  expect(progressCycle.firstChild).toHaveAttribute('height', '20px');
  expect(progressCycle.firstChild).toHaveAttribute('width', '20px');
});

test('supports strokewidth with bigger size', () => {
  render(<ProgressCycle size="40" />);

  const progressCycle = screen.getByRole('progressbar');
  expect(progressCycle.firstChild).toHaveAttribute('height', '40px');
  expect(progressCycle.firstChild).toHaveAttribute('width', '40px');
});

test('has aria label', () => {
  render(<ProgressCycle />);

  const progressCycle = screen.getByRole('progressbar');
  expect(progressCycle).toHaveAttribute('aria-label', 'loading');
});
