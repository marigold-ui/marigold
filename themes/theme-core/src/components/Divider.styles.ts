import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Divider: ThemeComponent<'Divider'> = cva(
  'bg-bg-surface-lowered h-px w-full',
  {
    variants: {
      variant: {
        bold: 'h-[2px]',
      },
    },
  }
);
