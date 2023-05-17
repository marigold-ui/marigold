import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Card: ThemeComponent<'Card'> = cva(
  'relative bg-card-background rounded p-1 shadow-[1px_2px_3px] max-w-[270px]',
  {
    variants: {
      variant: {
        hovering: 'cursor-pointer hover:shadow-[1px_3px_5px]',
      },
      size: {
        small: 'min-h-[100px]',
      },
    },
  }
);
