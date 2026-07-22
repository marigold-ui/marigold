import { type ThemeComponent, cva } from '@marigold/system';

export const OverflowRegion: ThemeComponent<'OverflowRegion'> = {
  // Structural classes (nowrap, clipping, shrink, hidden-item handling)
  // live in the component; the theme only owns the visual rhythm.
  container: cva({ base: 'gap-2' }),
  item: cva({}),
  indicator: cva({}),
};
