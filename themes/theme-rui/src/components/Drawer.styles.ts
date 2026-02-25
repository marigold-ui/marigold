import { ThemeComponent, cva } from '@marigold/system';

export const Drawer: ThemeComponent<'Drawer'> = {
  overlay: cva({
    base: [
      'group/overlay',
      '[--slide-offset:1rem]',
      'placement-top:inset-x-4 placement-top:top-4 placement-top:entering:animate-slide-in-top placement-top:exiting:animate-slide-out-top',
      'placement-bottom:inset-x-4 placement-bottom:bottom-4 placement-bottom:entering:animate-slide-in-bottom placement-bottom:exiting:animate-slide-out-bottom',
      'placement-left:inset-y-4 placement-left:left-4 placement-left:entering:animate-slide-in-left placement-left:exiting:animate-slide-out-left',
      'placement-right:inset-y-4 placement-right:right-4 placement-right:entering:animate-slide-in-right placement-right:exiting:animate-slide-out-right',
    ],
  }),
  container: cva({
    base: [
      'w-full relative grid-rows-[auto_1fr_auto]',
      'rounded-xl ui-surface util-scrollbar',
      'shadow-[var(--shadow-elevation-overlay),0_0_2px_1px_oklch(0_0_0/0.1)]',
      '[--ui-border-color:oklch(from_var(--color-surface-border)_calc(l-0.02)_c_h)]',
      'placement-right:h-full placement-left:h-full',
      'placement-top:w-full placement-bottom:w-full',
    ],
    variants: {
      size: {
        xsmall: 'w-64 placement-top:sm:h-48 placement-bottom:sm:h-48',
        small: 'w-72 placement-top:sm:h-64 placement-bottom:sm:h-64',
        medium: 'w-96 placement-top:sm:h-80 placement-bottom:sm:h-80',
      },
    },
  }),
  closeButton: cva({ base: ['absolute top-3.5 right-3', 'size-7'] }),
  header: cva({ base: 'border-border border-b px-6 py-4' }),
  title: cva({ base: 'font-semibold text-base' }),
  content: cva({ base: 'px-6 py-4 overflow-y-auto outline-none' }),
  actions: cva({
    base: 'flex flex-row gap-3 justify-end border-border border-t px-6 py-4',
  }),
};
