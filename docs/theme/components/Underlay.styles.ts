import { ThemeComponent, cva } from '@marigold/system';

export const Underlay: ThemeComponent<'Underlay'> = cva('', {
  variants: {
    variant: {
      modal: 'bg-secondary-200/50 backdrop-blur-sm',
    },
  },
});
