import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva(
    'bg-bg-base border border-solid px-4 py-2 text-[13px] grid-cols-[auto_min-content] [grid-template-areas:"title_close""content_content"]',
    {
      variants: {
        variant: {
          warning: 'border-border-warning',
          error: 'border-border-error',
          info: 'border-border-info',
          success: 'border-border-success',
        },
      },
      defaultVariants: {
        variant: 'info',
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
    defaultVariants: {
      variant: 'info',
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
    defaultVariants: {
      variant: 'info',
    },
  }),
  close: cva('h-5 w-5 text-center'),
};
