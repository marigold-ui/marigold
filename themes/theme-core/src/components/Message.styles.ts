import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Message: ThemeComponent<'Message'> = {
  container: cva(
    'bg-message-container-background border border-solid px-4 py-2 text-[13px]',
    {
      variants: {
        variant: {
          warning: 'border-warning-border',
          error: 'border-error-border',
          info: 'border-info-border',
        },
      },
    }
  ),
  title: cva('col-span-full font-bold leading-8', {
    variants: {
      variant: {
        warning: 'text-warning-text',
        error: 'text-error-text',
        info: 'text-info-alternativText',
      },
    },
  }),
  icon: cva(''),
  content: cva('leading-4', {
    variants: {
      variant: {
        warning: 'text-warning-text',
        error: 'text-error-text',
        info: 'text-info-alternativText',
      },
    },
  }),
};
