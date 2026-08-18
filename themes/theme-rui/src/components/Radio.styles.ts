import { ThemeComponent, cva } from '@marigold/system';

export const Radio: ThemeComponent<'Radio'> = {
  container: cva({
    base: [
      'gap-x-2',
      'group-disabled/radio:cursor-not-allowed',
      'group-data-[orientation=vertical]/radiogroup:py-1',
      'group-data-[orientation=horizontal]/radiogroup:px-1.5',
    ],
  }),
  label: cva({
    base: [
      'text-sm leading-4 font-normal cursor-pointer w-full',
      'group-disabled/radio:text-disabled group-disabled/radio:cursor-not-allowed',
    ],
  }),
  radio: cva({
    base: [
      'aspect-square size-4 rounded-full',
      // Matches Checkbox: tiny, always on white, so a +0.06 alpha step on
      // control-border restores the old opaque-border weight. Token-derived.
      'border border-[oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_+_0.06))] bg-surface',
      'group-focus-visible/radio:ui-state-focus outline-none',
      'group-disabled/radio:group-selected/radio:bg-disabled-surface group-disabled/radio:border-disabled-surface! group-disabled/radio:cursor-not-allowed',
      'group-selected/radio:border-selected-bold group-selected/radio:bg-selected-bold group-selected/radio:text-selected-bold-foreground',
      // Same step and the same load-bearing exclusions as Checkbox, minus
      // `focus-visible`: this slot never flips its border on focus, so there is
      // no declaration for hover to outrank. `disabled` is absent for the same
      // reason it is in Checkbox — `border-disabled-surface!` carries
      // `!important` and wins regardless. Switch has to name it explicitly
      // because its disabled rule does not.
      'group-hover/radio:not-group-read-only/radio:not-group-selected/radio:border-[oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_+_0.18))]',
    ],
  }),
  group: cva({}),
};
