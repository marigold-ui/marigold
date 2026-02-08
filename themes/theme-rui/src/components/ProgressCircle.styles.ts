import { ThemeComponent, cva } from '@marigold/system';

export const ProgressCircle: ThemeComponent<'ProgressCircle'> = {
  container: cva({
    base: 'stroke-foreground',
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
  loader: cva({
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
  label: cva({ base: 'text-current text-sm' }),
};
