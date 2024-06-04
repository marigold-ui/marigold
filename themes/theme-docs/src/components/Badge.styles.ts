import { ThemeComponent, cva } from '@marigold/system';

export const Badge: ThemeComponent<'Badge'> = cva(
  'inline-flex items-center truncate rounded-[20px] px-2 py-0.5',
  {
    variants: {
      variant: {
        dark: 'bg-bg-surface-lowered text-white',
      },
      size: {
        default: 'text-xs',
      },
    },
    defaultVariants: {
      variant: 'dark',
      size: 'default',
    },
  }
);
