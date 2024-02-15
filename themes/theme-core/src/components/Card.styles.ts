import { ThemeComponent, cva } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva(
  'bg-bg-surface relative rounded p-1 shadow-[1px_2px_3px]',
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
