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

test.each(['default', 'large', 'fit'])(
  'named size token "%s" resolves to a numeric SVG dimension',
  token => {
    render(<Basic.Component size={token} />);

    const progressCircle = screen.getByRole('progressbar');

    // A named token must not leak into the SVG length attribute as `<token>px`
    // (e.g. `defaultpx`); the rendered size comes from the theme class, while
    // the intrinsic attribute falls back to the numeric default.
    // eslint-disable-next-line testing-library/no-node-access
    expect(progressCircle.firstChild).toHaveAttribute('width', '24px');
    // eslint-disable-next-line testing-library/no-node-access
    expect(progressCircle.firstChild).toHaveAttribute('height', '24px');
  }
);

test('named size token uses the numeric fallback for stroke width', () => {
  render(<Basic.Component size="default" />);

  const progressCircle = screen.getByRole('progressbar');
  // The stroke math keys off the resolved numeric size (24 → strokeWidth 2),
  // not the raw token — otherwise `NaN` would leak into the attribute.
  // eslint-disable-next-line testing-library/no-node-access
  const circle = (progressCircle.firstChild as Element).querySelector('circle');

  expect(circle).toHaveAttribute('stroke-width', '2');
});

test('has aria label', () => {
  render(<Basic.Component />);

  const progressCircle = screen.getByRole('progressbar');

  expect(progressCircle).toHaveAttribute('aria-label', 'Loading...');
});
