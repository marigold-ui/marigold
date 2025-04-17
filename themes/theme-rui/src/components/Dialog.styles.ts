import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva([
    'absolute top-6 right-3',
    'flex size-7 items-center justify-center rounded transition-[color,box-shadow]',
    'focus-visible:utility-focus-ring',
    '[&_svg]:size-4 [&_svg]:opacity-60 [&_svg]:transition-opacity hover:[&_svg]:opacity-100',
  ]),
  container: cva(
    [
      'flex flex-col gap-0 p-0',
      'bg-surface-overlay rounded-xl border p-6 shadow-lg overflow-y-auto',
      'w-full max-w-[calc(100%-2rem)]',
      'sm:max-h-[min(640px,80vh)] max-h-[calc(100%-2rem)]',
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

/**
sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden

 */
