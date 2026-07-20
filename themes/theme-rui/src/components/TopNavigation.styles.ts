import { ThemeComponent, cva } from '@marigold/system';

export const TopNavigation: ThemeComponent<'TopNavigation'> = {
  container: cva({
    base: [
      'w-full min-h-topbar',
      // Bottom edge: the shell's structural line under the sticky bar, always
      // on (the `border` hue, matching the sidebar's edge).
      'border-b border-border',
      'gap-4 px-3 sm:gap-6 md:gap-8 lg:gap-12',
    ],
  }),
  // gap-6: no vertical dividers, so the start zones (brand · toggle ·
  // breadcrumbs) separate by rhythm alone — 1.5rem reads larger than any
  // within-zone gap.
  start: cva({ base: 'flex justify-start gap-6' }),
  middle: cva({
    base: 'flex items-end',
  }),
  end: cva({ base: 'flex justify-end gap-4' }),
};
