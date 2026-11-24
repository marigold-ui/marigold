import { comboBoxValueProps } from '../transforms/combobox-value-props.js';
import { systemTextClassMaps } from '../transforms/system-text-class-maps.js';
import { trayGroupSelector } from '../transforms/tray-group-selector.js';
import type { MigrationManifest } from '../types.js';
import { v18 } from './v18.js';

// Hand-written v19 manifest.
// - `CommandPalette` is new in v19 (DST-1949). No consumer theme has it yet, so
//   its slots are only stubbed.
// - `Popover` became slotted (DST-1485), so the compound `<Popover>` can add
//   its parts next to the surface every popover shares. The consumer's single
//   style moves into `container`, the new slots are stubbed.
// - `Tray` renders inside a new `Sheet` (DST-1865), which is scaffolded, and
//   its `overlay` slot is gone. Its `group/tray` moved off the dialog, so
//   `tray-group-selector` rewrites the old theme selector.
// - `Stepper` gained the slots of its small-screen layout (DST-1839). The
//   component hides the new parts by default, so only `summary` needs a
//   `slotDefaults` entry: it keeps the `hideLabels` counter visible.
// - `@marigold/system` dropped the `fontWeight`/`textSize` maps (DST-1869),
//   which `system-text-class-maps` replaces in application code.
//
// `slots` mirrors the v19 `Theme` type: the v18 sets plus the new Popover,
// Stepper, Tray, Sheet and CommandPalette shapes. `theme-drift.test.ts` pins
// this file against the live type. `stylesReferenceUrl` is left out until the
// v19 release tag exists, rather than pointing reports at a moving branch.
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
    // New in v19, so no consumer theme has it yet: only stubs, no move.
    CommandPalette: [
      'button',
      'container',
      'header',
      'input',
      'list',
      'group',
      'item',
      'label',
      'description',
      'keyboard',
      'match',
      'empty',
      'footer',
      'prefixes',
      'legend',
      'tray',
    ],
    NumberField: ['group', 'stepper', 'input', 'maxValue'],
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
      text: "v19 builds Tray on a `Sheet` (DST-1865). `Tray.overlay` is gone: the backdrop moved to `Sheet.backdrop` and the surface (background, shadow, rounding) to `Sheet.container`. `Tray.container` is layout only now. Move customized overlay or surface styles to `Sheet` and remove them from `Tray`. The backdrop fades through the theme's `@keyframes fade-in`, kept in the CSS by `--animate-fade-in`.",
    },
    {
      component: 'Stepper',
      text: "v19 gives Stepper a compact layout below the small-screen breakpoint. The migration adds its new slots with styles that keep your current row on every screen size. To get the compact layout, copy `root`, `summary`, `currentLabel`, `segment`, `progressFill` and `currentIndicator` from theme-rui's `Stepper.styles.ts`, and the `max-sm:` rules it adds to the existing slots.",
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
  transforms: [comboBoxValueProps, trayGroupSelector, systemTextClassMaps],
};
