import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva('absolute right-2 top-2', {
    variants: {
      variant: {
        fullscreen: ['size-6', 'right-4 top-4'],
      },
    },
  }),
  container: cva('bg-bg-surface relative', {
    variants: {
      variant: {
        default: 'rounded-lg shadow-lg',
        codeblock: [
          'relative',
          'max-h-[96vh] w-full overflow-y-auto rounded-lg bg-[#1f2937] shadow-lg',
          'not-prose px-8 py-6',
        ],
        fullscreen: 'h-screen w-screen px-4 pb-8 pt-10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
};
