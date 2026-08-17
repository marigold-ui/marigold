import { type ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva({
    base: [
      'grid gap-x-2 items-center',
      'disabled:cursor-not-allowed disabled:text-disabled',
      'group-data-booleanfield/booleanfield:grid-cols-subgrid group-data-booleanfield/booleanfield:col-span-full',
    ],
    variants: {
      variant: {
        default: 'grid-cols-[auto_1fr]',
        settings: 'grid-cols-[1fr_auto]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  track: cva({
    base: [
      'h-4 w-7',
      'flex shrink-0 cursor-pointer items-center rounded-full transition-colors',
      'border-2 border-transparent',
      'group-disabled/switch:bg-disabled-surface group-disabled/switch:text-disabled group-selected/switch:group-disabled/switch:bg-disabled-surface group-selected/switch:group-disabled/switch:text-disabled',
      'group-selected/switch:bg-selected-bold bg-control',
      // Hover tint as a background *image*, not a background-color: the toggle
      // needs the `transition-colors` above, but hover must not inherit its
      // 150ms fade (DST-1436), and background-image is not a transitioned
      // property — so this lands instantly while the toggle keeps easing.
      //
      // It layers over the track instead of replacing it, so the alpha is the
      // step that composites 0.16 -> 0.30, matching the Checkbox/Radio step.
      // Exclusions are load-bearing, see Checkbox.styles.ts.
      'group-hover/switch:not-group-read-only/switch:not-group-selected/switch:not-group-disabled/switch:bg-[image:linear-gradient(oklch(from_var(--color-control)_l_c_h_/_calc(0.14_/_(1_-_alpha))),oklch(from_var(--color-control)_l_c_h_/_calc(0.14_/_(1_-_alpha))))]',
      'group-focus-visible/switch:ui-state-focus outline-none',
    ],
  }),
  thumb: cva({
    base: [
      'size-3 group-selected/switch:translate-x-3',
      'pointer-events-none block rounded-full',
      'bg-surface',
      'ring-0 transition-transform duration-150 ease-out-quint',
      'translate-x-0',
    ],
  }),
};
