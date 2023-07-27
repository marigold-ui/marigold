import { ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = cva(['mt-0.5'], {
  variants: {
    variant: {
      top: ['mb-0.5'],
    },
  },
});
