import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva({ base: ['absolute top-6 right-3', 'size-7'] }),
  container: cva({
    base: [
      'group/dialog flex flex-col gap-0 rounded-xl overflow-y-auto',
      'ui-surface shadow-elevation-overlay ui-scrollbar',
      // Inside a Popover (ContextualHelp) the Popover paints the overlay
      // surface; the dialog drops its own border + elevation to avoid a double
      // frame. As a modal (no popover ancestor) it keeps them.
      'group-data-trigger/popover:ring-0 group-data-trigger/popover:shadow-none',
    ],
    variants: {
      variant: {},
      // Does not do anything, just to make the size appear in the appearance demo (Modal is setting the size)
      size: {
        xsmall: '',
        small: '',
        medium: '',
        large: '',
        fullscreen: '',
      },
    },
  }),
  // A bare `<Title>` takes `header` and `title` together, so the title/description
  // spacing is a `gap` here rather than a margin on the heading.
  header: cva({
    base: 'flex flex-col gap-1 text-center sm:text-left px-6 pt-6 pb-1',
  }),
  title: cva({ base: 'text-lg font-semibold' }),
  description: cva({ base: 'text-sm text-secondary' }),
  // The content draws both dividers, and only where it is cut off by scrolling
  // (`ui-scroll-dividers-y`). The top one needs a header above it, the bottom
  // one actions below it. Hidden when empty, e.g. a ConfirmationDialog without
  // children.
  content: cva({
    base: [
      'ui-surface-content ui-scroll-dividers-y text-sm empty:hidden',
      'group-has-[>[data-slot=header]]/dialog:border-t',
      'group-has-[>[data-slot=actions]]/dialog:border-b',
    ],
  }),
  // The content's bottom divider replaces the actions' own.
  actions: cva({
    base: 'ui-surface-actions flex-col-reverse sm:flex-row border-t-0',
  }),
};
