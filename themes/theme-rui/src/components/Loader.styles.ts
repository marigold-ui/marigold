import { ThemeComponent, cva } from '@marigold/system';

export const Loader: ThemeComponent<'Loader'> = {
  container: cva('grid place-items-center text-brand', {
    variants: {
      variant: {
        default: '',
        inverted: 'text-secondary',
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
