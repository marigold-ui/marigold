import { screen } from '@testing-library/react';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { ProgressCycle } from './ProgressCycle';

const theme: Theme = {
  name: 'Progress Cycle testing',
  components: {
    ProgressCycle: cva('stroke-gray-800'),
  },
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
  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCycle.firstChild).toHaveAttribute('height', '20px');
  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCycle.firstChild).toHaveAttribute('width', '20px');
});

test('supports strokewidth with bigger size', () => {
  render(<ProgressCycle size="40" />);

  const progressCycle = screen.getByRole('progressbar');
  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCycle.firstChild).toHaveAttribute('height', '40px');
  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCycle.firstChild).toHaveAttribute('width', '40px');
});

test('has aria label', () => {
  render(<ProgressCycle />);

  const progressCycle = screen.getByRole('progressbar');
  expect(progressCycle).toHaveAttribute('aria-label', 'loading');
});
