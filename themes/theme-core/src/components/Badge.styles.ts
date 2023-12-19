import { ThemeComponent, cva } from '@marigold/system';

export const Badge: ThemeComponent<'Badge'> = cva(
  'text-xxsmall inline-flex whitespace-nowrap rounded-3xl px-2 py-0.5 align-middle',
  {
    variants: {
      variant: {
        default: 'bg-bg-inverted',
        inverted: 'text-text-inverted bg-bg-surface-overlay',
        success: 'text-text-inverted bg-bg-success',
        info: 'text-text-inverted bg-bg-info',
        warning: 'bg-bg-warning',
        error: 'text-text-inverted bg-bg-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
