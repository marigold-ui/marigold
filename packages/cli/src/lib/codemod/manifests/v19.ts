import type { MigrationManifest } from '../types.js';
import { v18 } from './v18.js';

// Hand-written v19 manifest. v19 changes one theme entry: `Popover` became
// slotted (DST-1485), so the compound `<Popover>` can add its parts next to
// the surface every popover shares. The consumer's single style moves into
// `container`, the new slots are stubbed.
//
// `slots` mirrors the v19 `Theme` type: the v18 sets plus the new Popover
// shape. `theme-drift.test.ts` pins this file against the live type.
// `stylesReferenceUrl` is left out until the v19 release tag exists, rather
// than pointing reports at a moving branch.
export const v19: MigrationManifest = {
  schemaVersion: 1,
  version: 'v19',
  slots: {
    ...v18.slots,
    Popover: ['container', 'body', 'title', 'description', 'search', 'content'],
  },
  restructures: [{ component: 'Popover', primarySlot: 'container' }],
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
};
