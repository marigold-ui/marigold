import type { Codemod } from '../types.js';

// v19 (DST-1865): the tray's `group/tray` moved from the `role=dialog`
// element to the inner `div[data-tray]`, so a theme selector written against
// the dialog role silently matches nothing. The rewrite is purely lexical and
// a second run finds nothing to change.

/** `group-[[role=dialog]]/tray:`, also with the value in single or double quotes. */
const OLD = /group-\[\[role=(["']?)dialog\1\]\]\/tray:/g;
const NEW = 'group-data-tray/tray:';

export const trayGroupSelector: Codemod = {
  name: 'tray-group-selector',
  description: `rewrite the tray group selector \`group-[[role=dialog]]/tray:\` to \`${NEW}\``,
  apply: source => {
    if (!source.includes('@marigold/')) {
      return { kind: 'unchanged', warnings: [] };
    }
    let count = 0;
    const output = source.replace(OLD, () => {
      count++;
      return NEW;
    });
    if (count === 0) {
      return { kind: 'unchanged', warnings: [] };
    }

    return {
      kind: 'edited',
      output,
      changes: [
        `rewrote ${count} \`group-[[role=dialog]]/tray:\` to \`${NEW}\``,
      ],
      warnings: [],
    };
  },
};
