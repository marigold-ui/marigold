import { comboBoxValueProps } from '../transforms/combobox-value-props.js';
import type { MigrationManifest } from '../types.js';
import { v18 } from './v18.js';

// v19 changes no theme contract: the slot sets are v18's, kept in sync with
// the live Theme type by theme-drift.test.ts. Add a component's slots here,
// not in v18.ts, which is now frozen history.
export const v19: MigrationManifest = {
  schemaVersion: 1,
  version: 'v19',
  slots: { ...v18.slots },
  restructures: [],
  scaffolds: [],
  removedComponents: [],
  swaps: [],
  structureWarnings: [],
  jsx: {
    renames: [],
    memberRenames: [],
    removals: [],
    importRenames: [],
    warnings: [],
  },
  tokens: {
    renamed: {},
    added: [],
    repurposed: {},
    componentDependencies: {},
  },
  transforms: [comboBoxValueProps],
};
