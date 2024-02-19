import { ThemeComponent, cva } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva(
  'bg-bg-surface-raised shadow-surface-raised relative rounded p-1 ',
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
