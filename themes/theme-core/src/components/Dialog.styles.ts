import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Dialog: ThemeComponent<'Dialog'> = {
  container: cva('bg-dialog-bg rounded-sm px-8 pb-8 pt-4', {
    variants: {
      size: {
        medium: 'w-[600px]',
      },
    },
  }),
  closeButton: cva([
    'relative right-[-24px] top-[-8px] h-6 w-6',
    'bg-primary-600 text-secondary-50',
    'border-primary-600 rounded-sm border',
    'hover:bg-primary-500',
  ]),
};
