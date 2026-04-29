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
      'rounded-xl ui-surface util-scrollbar',
      'shadow-[var(--shadow-elevation-overlay),0_0_3px_1px_oklch(0_0_0/0.06)]',
      '[--ui-border-color:oklch(from_var(--color-border)_calc(l-0.1)_c_h)]',
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
  header: cva({ base: 'ui-panel-header' }),
  title: cva({ base: 'font-semibold text-base' }),
  content: cva({ base: 'px-6 py-4 overflow-y-auto outline-none' }),
  actions: cva({ base: 'ui-panel-actions' }),
};
