import { ThemeComponent, cva } from '@marigold/system';

export const XLoader: ThemeComponent<'XLoader'> = {
  container: cva('grid place-items-center', {
    variants: {
      variant: {
        default: '',
        inverted: 'text-text-inverted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  loader: cva('', {
    variants: {
      size: {
        default: 'size-20',
        large: 'size-36',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }),
  label: cva('text-current text-sm'),
};
