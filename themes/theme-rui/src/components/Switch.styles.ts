import { type ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva({
    base: 'disabled:cursor-not-allowed disabled:text-disabled',
  }),
  track: cva({
    base: [
      'flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors',
      'border-2 border-transparent', // this increases the hit area so it is 24px
      'group-disabled/switch:bg-disabled-surface group-disabled/switch:text-disabled group-selected/switch:group-disabled/switch:bg-disabled-surface group-selected/switch:group-disabled/switch:text-disabled',
      'group-selected/switch:bg-selected-bold bg-control',
      'group-focus-visible/switch:ui-state-focus outline-none',
    ],
  }),
  thumb: cva({
    base: [
      'pointer-events-none block size-5 rounded-full',
      'bg-surface shadow-elevation-border',
      'ring-0 transition-transform duration-150 ease-out-quint',
      'group-selected/switch:translate-x-4 translate-x-0',
    ],
  }),
};
