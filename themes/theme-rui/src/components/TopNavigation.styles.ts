import { ThemeComponent, cva } from '@marigold/system';

export const TopNavigation: ThemeComponent<'TopNavigation'> = {
  container: cva({
    base: [
      'w-full min-h-14',
      'bg-background border-b border-border shadow-elevation-border',
      'gap-4 px-3 pt-2 sm:gap-6 md:gap-8 lg:gap-12',
    ],
  }),
  start: cva({ base: 'flex justify-start gap-4' }),
  middle: cva({
    base: [
      'flex items-end ui-scrollbar overflow-x-auto overflow-y-hidden snap-mandatory',
      'p-1 -m-1',
    ],
  }),
  end: cva({ base: 'flex justify-end gap-4' }),
};
