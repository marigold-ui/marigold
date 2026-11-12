import { render } from '@testing-library/react';
import { Basic } from './ToggleButtonGroup.stories';

// Its own file: the warn-once flag lives at module level, and every test file gets a fresh
// module, while vi.resetModules() does not reset modules in browser mode. The case without
// `selectionMode` lives in ToggleButtonGroup.test.tsx.

const isSelectionModeWarning = (args: unknown[]) =>
  String(args[0]).includes('`ToggleButtonGroup` is for independent');

test('warns once about selectionMode across rerenders and remounts', () => {
  const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

  const { rerender } = render(<Basic.Component selectionMode="single" />);
  rerender(<Basic.Component selectionMode="single" />);
  render(<Basic.Component selectionMode="single" />);

  expect(warnSpy.mock.calls.filter(isSelectionModeWarning)).toHaveLength(1);
  warnSpy.mockRestore();
});
