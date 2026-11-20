import { assertEdited } from '../test-helpers.js';
import { trayGroupSelector } from './tray-group-selector.js';

describe('tray-group-selector', () => {
  test('rewrites the v18 tray group selector in a theme file', () => {
    const source = `import { cva, ThemeComponent } from '@marigold/system';
export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva({ base: 'ring-1 group-[[role=dialog]]/tray:ring-0 [&_td]:group-[[role=dialog]]/tray:p-0' }),
};
`;

    const result = trayGroupSelector.apply(source);

    assertEdited(result);
    expect(result.output).toContain(
      "'ring-1 group-data-tray/tray:ring-0 [&_td]:group-data-tray/tray:p-0'"
    );
    expect(result.changes).toHaveLength(1);
  });

  test('rewrites the quoted spellings of the selector too', () => {
    const source = `import { cva } from '@marigold/system';
export const x = cva({ base: ["group-[[role='dialog']]/tray:p-0", 'group-[[role="dialog"]]/tray:ring-0'] });
`;

    const result = trayGroupSelector.apply(source);

    assertEdited(result);
    expect(result.output).toContain(
      `["group-data-tray/tray:p-0", 'group-data-tray/tray:ring-0']`
    );
  });

  test('leaves a migrated theme file alone', () => {
    const source = `import { cva } from '@marigold/system';
export const x = cva({ base: 'group-data-tray/tray:ring-0' });
`;

    expect(trayGroupSelector.apply(source).kind).toBe('unchanged');
  });

  test('leaves files without a Marigold import alone', () => {
    const source = `export const x = 'group-[[role=dialog]]/tray:ring-0';\n`;

    expect(trayGroupSelector.apply(source).kind).toBe('unchanged');
  });
});
