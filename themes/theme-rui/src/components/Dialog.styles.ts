import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva([
    'absolute size-7',
    // Mobile positioning
    'top-4 right-4',
    // Desktop positioning
    'sm:top-6 sm:right-3',
  ]),
  container: cva(
    [
      'flex flex-col gap-0 overflow-y-auto rounded-xl',
      'util-surface-overlay',
      // Mobile: Adjust padding and height for fullscreen
      'p-4 h-full',
      // Desktop: restore original padding and height
      'sm:p-6 sm:h-auto',
    ],
    {
      variants: {
        variant: {},
        // Does not do anything, just to make the size appear in the appearance demo (Modal is setting the size)
        size: {
          xsmall: '',
          small: '',
          medium: '',
        },
      },
    }
  ),
  header: cva('flex flex-col gap-1 text-center sm:text-left'),
  title: cva('text-lg font-semibold mb-1'),
  content: cva('text-muted-foreground text-sm'),
  actions: cva('flex flex-col-reverse gap-3 sm:flex-row sm:justify-end mt-4'),
};
