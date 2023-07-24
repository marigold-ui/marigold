import { ThemeComponent, cva } from '@marigold/system';

export const Message: ThemeComponent<'Message'> = {
  container: cva('bg-bg-surface border border-solid px-4 py-2 text-[13px]', {
    variants: {
      variant: {
        warning: 'border-border-warning',
        error: 'border-border-error',
        info: 'border-border-info',
      },
    },
  }),
  title: cva('font-bold', {
    variants: {
      variant: {
        warning: 'text-text-warning',
        error: 'text-text-error',
        info: 'text-text-info',
      },
    },
  }),
  icon: cva('hidden'),
  content: cva('leading-4', {
    variants: {
      variant: {
        warning: 'text-text-warning',
        error: 'text-text-error',
        info: 'text-text-info',
      },
    },
  }),
};
