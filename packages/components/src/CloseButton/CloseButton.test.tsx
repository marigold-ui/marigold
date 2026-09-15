import { render, screen } from '@testing-library/react';
import type { MockInstance } from 'vitest';
import { vi } from 'vitest';
import { theme } from '@marigold/theme-rui';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { CloseButton } from './CloseButton';

let warnMock: MockInstance;

beforeEach(() => {
  warnMock = vi.spyOn(console, 'warn').mockImplementation(() => null);
});

afterEach(() => {
  warnMock.mockRestore();
});

const renderCloseButton = (ui: React.ReactElement) =>
  render(<MarigoldProvider theme={theme}>{ui}</MarigoldProvider>);

test('falls back to a localized name when none is given', () => {
  renderCloseButton(<CloseButton />);

  expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
});

test('warns when no accessible name is given', () => {
  renderCloseButton(<CloseButton />);

  expect(warnMock).toHaveBeenCalledWith(
    expect.stringContaining('[CloseButton]')
  );
});

test('an explicit aria-label wins over the fallback', () => {
  renderCloseButton(<CloseButton aria-label="Remove file" />);

  expect(
    screen.getByRole('button', { name: 'Remove file' })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Close' })
  ).not.toBeInTheDocument();
  expect(warnMock).not.toHaveBeenCalled();
});

test('does not apply the fallback when a slot supplies the name', () => {
  // A `slot` means a parent labels the button through context. Setting
  // `aria-label` here would win over it, so the fallback must stand down.
  renderCloseButton(<CloseButton slot="remove" />);

  expect(screen.getByRole('button')).not.toHaveAttribute('aria-label');
  expect(warnMock).not.toHaveBeenCalled();
});
