import { ThemeComponent, cva } from '@marigold/system';

export const Underlay: ThemeComponent<'Underlay'> = cva('', {
  variants: {
    variant: {
      modal: 'bg-bg-underlay/50 backdrop-blur-sm',
    },
  },
});
