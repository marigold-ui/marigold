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
  // Always-on bottom divider, matching the top divider on `actions` and the
  // Drawer/Tray anatomy (`ui-surface-header`). On `header` so it also covers
  // the bare `<Title>` chrome, which reuses these classNames.
  header: cva({
    base: 'flex flex-col text-center sm:text-left px-6 pt-6 pb-4 border-b border-border',
  }),
  title: cva({ base: 'text-lg font-semibold mb-1' }),
  description: cva({ base: 'text-sm text-secondary' }),
  content: cva({ base: 'ui-surface-content text-sm' }),
  // The top divider separates the actions from the content. Without content
  // (title + actions only) the header's divider already does that, so drop
  // this one rather than stack two lines.
  actions: cva({
    base: 'ui-surface-actions flex-col-reverse sm:flex-row [:not(.ui-surface-content)+&]:border-t-0',
  }),
};
