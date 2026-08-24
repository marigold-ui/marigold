import { type ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva({
    base: [
      // `items-start`, matching Checkbox and Radio: the track belongs on the
      // label's *first* line. Under `items-center` a wrapping `settings` label
      // floated the track to the middle of the block instead (DST-1607).
      // One-line labels are unaffected — the label slot below gives them a
      // 16px line box, the same height as the track.
      'grid gap-x-2 items-start',
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
  // Deliberately not the shared `Label`: its `leading-none` gives a 14px line
  // against a 16px track, so first-line anchoring would land 1px off. Switch is
  // also the only field that used `Label` *inside* the control's own `<label>`,
  // where it contributed nothing the name computation needs — the accessible
  // name comes from the wrapping `<label>`'s text either way. This matches the
  // Checkbox and Radio label slots instead.
  label: cva({
    base: [
      'flex items-start gap-1 min-w-0',
      'text-sm leading-4 font-medium text-foreground',
      // The container sets `disabled:text-disabled`, but `text-foreground` here
      // would out-specify the inherited colour, so restate it.
      'group-disabled/switch:text-disabled',
    ],
  }),
  track: cva({
    base: [
      'h-4 w-7',
      'flex shrink-0 items-center rounded-full transition-colors',
      'border-2 border-transparent',
      'group-disabled/switch:bg-disabled-surface group-disabled/switch:text-disabled group-selected/switch:group-disabled/switch:bg-disabled-surface group-selected/switch:group-disabled/switch:text-disabled',
      'group-selected/switch:bg-selected-bold bg-control',
      // background-image so the toggle keeps `transition-colors` (DST-1436) while
      // hover lands instantly; it layers rather than replaces, hence
      // 0.14/(1-alpha) to match the Checkbox/Radio step. Exclusions are
      // load-bearing, see Checkbox.styles.ts.
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
