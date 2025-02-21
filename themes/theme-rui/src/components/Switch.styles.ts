import { type ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva('disabled:cursor-not-allowed disabled:opacity-70'),
  track: cva([
    'inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full',
    'border-2 border-transparent',
    'group-disabled/switch:opacity-50',
    'group-selected/switch:bg-brand bg-input',
    'outline-offset-2 group-[focus-visible]/switch:outline-2 group-[focus-visible]/switch:outline-ring/70',
  ]),
  thumb: cva([
    'pointer-events-none block size-5 rounded-full',
    'bg-background shadow-sm shadow-black/5',
    'ring-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'group-selected/switch:translate-x-4 translate-x-0 rtl:group-selected/switch:-translate-x-4',
  ]),
};
