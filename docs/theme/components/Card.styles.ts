import { ThemeComponent, cva } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva(
  ['bg-bg-surface rounded-xl border shadow'],
  {
    variants: {
      variant: {
        default: 'p-6',
        hovering: 'p-6 hover:cursor-pointer hover:shadow-md transition-shadow',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
