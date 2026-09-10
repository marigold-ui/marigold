import { type ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva({
    base: [
      'grid gap-x-2 items-start',
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
  label: cva({
    base: [
      'flex items-start gap-1 min-w-0',
      'text-sm leading-4 font-medium text-foreground',
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
