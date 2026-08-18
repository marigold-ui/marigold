import { ThemeComponent, cva } from '@marigold/system';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  checkbox: cva({
    base: [
      'grid size-4 shrink-0 place-content-center rounded',
      // Checkbox is tiny and always on white, where control-border composites a
      // touch lighter than the old opaque edge; a +0.06 alpha step lands it back
      // on the old boundary weight. Derived from the token so it tracks any change.
      'border border-[oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_+_0.06))] bg-surface',
      'group-focus-visible/checkbox:ui-state-focus group-focus-visible/checkbox:border-(--ui-border-color) outline-none',
      'group-disabled/checkbox:group-selected/checkbox:bg-disabled-surface group-disabled/checkbox:border-disabled-surface! group-disabled/checkbox:text-disabled group-disabled/checkbox:cursor-not-allowed',
      'group-selected/checkbox:border-selected-bold group-selected/checkbox:bg-selected-bold group-selected/checkbox:text-selected-bold-foreground',
      'group-indeterminate/checkbox:border-selected-bold group-indeterminate/checkbox:bg-selected-bold group-indeterminate/checkbox:text-selected-bold-foreground',
      'group-hover/checkbox:group-disabled/checkbox:bg-disabled-surface',
      // Matches ToggleButton's hover step, not its value — this slot idles at
      // +0.06, so its +0.12 would be half the step. Each `:not()` outranks a
      // state rule above; removing one lets hover repaint that state.
      //
      // `focus-visible` is in the chain for that reason and not for symmetry:
      // this rule lands at (0,5,0) against (0,2,0) for the focus-visible border
      // above, so without it hover wins on a focused checkbox and the border
      // never flips to --color-ring. That leaves the halo as the only thing
      // separating focused from hovered, and the halo alone is 2.08:1.
      // `disabled` is absent by contrast: its rule carries `!important`.
      'group-hover/checkbox:not-group-focus-visible/checkbox:not-group-read-only/checkbox:not-group-selected/checkbox:not-group-indeterminate/checkbox:border-[oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_+_0.18))]',
    ],
  }),
  container: cva({
    base: [
      'grid grid-cols-[auto_1fr] gap-x-2 items-start',
      'cursor-pointer read-only:cursor-default',
      'group-data-[booleanfield]/booleanfield:grid-cols-subgrid group-data-[booleanfield]/booleanfield:col-span-full',
      'group-data-[orientation=vertical]/checkboxgroup:py-1',
      'group-data-[orientation=horizontal]/checkboxgroup:px-1.5',
    ],
  }),
  label: cva({
    base: [
      'flex items-center gap-1',
      'text-sm leading-4 group-[&]/checkboxgroup:font-normal font-medium text-foreground',
      'group-disabled/checkbox:text-disabled',
    ],
  }),
  group: cva({ base: 'flex flex-col' }),
};
