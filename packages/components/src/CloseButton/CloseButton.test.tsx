import { render, screen } from '@testing-library/react';
import { MockInstance, vi } from 'vitest';
import { Basic } from './CloseButton.stories';

let warnMock: MockInstance;

beforeEach(() => {
  warnMock = vi.spyOn(console, 'warn').mockImplementation(() => null);
});

afterEach(() => {
  warnMock.mockRestore();
});

test('falls back to a localized name when none is given', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
});

test('warns when no accessible name is given', () => {
  render(<Basic.Component />);

  expect(warnMock).toHaveBeenCalledWith(
    expect.stringContaining('[CloseButton]')
  );
});

test('an explicit aria-label wins over the fallback', () => {
  render(<Basic.Component aria-label="Remove file" />);

  expect(
    screen.getByRole('button', { name: 'Remove file' })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Close' })
  ).not.toBeInTheDocument();
  expect(warnMock).not.toHaveBeenCalled();
});

test('a forwarded undefined aria-label does not wipe out the fallback', () => {
  // The shape a wrapper produces with `aria-label={props.label}`.
  render(<Basic.Component aria-label={undefined} />);

  expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
});

test('still falls back when a slot resolves no name from context', () => {
  // Same shape as RAC Dialog's `close` slot: `onPress`, no label. The labelled
  // slot is covered in `TagGroup.test.tsx`.
  render(<Basic.Component slot="remove" />);

  expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  expect(warnMock).toHaveBeenCalledWith(
    expect.stringContaining('[CloseButton]')
  );
});
