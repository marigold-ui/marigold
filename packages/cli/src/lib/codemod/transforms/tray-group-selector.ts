import type { Codemod } from '../types.js';

// v19 (DST-1865): the tray's `group/tray` moved from the `role=dialog`
// element to the inner `div[data-tray]`, so a theme selector written against
// the dialog role silently matches nothing. The rewrite is purely lexical and
// a second run finds nothing to change.

const OLD = 'group-[[role=dialog]]/tray:';
const NEW = 'group-data-tray/tray:';

export const trayGroupSelector: Codemod = {
  name: 'tray-group-selector',
  description: `rewrite the tray group selector \`${OLD}\` to \`${NEW}\``,
  apply: source => {
    if (!source.includes('@marigold/') || !source.includes(OLD)) {
      return { kind: 'unchanged', warnings: [] };
    }
    const count = source.split(OLD).length - 1;

    return {
      kind: 'edited',
      output: source.replaceAll(OLD, NEW),
      changes: [`rewrote ${count} \`${OLD}\` to \`${NEW}\``],
      warnings: [],
    };
  },
};
