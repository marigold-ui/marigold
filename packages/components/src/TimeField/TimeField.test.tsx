import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './TimeField.stories';

const { Basic } = composeStories(stories);

let onBlurSpy = vi.fn();
let onFocusChangeSpy = vi.fn();
let onFocusSpy = vi.fn();

afterEach(() => {
  onBlurSpy.mockClear();
  onFocusChangeSpy.mockClear();
  onFocusSpy.mockClear();
});
test('renders TimeField with default value', () => {
  render(<Basic />);

  const segments = screen.getAllByRole('spinbutton');

  expect(segments.length).toBeGreaterThanOrEqual(2);
  expect(segments[0]).toHaveTextContent(/13|1/);
  expect(segments[1]).toHaveTextContent('45');
});

test('renders readonly state', () => {
  render(<Basic readOnly />);

  expect(screen.getAllByRole('spinbutton')[0]).toHaveAttribute(
    'aria-readonly',
    'true'
  );
});

test('renders disabled state', () => {
  render(<Basic disabled />);

  expect(screen.getAllByRole('spinbutton')[0]).toHaveAttribute(
    'aria-disabled',
    'true'
  );
});

test('renders required state', () => {
  render(<Basic required />);

  expect(screen.getAllByRole('spinbutton')[0]).toHaveAttribute(
    'aria-required',
    'true'
  );
});

test('renders TimeField with granularity of second', () => {
  render(<Basic granularity="second" />);

  const segments = screen.getAllByRole('spinbutton');

  expect(segments.length).toBeGreaterThanOrEqual(3);
  expect(segments[2]).toHaveTextContent('30');
});

test('renders TimeField in 12-hour format', () => {
  render(<Basic hourCycle={12} />);

  const segments = screen.getAllByRole('spinbutton');

  const hourSegment = segments.find(seg =>
    /^(0?[1-9]|1[0-2])$/.test(seg.textContent || '')
  );
  const ampmSegment = segments.find(seg =>
    /(AM|PM)/i.test(seg.textContent || '')
  );

  expect(hourSegment).toBeDefined();
  expect(ampmSegment).toBeDefined();
});
