import { ThemeComponent, cva } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva(
  ['bg-card text-card-foreground rounded-xl border shadow', 'p-6'],
  {
    variants: {
      variant: {
        hovering: 'hover:cursor-pointer hover:shadow-md',
      },
    },
  }
);
