import { render, screen } from '@testing-library/react';
import { MockInstance, vi } from 'vitest';
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

test('still falls back when a slot resolves no name from context', () => {
  // A `slot` prop is not itself a name. With no provider above it nothing
  // resolves, which is the same shape as RAC's `Dialog` `close` slot: it
  // supplies `onPress` and no label. The slot that *does* carry a label is
  // covered in `TagGroup.test.tsx`, against its real provider.
  renderCloseButton(<CloseButton slot="remove" />);

  expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  expect(warnMock).toHaveBeenCalledWith(
    expect.stringContaining('[CloseButton]')
  );
});
