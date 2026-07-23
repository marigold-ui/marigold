import { ThemeComponent, cva } from '@marigold/system';

export const Loader: ThemeComponent<'Loader'> = {
  container: cva({
    // Content-sized so the box wraps the spinner and its label for centering.
    base: 'grid place-items-center gap-2 text-primary',
    variants: {
      variant: {
        default: '',
        inverted: 'text-primary-foreground',
      },
      size: {
        default: 'size-fit',
        large: 'size-fit',
        fit: 'size-full',
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
        fit: 'size-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
  label: cva({ base: 'text-current text-sm' }),
};
