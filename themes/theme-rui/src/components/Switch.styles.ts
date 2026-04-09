import { type ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva({
    base: [
      'grid gap-x-2 items-center',
      'disabled:cursor-not-allowed disabled:text-disabled-foreground',
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
      'group-disabled/switch:bg-disabled group-disabled/switch:text-disabled-foreground group-selected/switch:group-disabled/switch:bg-disabled group-selected/switch:group-disabled/switch:text-disabled-foreground',
      'group-selected/switch:bg-brand bg-input',
      'group-focus-visible/switch:ui-state-focus outline-none',
    ],
  }),
  thumb: cva({
    base: [
      'size-3 group-selected/switch:translate-x-3',
      'pointer-events-none block rounded-full',
      'bg-background shadow-elevation-border',
      'ring-0 transition-transform duration-150 ease-out-quint',
      'translate-x-0',
    ],
  }),
};
