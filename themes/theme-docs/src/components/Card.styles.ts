import { ThemeComponent, cva } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva(
  [
    'bg-bg-surface border-secondary-300 relative overflow-hidden rounded-xl border shadow',
  ],
  {
    variants: {
      variant: {
        default: 'p-6',
        hovering: 'p-6 transition-shadow hover:cursor-pointer hover:shadow-md',
        content: 'my-6',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
