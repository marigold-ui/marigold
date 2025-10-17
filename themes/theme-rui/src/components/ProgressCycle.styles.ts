import { ThemeComponent, cva } from '@marigold/system';

export const ProgressCycle: ThemeComponent<'ProgressCycle'> = {
  container: cva('stroke-foreground', {
    variants: {
      variant: {
        default: '',
        inverted: 'stroke-secondary',
      },
      size: {
        default: 'size-20',
        large: 'size-36',
        fit: 'size-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
  loader: cva('size-full', {
    variants: {
      variant: {
        default: '',
        inverted: '',
      },
      size: {
        default: '',
        large: '',
        fit: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
  label: cva('text-current text-sm'),
};
