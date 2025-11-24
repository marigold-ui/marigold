import { type ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva(
    'disabled:cursor-not-allowed disabled:text-disabled-foreground'
  ),
  track: cva([
    'flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors',
    'border-2 border-transparent', // this increases the hit area so it is 24px
    'group-disabled/switch:bg-disabled group-disabled/switch:text-disabled-foreground group-selected/switch:group-disabled/switch:bg-disabled group-selected/switch:group-disabled/switch:text-disabled-foreground',
    'group-selected/switch:bg-brand bg-input',
    'group-focus-visible/switch:state-focus-borderless outline-none',
  ]),
  thumb: cva([
    'pointer-events-none block size-5 rounded-full',
    'bg-background shadow-xs',
    'ring-0 transition-transform duration-150 ease-out-quint',
    'group-selected/switch:translate-x-4 translate-x-0',
  ]),
};
