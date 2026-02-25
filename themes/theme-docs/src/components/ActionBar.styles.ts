import { type ThemeComponent, cva } from '@marigold/system';

export const ActionBar: ThemeComponent<'ActionBar'> = {
  container: cva({
    base: [
      'relative w-fit',
      'flex items-center justify-between gap-14',
      'px-6 py-3',
      'bg-neutral-900 text-white',
      'rounded-full font-medium',
    ],
  }),
  selection: cva({ base: 'flex items-center' }),
  count: cva({
    base: 'flex items-center text-sm font-medium whitespace-nowrap',
  }),
  toolbar: cva({
    base: [
      'flex items-center gap-0',
      'flex-1 justify-center',
      'overflow-x-auto',
    ],
  }),
  clearButton: cva({
    base: [
      'inline-flex items-center justify-center',
      'shrink-0 size-8 rounded-full cursor-pointer transition-colors',
      'hover:bg-white/10',
      'focus-visible:outline-2 outline-none',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      '[&_svg]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    ],
  }),
  button: cva({
    base: [
      'inline-flex items-center justify-center gap-2',
      'whitespace-nowrap rounded-lg font-medium',
      'cursor-pointer border-transparent',
      'focus-visible:outline-2 outline-none',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'hover:bg-white/10',
      'text-sm h-9 px-3 [&_svg]:size-4',
    ],
  }),
};
