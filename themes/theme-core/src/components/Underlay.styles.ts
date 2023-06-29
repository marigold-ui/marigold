import { ThemeComponent, cva } from '@marigold/system';

export const Underlay: ThemeComponent<'Underlay'> = cva('fixed inset-0 z-[1]', {
  variants: {
    variant: {
      modal: ['bg-bg-surface-underlay backdrop-blur-sm'],
    },
  },
});
