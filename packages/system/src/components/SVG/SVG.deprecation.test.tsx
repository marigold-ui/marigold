import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { SVG } from './SVG';

// Kept in its own file: the warning fires once per module instance, so any
// earlier render of <SVG> in the same file would use it up.
test('warns once that <SVG> is deprecated', () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

  render(<SVG />);
  render(<SVG />);

  expect(warn).toHaveBeenCalledTimes(1);
  expect(warn).toHaveBeenCalledWith(
    expect.stringContaining('<SVG> from @marigold/system is deprecated')
  );

  warn.mockRestore();
});
