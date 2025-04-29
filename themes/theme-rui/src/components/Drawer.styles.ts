import { ThemeComponent, cva } from '@marigold/system';

export const Drawer: ThemeComponent<'Drawer'> = {
  overlay: cva([
    'group/overlay',
    'entering:animate-slide-in-right exiting:animate-slide-out-right',
  ]),
  container: cva(
    [
      'relative grid-rows-[auto_1fr_auto]',
      'util-surface-overlay border-y-0! border-r-0!',
    ],
    {
      variants: {
        size: {
          default: 'w-80',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    }
  ),
  closeButton: cva(['absolute top-3.5 right-3 z-50', 'size-7']),
  header: cva('border-border border-b px-6 py-4'),
  title: cva('font-semibold text-base'),
  content: cva('px-6 py-4 overflow-y-auto outline-none'),
  actions: cva(
    'flex flex-row gap-3 justify-end border-border border-t px-6 py-4'
  ),
};
