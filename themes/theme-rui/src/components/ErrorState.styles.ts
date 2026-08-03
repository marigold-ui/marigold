import { ThemeComponent, cva } from '@marigold/system';

export const ErrorState: ThemeComponent<'ErrorState'> = {
  container: cva({
    base: ['mx-auto flex max-w-sm flex-col items-center p-6'],
  }),
  title: cva({
    base: ['text-lg'],
  }),
  description: cva({
    base: ['text-secondary mt-1 text-sm text-center'],
  }),
  action: cva({
    base: ['mt-6'],
  }),
};
