import { ThemeComponent, cva } from '@marigold/system';

export const Underlay: ThemeComponent<'Underlay'> = cva('', {
  variants: {
    variant: {
      modal: ['bg-bg-surface-sunken backdrop-blur-sm'],
    },
  },
});
