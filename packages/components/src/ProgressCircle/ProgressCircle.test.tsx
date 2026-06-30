import { render, screen } from '@testing-library/react';
import { Basic } from './ProgressCircle.stories';

// Tests
// ---------------
test('renders an progressbar', () => {
  render(<Basic.Component />);

  const progressCycle = screen.getByRole('progressbar');

  expect(progressCycle).toBeInTheDocument();
});

test('supports different sizes', () => {
  render(<Basic.Component size="20" />);

  const progressCircle = screen.getByRole('progressbar');

  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCircle.firstChild).toHaveAttribute('height', '20px');
  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCircle.firstChild).toHaveAttribute('width', '20px');
});

test('supports strokewidth with bigger size', () => {
  render(<Basic.Component size="40" />);

  const progressCircle = screen.getByRole('progressbar');

  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCircle.firstChild).toHaveAttribute('height', '40px');
  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCircle.firstChild).toHaveAttribute('width', '40px');
});

test('named size token resolves to a numeric SVG dimension', () => {
  render(<Basic.Component size="default" />);

  const progressCircle = screen.getByRole('progressbar');

  // A named token must not leak into the SVG length attribute as `defaultpx`;
  // the rendered size comes from the theme class, the attribute stays numeric.
  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCircle.firstChild).toHaveAttribute('width', '24px');
  // eslint-disable-next-line testing-library/no-node-access
  expect(progressCircle.firstChild).toHaveAttribute('height', '24px');
});

test('has aria label', () => {
  render(<Basic.Component />);

  const progressCircle = screen.getByRole('progressbar');

  expect(progressCircle).toHaveAttribute('aria-label', 'Loading...');
});
