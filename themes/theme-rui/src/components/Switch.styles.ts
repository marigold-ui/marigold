import { type ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva({
    base: 'disabled:cursor-not-allowed disabled:text-disabled-foreground',
  }),
  track: cva({
    base: [
      'flex shrink-0 cursor-pointer items-center rounded-full transition-colors',
      'border-2 border-transparent',
      'group-disabled/switch:bg-disabled group-disabled/switch:text-disabled-foreground group-selected/switch:group-disabled/switch:bg-disabled group-selected/switch:group-disabled/switch:text-disabled-foreground',
      'group-selected/switch:bg-brand bg-input',
      'group-focus-visible/switch:ui-state-focus outline-none',
    ],
    variants: {
      size: {
        default: 'h-4 w-7',
        large: 'h-6 w-10',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }),
  thumb: cva({
    base: [
      'pointer-events-none block rounded-full',
      'bg-background shadow-elevation-border',
      'ring-0 transition-transform duration-150 ease-out-quint',
      'translate-x-0',
    ],
    variants: {
      size: {
        default: 'size-3 group-selected/switch:translate-x-3',
        large: 'size-5 group-selected/switch:translate-x-4',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }),
};
