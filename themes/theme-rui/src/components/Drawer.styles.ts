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
      'rounded-xl ui-surface ui-scrollbar',
      'shadow-elevation-overlay',
      '[--ui-border-color:oklch(from_var(--ui-divider-solid)_calc(l-0.1)_c_h)]',
      'h-full',
    ],
    variants: {
      size: {
        xsmall: 'w-64',
        small: 'w-72',
        medium: 'w-96',
      },
    },
  }),
  closeButton: cva({ base: ['absolute top-3.5 right-3', 'size-7'] }),
  header: cva({ base: 'ui-surface-header' }),
  title: cva({ base: 'font-semibold text-base' }),
  description: cva({ base: 'text-sm text-secondary mt-0.5' }),
  content: cva({ base: 'ui-surface-content' }),
  actions: cva({ base: 'ui-surface-actions' }),
};
