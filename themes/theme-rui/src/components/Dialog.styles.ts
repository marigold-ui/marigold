import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva(['absolute top-6 right-3', 'size-7 ']),
  container: cva(
    [
      'flex flex-col gap-0 rounded-xl p-6 overflow-y-auto',
      'w-full max-w-[calc(100%-2rem)] sm:max-h-[min(640px,80vh)] max-h-[calc(100%-2rem)]',
      'util-surface-overlay',
    ],
    {
      variants: {
        size: {
          default: 'sm:max-w-100',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    }
  ),
  header: cva('flex flex-col gap-1 text-center sm:text-left'),
  title: cva('text-lg font-semibold mb-1', {
    variants: {
      variant: {},
      size: {},
    },
  }),
  content: cva('text-muted-foreground text-sm'),
  actions: cva('flex flex-col-reverse gap-3 sm:flex-row sm:justify-end mt-4'),
};
