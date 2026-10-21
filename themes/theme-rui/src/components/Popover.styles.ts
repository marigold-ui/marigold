import { type ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = {
  container: cva({
    base: [
      'group/popover',
      'outline-0',
      // The Popover owns the overlay surface: fill, decorative rim, and overlay
      // elevation. Its content (ListBox, Menu, Calendar, Dialog) renders flat inside
      // it and relies on this frame. `overflow-hidden` clips it to the rounded rim.
      'ui-surface shadow-elevation-overlay overflow-hidden',
      'placement-top:mb-1',
      'placement-bottom:mt-1',
      'placement-right:ml-1',
      'placement-left:mr-1',
    ],
  }),
  // The dialog inside `<Popover.Content>`. It sits flat on the container's
  // surface and only adds the padding rhythm and the width tokens.
  content: cva({
    base: [
      'flex flex-col gap-3 outline-none',
      'px-(--ui-surface-px) py-4',
      'overflow-y-auto ui-scrollbar',
      'data-small:w-3xs data-medium:w-xs data-large:w-md',
    ],
  }),
  title: cva({ base: 'text-base font-semibold' }),
  // Pulls up against the title so the pair reads as one header, while the
  // content's gap still separates it from the body below.
  description: cva({ base: 'text-secondary -mt-2 text-sm' }),
};
