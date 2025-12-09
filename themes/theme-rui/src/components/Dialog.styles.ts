import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva(['absolute top-6 right-3', 'size-7 ']),
  container: cva(
    [
      'flex flex-col gap-0 rounded-xl p-6 overflow-y-auto',
      'surface elevation-overlay util-scrollbar',
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
