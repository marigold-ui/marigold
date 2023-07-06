import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva('absolute top-2 right-2', {
    variants: {
      variant: {
        fullpage: ['h-6 w-6', 'top-4 right-4'],
      },
    },
  }),
  container: cva('bg-bg-surface rounded-sm px-4 pb-8 pt-4 shadow-sm relative', {
    variants: {
      variant: {
        fullpage: 'w-screen h-screen pt-10',
      },
    },
  }),
};
