import { ThemeComponent, cva } from '@marigold/system';

export const TopNavigation: ThemeComponent<'TopNavigation'> = {
  container: cva({
    base: [
      'w-full min-h-14',
      // Bottom edge: the shell's structural line under the sticky bar, always
      // on (the `border` hue, matching the sidebar's edge).
      'border-b border-border',
      'gap-4 px-3 sm:gap-6 md:gap-8 lg:gap-12',
    ],
  }),
  start: cva({ base: 'flex justify-start gap-4' }),
  middle: cva({
    base: 'flex items-end',
  }),
  end: cva({ base: 'flex justify-end gap-4' }),
};
