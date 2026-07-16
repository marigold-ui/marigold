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

// A named token must not leak into the SVG length attribute as `<token>px`
// (e.g. `defaultpx`). Named tokens resolve to the pixel dimension of their
// theme `size-*` class so the stroke stays proportionate; `fit` has no
// intrinsic dimension and falls back to the <SVG> default of 24.
test.each([
  { token: 'default', dimension: '80px', strokeWidth: '4' },
  { token: 'large', dimension: '144px', strokeWidth: '4' },
  { token: 'fit', dimension: '24px', strokeWidth: '2' },
])(
  'named size token "$token" resolves to a numeric SVG dimension',
  ({ token, dimension }) => {
    render(<Basic.Component size={token} />);

    const progressCircle = screen.getByRole('progressbar');

    // eslint-disable-next-line testing-library/no-node-access
    expect(progressCircle.firstChild).toHaveAttribute('width', dimension);
    // eslint-disable-next-line testing-library/no-node-access
    expect(progressCircle.firstChild).toHaveAttribute('height', dimension);
  }
);

test.each([
  { token: 'default', strokeWidth: '4' },
  { token: 'large', strokeWidth: '4' },
  { token: 'fit', strokeWidth: '2' },
])(
  'named size token "$token" keys the stroke width off the resolved dimension',
  ({ token, strokeWidth }) => {
    render(<Basic.Component size={token} />);

    const progressCircle = screen.getByRole('progressbar');
    // The stroke math keys off the resolved numeric size, not the raw token —
    // otherwise `NaN` would leak into the attribute.
    // eslint-disable-next-line testing-library/no-node-access
    const svg = progressCircle.firstChild as Element;
    // eslint-disable-next-line testing-library/no-node-access
    const circle = svg.querySelector('circle');

    expect(circle).toHaveAttribute('stroke-width', strokeWidth);
  }
);

test('has aria label', () => {
  render(<Basic.Component />);

  const progressCircle = screen.getByRole('progressbar');

  expect(progressCircle).toHaveAttribute('aria-label', 'Loading...');
});

test('respects a consumer-provided aria-label', () => {
  render(<Basic.Component aria-label="Sending reminders" />);

  const progressCircle = screen.getByRole('progressbar');

  expect(progressCircle).toHaveAttribute('aria-label', 'Sending reminders');
});

test('falls back to the localized label when aria-label is explicitly undefined', () => {
  // A conditional label (`aria-label={cond ? '…' : undefined}`) puts the key
  // `aria-label: undefined` into props. The fallback must still apply so the
  // progressbar always has an accessible name.
  render(<Basic.Component aria-label={undefined} />);

  const progressCircle = screen.getByRole('progressbar');

  expect(progressCircle).toHaveAttribute('aria-label', 'Loading...');
});

test('respects a consumer-provided aria-labelledby without a redundant aria-label', () => {
  render(
    <>
      <span id="progress-label">Sending reminders</span>
      <Basic.Component aria-labelledby="progress-label" />
    </>
  );

  const progressCircle = screen.getByRole('progressbar');

  expect(progressCircle).toHaveAttribute('aria-labelledby', 'progress-label');
  expect(progressCircle).not.toHaveAttribute('aria-label');
});
