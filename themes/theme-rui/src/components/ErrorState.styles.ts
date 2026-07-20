import { ThemeComponent, cva } from '@marigold/system';

export const ErrorState: ThemeComponent<'ErrorState'> = {
  container: cva({
    base: ['mx-auto flex max-w-sm flex-col items-center p-6'],
    variants: {
      size: {
        compact: ['p-4', '[&>svg]:mb-3 [&>svg]:h-14 [&>svg]:w-auto'],
      },
    },
  }),
  title: cva({
    base: ['text-lg'],
    variants: {
      size: {
        compact: 'text-base',
      },
    },
  }),
  description: cva({
    base: ['text-secondary mt-1 text-sm text-center'],
  }),
  action: cva({
    base: ['mt-6'],
    variants: {
      size: {
        compact: 'mt-4',
      },
    },
  }),
};
