import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Message: ThemeComponent<'Message'> = {
  container: cva(
    'border border-solid py-2 px-4 text-[13px] bg-message-container-background',
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
  title: cva('leading-8 font-bold', {
    variants: {
      variant: {
        warning: 'text-warning-text',
        error: 'text-error-text',
        info: 'text-info-alternativText',
      },
    },
  }),
  // todo: icon with grid
  icon: cva('block w-5 h-5'),
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
