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
  // The dialog inside `<Popover>` (the tray's body on small screens). It sits
  // flat on the container's surface and stacks title, description, search and
  // content, of which only the content scrolls.
  body: cva({
    base: [
      'flex min-h-0 flex-col outline-none',
      // Popover padding. Anchored popovers (they always carry a width) are
      // tighter than the dialog rhythm, the tray keeps it like every tray.
      '[--popover-px:var(--ui-surface-px)]',
      '[&:is([data-small],[data-medium],[data-large])]:[--popover-px:calc(var(--spacing)*4)]',
      'data-small:w-3xs data-medium:w-xs data-large:w-md',
      // Without a `<Popover.Content>`, the body takes the content's role: it
      // pads and scrolls, and title, description and search sit flush in it.
      // Spelled out in full so Tailwind's source scan picks the classes up.
      'not-has-[[data-slot=content]]:gap-3',
      'not-has-[[data-slot=content]]:overflow-y-auto',
      'not-has-[[data-slot=content]]:px-(--popover-px)',
      'not-has-[[data-slot=content]]:py-3',
      'not-has-[[data-slot=content]]:*:data-[slot=title]:p-0',
      'not-has-[[data-slot=content]]:*:data-[slot=description]:p-0',
      'not-has-[[data-slot=content]]:*:data-[slot=description]:-mt-2',
      'not-has-[[data-slot=content]]:*:data-[slot=search]:p-0',
    ],
  }),
  title: cva({ base: 'px-(--popover-px) pt-3 text-base font-semibold' }),
  description: cva({
    base: 'text-secondary px-(--popover-px) pt-1 text-sm',
  }),
  search: cva({ base: 'px-(--popover-px) pt-3' }),
  content: cva({
    base: 'flex flex-col gap-3 px-(--popover-px) py-3 outline-none',
  }),
};
