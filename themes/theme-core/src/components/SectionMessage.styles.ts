import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva(
    'bg-bg-base border border-solid px-4 py-2 text-[13px] [grid-template-areas:"title""content"]',
    {
      variants: {
        variant: {
          warning: 'border-border-warning',
          error: 'border-border-error',
          info: 'border-border-info',
          success: 'border-border-success',
        },
      },
    }
  ),
  title: cva('font-bold', {
    variants: {
      variant: {
        warning: 'text-text-warning',
        error: 'text-text-error',
        info: 'text-text-info',
        success: 'text-text-success',
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
        success: 'text-text-success',
      },
    },
  }),
};
