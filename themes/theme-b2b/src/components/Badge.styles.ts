import { ThemeComponent, cva } from '@marigold/system';

export const Badge: ThemeComponent<'Badge'> = cva(
  'inline-flex items-center whitespace-nowrap rounded-[20px] px-2 py-[2px] text-sm',
  {
    variants: {
      variant: {
        default: 'bg-bg-neutral',
        inverted: 'text-text-light bg-bg-surface-lowered',
        success: 'bg-bg-success',
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
