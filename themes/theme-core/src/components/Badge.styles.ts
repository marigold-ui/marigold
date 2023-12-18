import { ThemeComponent, cva } from '@marigold/system';

export const Badge: ThemeComponent<'Badge'> = cva(
  'text-xxsmall inline-flex whitespace-nowrap rounded-3xl px-2 py-0.5 align-middle',
  {
    variants: {
      variant: {
        default: 'bg-bg-neutral',
        inverted: 'text-text-light bg-bg-surface-lowered',
        success: 'text-text-light bg-bg-success',
        info: 'text-text-light bg-bg-info',
        warning: 'bg-bg-warning',
        error: 'text-text-light bg-bg-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
