import { ThemeComponent, cva } from '@marigold/system';

export const Drawer: ThemeComponent<'Drawer'> = {
  overlay: cva({
    base: [
      'group/overlay z-40',
      'placement-top:w-full placement-top:entering:animate-slide-in-top placement-top:exiting:animate-slide-out-top placement-top:top-0 placement-top:left-0',
      'placement-bottom:w-full placement-bottom:entering:animate-slide-in-bottom placement-bottom:exiting:animate-slide-out-bottom placement-bottom:bottom-0 placement-bottom:left-0',
      'placement-left:entering:animate-slide-in-left placement-left:exiting:animate-slide-out-left placement-left:top-0 placement-left:left-0',
      'placement-right:entering:animate-slide-in-right placement-right:exiting:animate-slide-out-right placement-right:top-0 placement-right:right-0',
    ],
  }),
  container: cva({
    base: [
      'w-full relative grid-rows-[auto_1fr_auto]',
      // TODO: if we keep placement we need direction aware shadows
      'bg-surface border-surface-border ui-elevation-overlay util-scrollbar',
      'placement-right:border-l placement-left:border-r placement-top:border-b placement-bottom:border-t',
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
  closeButton: cva({ base: ['absolute top-3.5 right-3 z-50', 'size-7'] }),
  header: cva({ base: 'border-border border-b px-6 py-4' }),
  title: cva({ base: 'font-semibold text-base' }),
  content: cva({ base: 'px-6 py-4 overflow-y-auto outline-none' }),
  actions: cva({
    base: 'flex flex-row gap-3 justify-end border-border border-t px-6 py-4',
  }),
};
