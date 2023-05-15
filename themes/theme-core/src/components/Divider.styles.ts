import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Divider: ThemeComponent<'Divider'> = cva(
  'w-full h-px bg-root-body',
  {
    variants: {
      variant: {
        bold: 'h-[2px]',
      },
    },
  }
);
