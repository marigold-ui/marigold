import { ThemeComponent, cva } from '@marigold/system';

export const TopNavigation: ThemeComponent<'TopNavigation'> = {
  container: cva({
    base: [
      'w-full min-h-14',
      'bg-background border-b border-border shadow-elevation-border',
      'gap-12 px-2',
    ],
  }),
  start: cva({ base: 'flex items-center gap-4' }),
  middle: cva({ base: 'flex items-end *:-mb-px' }),
  end: cva({ base: 'flex items-center justify-end gap-4' }),
};
