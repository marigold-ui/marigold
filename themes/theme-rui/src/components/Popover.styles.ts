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
      // Popover padding. Anchored popovers are tighter than the dialog
      // rhythm, the tray keeps it like every tray.
      '[--popover-px:calc(var(--spacing)*4)]',
      'data-tray:[--popover-px:var(--ui-surface-px)]',
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
      // The search row still spans the popover edge to edge.
      'not-has-[[data-slot=content]]:*:data-[slot=search]:-mx-(--popover-px)',
      'not-has-[[data-slot=content]]:*:data-[slot=search]:mt-0',
      'not-has-[[data-slot=content]]:*:data-[slot=search]:first:-mt-3',
    ],
  }),
  title: cva({ base: 'px-(--popover-px) pt-3 text-base font-semibold' }),
  description: cva({
    base: 'text-secondary px-(--popover-px) pt-1 text-sm',
  }),
  // A borderless row spanning the popover. Under a title it sits between two
  // dividers. As the first part it is the header, with only the divider below.
  search: cva({
    base: [
      'border-border border-b py-1',
      'not-first:border-t not-first:mt-3',
      // Inset so the field's icon lines up with the title text.
      'px-[calc(var(--popover-px)-var(--spacing)*2.5)]',
      // The field drops its frame: the row is the field.
      '[&_input]:rounded-none [&_input]:bg-transparent [&_input]:ring-0',
      '[&_input:focus]:outline-hidden',
      // No clear button while empty, so the placeholder gets its room back.
      '[&_[data-empty]_input]:pr-2',
      // Keyboard focus marks the whole row, like a ListView row.
      'has-[input[data-focus-visible]]:inset-ring-2',
      'has-[input[data-focus-visible]]:inset-ring-ring/50',
    ],
  }),
  content: cva({
    base: [
      'flex flex-col gap-3 px-(--popover-px) py-3 outline-none',
      '[--bleed-px:initial]',
      'data-bleed:px-0 data-bleed:[--bleed-px:var(--popover-px)]',
      // A ListView or Table (both `role=grid`) placed directly in the content
      // spans it edge to edge. As the last child it sits flush against the
      // popover's bottom, and as the first child right under the search row's
      // divider: its rows carry their own padding. Under a plain header it
      // keeps the top padding, since there is no divider to separate them.
      // Content around it keeps its spacing. "First" and "last" skip the
      // hidden nodes React Aria renders beside a collection (a `<template>`
      // and focus scope markers).
      'not-data-bleed:*:[&[role=grid]]:-mx-(--popover-px)',
      '*:[&[role=grid]]:w-auto',
      '*:[&[role=grid]]:[--bleed-px:var(--popover-px)]',
      '[[data-slot=search]+&]:*:[&[role=grid]:nth-child(1_of_:not(template,[hidden]))]:-mt-3',
      '*:[&[role=grid]:nth-last-child(1_of_:not(template,[hidden]))]:-mb-3',
    ],
  }),
};
