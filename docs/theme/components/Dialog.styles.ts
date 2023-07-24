import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva('absolute right-2 top-2', {
    variants: {
      variant: {
        fullscreen: ['h-6 w-6', 'right-4 top-4'],
      },
    },
  }),
  container: cva('bg-bg-surface relative rounded-sm px-4 pb-8 pt-4 shadow-sm', {
    variants: {
      variant: {
        fullscreen: 'h-screen w-screen pt-10',
      },
    },
  }),
};
