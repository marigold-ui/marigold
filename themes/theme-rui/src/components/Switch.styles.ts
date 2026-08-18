import { type ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva({
    base: [
      'grid gap-x-2 items-center',
      // Cursor lives here, on the whole hit area, so the label reads as clickable
      // too — and inherits down to the track, where a local rule would otherwise
      // outrank the disabled/read-only cursors below.
      'cursor-pointer read-only:cursor-default',
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
      'flex shrink-0 items-center rounded-full transition-colors',
      'border-2 border-transparent',
      'group-disabled/switch:bg-disabled-surface group-disabled/switch:text-disabled group-selected/switch:group-disabled/switch:bg-disabled-surface group-selected/switch:group-disabled/switch:text-disabled',
      'group-selected/switch:bg-selected-bold bg-control',
      // background-image, not background-color: the track keeps
      // `transition-colors` for the toggle (DST-1436), and background-image is
      // not transitioned, so hover lands instantly. It layers over the track
      // rather than replacing it, hence 0.14/(1-alpha) to reach the same step as
      // Checkbox/Radio. Exclusions are load-bearing, see Checkbox.styles.ts.
      'group-hover/switch:not-group-read-only/switch:not-group-selected/switch:not-group-disabled/switch:bg-[image:linear-gradient(oklch(from_var(--color-control)_l_c_h_/_calc(0.14_/_(1_-_alpha)))_0_0)]',
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
