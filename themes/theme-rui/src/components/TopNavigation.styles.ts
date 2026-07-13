import { ThemeComponent, cva } from '@marigold/system';

export const TopNavigation: ThemeComponent<'TopNavigation'> = {
  container: cva({
    base: [
      'w-full min-h-14',
      // Seamless shell: borderless at rest; once page content scrolls under
      // the sticky bar, `ui-scroll-edge` fades in a bottom hairline so the
      // seam stays legible (progressive enhancement, see ui.css).
      'ui-scroll-edge',
      'gap-4 px-3 sm:gap-6 md:gap-8 lg:gap-12',
    ],
  }),
  start: cva({ base: 'flex justify-start gap-4' }),
  middle: cva({
    base: 'flex items-end',
  }),
  end: cva({ base: 'flex justify-end gap-4' }),
};
