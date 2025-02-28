import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva(''),
  container: cva(
    [
      'bg-background fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100%-2rem)] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-xl',
      ' border p-6 shadow-lg duration-200 sm:max-w-100',
    ],
    {
      variants: {
        size: {
          default: '',
          small: 'w-[min(100%,640px)]',
          medium: 'w-[min(100%,768px)]',
          large: 'w-[min(100%,1024px)]',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    }
  ),
  header: cva('flex flex-col gap-1 text-center sm:text-left'),
  content: cva('text-muted-foreground text-sm'),
  actions: cva('flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'),
};
