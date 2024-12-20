import { ThemeComponent, cva } from '@marigold/system';

export const Badge: ThemeComponent<'Badge'> = cva(
  'inline-flex items-center whitespace-nowrap rounded-[20px] px-2 py-[2px] text-sm',
  {
    variants: {
      variant: {
        default: 'bg-bg-base',
        inverted: 'text-text-inverted bg-bg-inverted',
        success: 'text-text-inverted bg-bg-success',
        info: 'text-text-inverted bg-bg-info',
        warning: 'text-text-inverted bg-bg-warning',
        error: 'text-text-inverted bg-bg-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
