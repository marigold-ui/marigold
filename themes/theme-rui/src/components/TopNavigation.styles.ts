import { ThemeComponent, cva } from '@marigold/system';

export const TopNavigation: ThemeComponent<'TopNavigation'> = {
  container: cva({
    base: ['w-full', 'border-b border-border', 'gap-12'],
  }),
  start: cva({ base: 'flex items-center' }),
  center: cva({ base: 'flex items-end *:-mb-px' }),
  end: cva({ base: 'flex items-center justify-end gap-2' }),
};
