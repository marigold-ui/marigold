import { ThemeComponent, cva } from '@marigold/system';

export const Toast: ThemeComponent<'Toast'> = {
  toast: cva({
    base: [
      'ui-surface shadow-elevation-overlay',
      'max-w-sm w-full pointer-events-auto overflow-hidden text-foreground',
      'grid grid-cols-[auto_1fr_auto_auto] grid-rows-[auto_auto] gap-x-1 gap-y-0',
      "[grid-template-areas:'icon_title_action_close''icon_description_action_close'] focus-visible:ui-state-focus outline-none",
      'p-4',
    ],
  }),
  title: cva({
    base: [
      'text-sm font-medium',
      '[grid-area:title]',
      'flex items-center mb-0',
    ],
  }),
  description: cva({
    base: ['text-secondary text-sm', '[grid-area:description] mt-0'],
  }),
  closeButton: cva({
    base: [
      '[grid-area:close] row-end-1',
      'ml-2',
      'flex items-center justify-center',
      'size-5 rounded transition-[color,box-shadow] outline-none',
      'focus-visible:ui-state-focus outline-none text-secondary hover:text-foreground',
    ],
  }),
  icon: cva({
    base: [
      '[grid-area:icon]',
      'flex items-center justify-center',
      'h-5 w-5 leading-none',
    ],
    variants: {
      variant: {
        default: '',
        success: 'text-success-accent',
        warning: 'text-warning-accent',
        info: 'text-info-accent',
        error: 'text-destructive-accent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  content: cva({ base: ['contents'] }),
  // The corner regions are anchored by a single inset, so their width is
  // shrink-to-fit against everything up to the *opposite* viewport edge: a toast
  // wider than that space grows into the other margin and loses its edge there.
  // Capping at the viewport minus both insets keeps the margin symmetric, which
  // is what starts to bite at 320px (DST-1616). `100%` resolves against the
  // viewport here (the region is `fixed`) and excludes the scrollbar, unlike `100vw`.
  'bottom-left': cva({
    base: [
      'fixed bottom-4 left-4 flex flex-col-reverse max-w-[calc(100%-2rem)]',
    ],
  }),
  'bottom-right': cva({
    base: [
      'fixed bottom-4 right-4 flex flex-col-reverse max-w-[calc(100%-2rem)]',
    ],
  }),
  'top-left': cva({
    base: ['fixed top-4 left-4 flex flex-col max-w-[calc(100%-2rem)]'],
  }),
  'top-right': cva({
    base: ['fixed top-4 right-4 flex flex-col max-w-[calc(100%-2rem)]'],
  }),
  top: cva({
    base: [
      'fixed top-4 left-1/2 right-auto -translate-x-1/2 flex flex-col items-center w-auto align-middle',
    ],
  }),
  bottom: cva({
    base: [
      'fixed bottom-4 left-1/2 right-auto -translate-x-1/2 flex flex-col-reverse items-center w-auto align-middle',
    ],
  }),
  action: cva({ base: ['[grid-area:action] flex items-start pl-4'] }),
};
