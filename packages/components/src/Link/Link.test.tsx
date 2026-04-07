import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { RefObject } from 'react';
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

test('supports href prop', () => {
  render(<Basic.Component href="https://example.com" />);
  const link = screen.getAllByRole('link')[0];

  expect(link).toHaveAttribute('href', 'https://example.com');
});

test('supports disabled prop via aria attributes', () => {
  render(<Basic.Component disabled />);
  const link = screen.getAllByRole('link')[0];

  expect(link).toHaveAttribute('aria-disabled', 'true');
});

test('supports variant prop', () => {
  render(<Basic.Component variant="secondary" />);
  const link = screen.getAllByRole('link')[0];

  expect(link).toBeInTheDocument();
});

test('forwards ref', () => {
  const ref = { current: null } as unknown as RefObject<HTMLAnchorElement>;
  render(<Basic.Component ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
});

test('renders span element when no href', () => {
  const ref = { current: null } as unknown as RefObject<HTMLAnchorElement>;
  render(<Basic.Component href={undefined} ref={ref} />);

  // When no href, it renders a span, not a link
  expect(ref.current).toBeInstanceOf(HTMLSpanElement);
});

test('supports "onPress"', async () => {
  render(<Basic.Component onPress={() => {}} />);

  const link = screen.getAllByRole('link')[0];
  await user.click(link);

  expect(warnMock).not.toHaveBeenCalled();
});
