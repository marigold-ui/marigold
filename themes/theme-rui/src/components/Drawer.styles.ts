import { ThemeComponent, cva } from '@marigold/system';

export const Drawer: ThemeComponent<'Drawer'> = {
  overlay: cva({
    base: [
      'group/overlay',
      '[--slide-offset:1rem]',
      'inset-y-4 right-4 entering:animate-slide-in-right exiting:animate-slide-out-right',
    ],
  }),
  container: cva({
    base: [
      'w-full relative grid-rows-[auto_1fr_auto]',
      // On small screens the Drawer sits in a `Sheet`, which draws the surface
      // and the drag handle above it.
      'sm:rounded-xl sm:ui-surface sm:shadow-elevation-overlay sm:h-full ui-scrollbar',
      '[--ui-border-color:oklch(from_var(--ui-divider-solid)_calc(l-0.1)_c_h)]',
      'has-[>[data-slot=close]]:**:data-[slot=header]:pe-12',
    ],
    variants: {
      size: {
        xsmall: 'sm:w-64',
        small: 'sm:w-72',
        medium: 'sm:w-96',
      },
    },
  }),
  // On small screens it is the one exit that always stays, so it gets a full
  // touch target there, centred where the small one sits.
  closeButton: cva({
    base: [
      'absolute top-3.5 right-3 size-7',
      'max-sm:top-1.5 max-sm:right-1 max-sm:size-touch-target',
    ],
  }),
  header: cva({ base: 'ui-surface-header' }),
  title: cva({ base: 'font-semibold text-base' }),
  description: cva({ base: 'text-sm text-secondary mt-0.5' }),
  content: cva({ base: 'ui-surface-content' }),
  actions: cva({ base: 'ui-surface-actions' }),
};
