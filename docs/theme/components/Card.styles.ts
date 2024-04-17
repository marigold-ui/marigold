import { ThemeComponent, cva } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva(
  ['bg-bg-surface rounded-xl border shadow'],
  {
    variants: {
      variant: {
        default: 'p-6',
        hovering: 'p-6 transition-shadow hover:cursor-pointer hover:shadow-md',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
