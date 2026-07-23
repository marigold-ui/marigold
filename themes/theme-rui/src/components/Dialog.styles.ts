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
      // Hoists the body's scroll timeline into scope for the sibling header's seam.
      'ui-scroll-seam-scope',
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
  // Borderless at rest, grows a bottom seam as the body scrolls under it
  // (scroll-driven, see `ui-scroll-seam-*` in ui.css). On `header` so it also
  // covers the bare `<Title>` chrome, which reuses these classNames.
  header: cva({
    base: 'flex flex-col text-center sm:text-left px-6 pt-6 ui-scroll-seam-header',
  }),
  title: cva({ base: 'text-lg font-semibold mb-1' }),
  description: cva({ base: 'text-sm text-secondary' }),
  // Declares the named scroll timeline the header seam animates against.
  content: cva({ base: 'ui-panel-content text-sm ui-scroll-seam-timeline' }),
  actions: cva({
    base: 'ui-panel-actions flex-col-reverse sm:flex-row',
  }),
};
