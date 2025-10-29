import { ThemeComponent, cva } from '@marigold/system';

export const ProgressCycle: ThemeComponent<'ProgressCycle'> = {
  container: cva('stroke-foreground', {
    variants: {
      variant: {
        default: '',
        inverted: 'stroke-secondary',
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
  loader: cva('', {
    variants: {
      variant: {
        default: '',
        inverted: '',
      },
      size: {
        default: 'size-20',
        large: 'size-36',
        fit: 'size-fit',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
  label: cva('text-current text-sm'),
};
