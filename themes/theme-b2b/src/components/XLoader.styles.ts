import { ThemeComponent, cva } from '@marigold/system';

export const XLoader: ThemeComponent<'XLoader'> = {
  container: cva('text-text-inverted'),
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
  label: cva('text-current'),
};
