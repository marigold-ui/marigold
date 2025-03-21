import { type ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva(
    'disabled:cursor-not-allowed disabled:text-disabled-foreground'
  ),
  track: cva([
    'inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full',
    'border-2 border-transparent',
    'group-disabled/switch:bg-disabled group-disabled/switch:text-disabled-foreground group-selected/switch:group-disabled/switch:bg-disabled group-selected/switch:group-disabled/switch:text-disabled-foreground',
    'group-selected/switch:bg-brand bg-input',
    'mixin-ring-focus-visible-switch',
  ]),
  thumb: cva([
    'pointer-events-none block size-5 rounded-full',
    'bg-background shadow-sm shadow-black/5',
    'ring-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'group-selected/switch:translate-x-4 translate-x-0 rtl:group-selected/switch:-translate-x-4',
  ]),
};
