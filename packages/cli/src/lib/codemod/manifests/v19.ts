import { comboBoxValueProps } from '../transforms/combobox-value-props.js';
import { trayGroupSelector } from '../transforms/tray-group-selector.js';
import type { MigrationManifest } from '../types.js';
import { v18 } from './v18.js';

// Hand-written v19 manifest. `Popover` became slotted (DST-1485), so the
// compound `<Popover>` can add its parts next to the surface every popover
// shares. The consumer's single style moves into `container`, the new slots
// are stubbed. `Tray` renders inside a new `Sheet` (DST-1865), which is
// scaffolded, and its `overlay` slot is gone. Its `group/tray` moved off the
// dialog, so `tray-group-selector` rewrites the old theme selector.
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
    Tray: [
      'container',
      'dragHandle',
      'header',
      'title',
      'description',
      'content',
      'actions',
    ],
    Sheet: ['backdrop', 'container', 'content'],
  },
  restructures: [{ component: 'Popover', primarySlot: 'container' }],
  scaffolds: [
    {
      name: 'Sheet',
      requiredBy: ['Tray'],
      reason:
        'new in v19: `Tray` renders inside a `Sheet` (DST-1865), which owns the backdrop and the surface, and a theme without its styles throws at runtime',
      // Without these the tray renders see-through over an undimmed page.
      loadBearing: {
        backdrop: `{
  base: "data-[stack-index='0']:bg-overlay-backdrop",
}`,
        container: `{
  base: [
    'w-full border-0 inset-shadow-black inset-shadow-sm/20',
    'rounded-b-none ui-surface shadow-elevation-overlay outline-hidden',
  ],
}`,
        content: `{ base: 'outline-hidden' }`,
      },
    },
  ],
  removedComponents: [],
  swaps: [],
  structureWarnings: [
    {
      component: 'Tray',
      text: 'v19 builds Tray on a `Sheet` (DST-1865). `Tray.overlay` is gone: the backdrop moved to `Sheet.backdrop` and the surface (background, shadow, rounding) to `Sheet.container`. `Tray.container` is layout only now. Move customized overlay or surface styles to `Sheet` and remove them from `Tray`. The backdrop animates through `@keyframes sheet-backdrop`, which your theme CSS has to define.',
    },
  ],
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
  transforms: [comboBoxValueProps, trayGroupSelector],
  // a second run renames a selection-only `value` again
  rerunSafe: false,
};
