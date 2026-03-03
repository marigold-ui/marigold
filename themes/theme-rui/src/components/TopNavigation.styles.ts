import { ThemeComponent, cva } from '@marigold/system';

export const TopNavigation: ThemeComponent<'TopNavigation'> = {
  container: cva({
    base: [
      'w-full h-14',
      'bg-background border-b border-border shadow-elevation-border',
      'gap-4 px-3 my-2 sm:gap-12 sm:px-4',
    ],
  }),
  start: cva({ base: 'flex items-center gap-4' }),
  middle: cva({
    base: 'flex items-end *:-mb-px ui-scrollbar overflow-x-auto overflow-y-hidden whitespace-nowrap h-full snap-mandatory',
  }),
  end: cva({ base: 'flex items-center justify-end gap-4' }),
};
