import { comboBoxValueProps } from '../transforms/combobox-value-props.js';
import { dateImports } from '../transforms/date-imports.js';
import { systemSvg } from '../transforms/system-svg.js';
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
// - The mobile `Sidebar` renders through the same `Sheet` from the start edge
//   (DST-1867), so its `overlay` and `modal` slots are gone.
// - `Stepper` gained the slots of its small-screen layout (DST-1839). The
//   component hides the new parts by default, so only `summary` needs a
//   `slotDefaults` entry: it keeps the `hideLabels` counter visible.
// - `@marigold/system` dropped the `fontWeight`/`textSize` maps (DST-1869),
//   which `system-text-class-maps` replaces in application code.
// - `@marigold/system` dropped `<SVG>` (DST-1393), which `system-svg` turns
//   into a native `<svg>` that renders the same.
// - `@marigold/components` re-exports the date values and helpers
//   (DST-1994), so `date-imports` moves those imports off
//   `@internationalized/date`. Optional: the old imports keep working.
//
// `slots` mirrors the v19 `Theme` type: the v18 sets plus the new Popover,
// Stepper, Tray, Sheet, Sidebar and CommandPalette shapes. `theme-drift.test.ts` pins
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
    Sidebar: (v18.slots.Sidebar ?? []).filter(
      slot => slot !== 'overlay' && slot !== 'modal'
    ),
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
      requiredBy: ['Tray', 'Sidebar'],
      reason:
        'new in v19: `Tray` (DST-1865) and the mobile `Sidebar` (DST-1867) render inside a `Sheet`, which owns the backdrop and the surface, and a theme without its styles throws at runtime',
      // Without these the tray renders see-through over an undimmed page.
      loadBearing: {
        backdrop: `{
  base: "data-[stack-index='0']:bg-overlay-backdrop",
}`,
        container: `{
  base: [
    'w-full border-0 ui-surface shadow-elevation-overlay outline-hidden',
    'data-[position=bottom]:rounded-b-none',
    'data-[position=bottom]:inset-shadow-black data-[position=bottom]:inset-shadow-sm/20',
    'data-[position=left]:rounded-none data-[position=right]:rounded-none',
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
      component: 'Sidebar',
      text: "v19 renders the mobile Sidebar drawer through `Sheet` from the start edge (DST-1867). `Sidebar.overlay` and `Sidebar.modal` are gone: the backdrop, surface, shadow and slide-in come from `Sheet`, and the slide follows the swipe and mirrors in right-to-left layouts. Remove both slots, along with any `animate-slide-in-left`/`animate-slide-out-left` classes, which theme-rui no longer defines. Style the drawer's contents through `Sidebar.root` as before, and its surface through `Sheet.container` with `data-[position=left]:`/`data-[position=right]:`.",
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
  transforms: [
    comboBoxValueProps,
    trayGroupSelector,
    systemTextClassMaps,
    systemSvg,
    dateImports,
  ],
};
