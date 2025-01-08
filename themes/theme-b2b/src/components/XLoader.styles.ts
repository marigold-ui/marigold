import { ThemeComponent, cva } from '@marigold/system';

export const XLoader: ThemeComponent<'XLoader'> = {
  container: cva('grid place-items-center', {
    variants: {
      variant: {
        default: '',
        inverted: 'text-text-inverted',
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
