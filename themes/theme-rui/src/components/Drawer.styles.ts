import { ThemeComponent, cva } from '@marigold/system';

export const Drawer: ThemeComponent<'Drawer'> = {
  overlay: cva(['group/overlay'], {
    variants: {
      variant: {
        right:
          'entering:animate-slide-in-right exiting:animate-slide-out-right top-0 right-0',
        left: 'entering:animate-slide-in-left exiting:animate-slide-out-left top-0 left-0',
        top: '[&>:first-child]:h-full entering:animate-slide-in-top exiting:animate-slide-out-top top-0 left-0',
        bottom:
          '[&>:first-child]:h-full entering:animate-slide-in-bottom exiting:animate-slide-out-bottom bottom-0 left-0',
      },
      size: {
        default: 'w-80',
        xsmall: 'w-64',
        small: 'w-72',
        medium: 'w-96',
      },
    },
    compoundVariants: [
      {
        variant: ['top', 'bottom'],
        size: ['default', 'xsmall', 'small', 'medium'],
        class: 'w-full',
      },
      {
        variant: ['top', 'bottom'],
        size: 'xsmall',
        class: 'h-48',
      },
      {
        variant: ['top', 'bottom'],
        size: 'small',
        class: 'h-64',
      },
      {
        variant: ['top', 'bottom'],
        size: 'medium',
        class: 'h-80',
      },
    ],
  }),
  container: cva([
    'w-full relative grid-rows-[auto_1fr_auto]',
    'util-surface-overlay border-y-0! border-r-0!',
  ]),
  closeButton: cva(['absolute top-3.5 right-3 z-50', 'size-7']),
  header: cva('border-border border-b px-6 py-4'),
  title: cva('font-semibold text-base'),
  content: cva('px-6 py-4 overflow-y-auto outline-none'),
  actions: cva(
    'flex flex-row gap-3 justify-end border-border border-t px-6 py-4'
  ),
};
