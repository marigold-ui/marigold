import { render } from '@testing-library/react';
import { theme } from '@marigold/theme-rui';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { ToggleButton } from './ToggleButton';
import { ToggleButtonGroup } from './ToggleButtonGroup';

// Its own file: the warn-once flag lives at module level, and every test file gets a fresh
// module, while vi.resetModules() does not reset modules in browser mode.

const isSelectionModeWarning = (args: unknown[]) =>
  String(args[0]).includes('`ToggleButtonGroup` is for independent');

test('warns once about selectionMode, and only when it is set', () => {
  const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  const group = (props: { selectionMode?: 'single' }) => (
    <MarigoldProvider theme={theme}>
      <ToggleButtonGroup aria-label="Mode" {...props}>
        <ToggleButton id="a">A</ToggleButton>
      </ToggleButtonGroup>
    </MarigoldProvider>
  );

  render(group({}));
  expect(warnSpy.mock.calls.filter(isSelectionModeWarning)).toHaveLength(0);

  const { rerender } = render(group({ selectionMode: 'single' }));
  rerender(group({ selectionMode: 'single' }));
  render(group({ selectionMode: 'single' }));
  expect(warnSpy.mock.calls.filter(isSelectionModeWarning)).toHaveLength(1);

  warnSpy.mockRestore();
});
