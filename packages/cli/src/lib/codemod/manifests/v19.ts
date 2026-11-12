import type { MigrationManifest } from '../types.js';
import { v18 } from './v18.js';

// Hand-written v19 manifest. v19 changes two theme entries:
// - `Popover` became slotted (DST-1485), so the compound `<Popover>` can add
//   its parts next to the surface every popover shares. The consumer's single
//   style moves into `container`, the new slots are stubbed.
// - `Stepper` gained the slots of its small-screen layout (DST-1839). The
//   component hides the new parts by default, so only `summary` needs a
//   `slotDefaults` entry: it keeps the `hideLabels` counter visible.
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
    Stepper: [
      'root',
      'summary',
      'count',
      'errorCount',
      'currentLabel',
      'container',
      'item',
      'link',
      'marker',
      'label',
      'connector',
      'segment',
      'progressFill',
      'currentIndicator',
    ],
  },
  restructures: [{ component: 'Popover', primarySlot: 'container' }],
  scaffolds: [],
  removedComponents: [],
  swaps: [],
  structureWarnings: [
    {
      component: 'Stepper',
      text: "v19 gives Stepper a compact layout below the small-screen breakpoint. The migration adds its new slots with styles that keep your current row on every screen size. To get the compact layout, copy `root`, `summary`, `errorCount`, `currentLabel`, `segment`, `progressFill` and `currentIndicator` from theme-rui's `Stepper.styles.ts`, and the `max-sm:` rules it adds to the existing slots.",
    },
  ],
  slotDefaults: {
    Stepper: {
      summary: `{
  base: 'items-center gap-x-2 in-data-hide-labels:flex',
}`,
    },
  },
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
