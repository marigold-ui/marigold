import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  container: cva('bg-bg-surface rounded-sm px-8 pb-8 pt-4', {
    variants: {
      size: {
        medium: 'w-[600px]',
      },
    },
  }),
  closeButton: cva([
    'relative right-[-24px] top-[-8px] h-6 w-6',
    'bg-bg-primary text-text-light',
    'border-border-primary rounded-sm border',
    'hover:bg-bg-primary-hover',
  ]),
};
