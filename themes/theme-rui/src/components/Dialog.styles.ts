import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva({ base: ['absolute top-6 right-3', 'size-7'] }),
  container: cva({
    base: [
      'flex flex-col gap-0 rounded-xl overflow-y-auto',
      'ui-surface shadow-elevation-overlay ui-scrollbar',
      // Inside a Popover (ContextualHelp) the Popover paints the overlay
      // surface; the dialog drops its own border + elevation to avoid a double
      // frame. As a modal (no popover ancestor) it keeps them.
      'group-data-trigger/popover:ring-0 group-data-trigger/popover:shadow-none',
      // Hoists the content's scroll timeline into scope for the header and
      // actions seams.
      'ui-scroll-seam-scope',
      // Without content, the seams' fallback would stack two lines.
      'not-has-[[data-slot=content]:not(:empty)]:[--seam-fallback-color:transparent]',
    ],
    variants: {
      variant: {},
      // Modal sets the width and height. These exist so the sizes appear in the
      // appearance demo, and so `fullscreen` can pin the seams on.
      size: {
        xsmall: '',
        small: '',
        medium: '',
        large: '',
        // Often scrolls an inner region, such as a table, which the seams
        // cannot see.
        fullscreen: [
          '**:data-[slot=header]:animate-none',
          '**:data-[slot=header]:shadow-[0_1px_0_0_var(--color-border)]',
          '**:data-[slot=actions]:animate-none',
          '**:data-[slot=actions]:shadow-[0_-1px_0_0_var(--color-border)]',
        ],
      },
    },
  }),
  // A bare `<Title>` takes `header` and `title` together, so the seam and the
  // title/description gap live here.
  header: cva({
    base: 'flex flex-col gap-1 text-center sm:text-left px-6 pt-6 pb-1 ui-scroll-seam-header',
  }),
  title: cva({ base: 'text-lg font-semibold' }),
  description: cva({ base: 'text-sm text-secondary' }),
  content: cva({
    base: 'ui-surface-content text-sm ui-scroll-seam-timeline empty:hidden',
  }),
  actions: cva({
    base: 'ui-surface-actions flex-col-reverse sm:flex-row border-t-0 ui-scroll-seam-footer',
  }),
};
