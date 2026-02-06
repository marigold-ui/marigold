import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { MockInstance, vi } from 'vitest';
import { Basic } from './Link.stories';

const user = userEvent.setup();

let warnMock: MockInstance;

beforeEach(() => {
  warnMock = vi.spyOn(console, 'warn').mockImplementation(() => null);
});

afterEach(() => {
  warnMock.mockRestore();
});

test('renders a <a> element by default', () => {
  render(<Basic.Component />);
  const link = screen.getByRole('link');

  expect(link instanceof HTMLAnchorElement).toBeTruthy();
});

test('supports href prop', () => {
  render(<Basic.Component href="https://example.com" />);
  const link = screen.getByRole('link');

  expect(link).toHaveAttribute('href', 'https://example.com');
});

test('supports disabled prop via aria attributes', () => {
  render(<Basic.Component disabled />);
  const link = screen.getByRole('link');

  expect(link).toHaveAttribute('aria-disabled', 'true');
});

test('supports variant prop', () => {
  render(<Basic.Component variant="secondary" />);
  const link = screen.getByRole('link');

  expect(link).toBeInTheDocument();
});

test('forwards ref', () => {
  const ref = createRef<HTMLAnchorElement>();
  render(<Basic.Component ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
});

test('renders span element when no href', () => {
  const ref = createRef<HTMLAnchorElement>();
  render(<Basic.Component href={undefined} ref={ref} />);

  // When no href, it renders a span, not a link
  expect(ref.current).toBeInstanceOf(HTMLSpanElement);
});

test('supports "onPress"', async () => {
  render(<Basic.Component onPress={() => {}} />);

  const link = screen.getByRole('link');
  await user.click(link);

  expect(warnMock).not.toHaveBeenCalled();
});
