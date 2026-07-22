import { type ThemeComponent, cva } from '@marigold/system';

export const FilterBar: ThemeComponent<'FilterBar'> = {
  // Structural classes (nowrap, clipping, shrink) live in the component;
  // the theme only owns the visual rhythm.
  container: cva({ base: 'gap-2' }),
  region: cva({ base: 'gap-2' }),
  item: cva({}),
  // Counter on the panel trigger for active-but-demoted quick filters.
  badge: cva({
    base: 'bg-primary text-primary-foreground inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-medium',
  }),
};
