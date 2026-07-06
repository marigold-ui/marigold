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
      'border border-[oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_+_0.06))] shadow-elevation-border bg-surface',
      'group-focus-visible/radio:ui-state-focus outline-none',
      'group-disabled/radio:group-selected/radio:bg-disabled-surface group-disabled/radio:border-disabled-surface! group-disabled/radio:cursor-not-allowed',
      'group-selected/radio:border-selected-bold group-selected/radio:bg-selected-bold group-selected/radio:text-selected-bold-foreground',
    ],
  }),
  group: cva({}),
};
