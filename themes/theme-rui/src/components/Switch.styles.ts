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
      'group-focus-visible/switch:ui-state-focus outline-none',
    ],
  }),
  thumb: cva({
    base: [
      'size-3 group-selected/switch:translate-x-3',
      'pointer-events-none block rounded-full',
      // `selected-bold-foreground`, not `bg-surface`: the puck is the ink that
      // sits on the ON track, so the token that names that ink is the one that
      // travels with it. On light grounds the two are visually the same value
      // (charcoal-50 vs white, 1.04:1 apart). On a contrast ground `selected-bold`
      // flips to near-white, and a `bg-surface` puck on it measured 1.04:1 — the
      // puck vanished and with it the position cue that carries the state. The
      // paired ink flips too, so this reads 16.60:1 there. The OFF track
      // (`bg-control`, which does not flip) goes 1.47:1 -> 11.31:1 on that ground.
      'bg-selected-bold-foreground',
      'ring-0 transition-transform duration-150 ease-out-quint',
      'translate-x-0',
    ],
  }),
};
