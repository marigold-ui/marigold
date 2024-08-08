import { ThemeComponent, cva } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva(
  ['border-secondary-300 relative w-full overflow-hidden rounded-xl border'],
  {
    variants: {
      variant: {
        default: 'bg-bg-surface p-6 shadow',
        hovering:
          'bg-bg-surface p-6 shadow transition-shadow hover:cursor-pointer hover:shadow-md',
        content: 'bg-bg-surface my-6 shadow',
        outline: 'bg-bg-surface/40',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
