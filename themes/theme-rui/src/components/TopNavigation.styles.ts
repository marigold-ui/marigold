import { ThemeComponent, cva } from '@marigold/system';

export const TopNavigation: ThemeComponent<'TopNavigation'> = {
  container: cva({
    base: [
      'w-full min-h-14',
      // Same hairline as the rest of the app shell (sidebar divider, header,
      // footer): the translucent surface edge at ~0.06 alpha.
      'border-b border-surface-border/60',
      'gap-4 px-3 sm:gap-6 md:gap-8 lg:gap-12',
    ],
  }),
  start: cva({ base: 'flex justify-start gap-4' }),
  middle: cva({
    base: 'flex items-end',
  }),
  end: cva({ base: 'flex justify-end gap-4' }),
};
