import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const Underlay: ThemeComponent<'Underlay'> = cva('fixed inset-0 z-[1]', {
  variants: {
    variant: {
      modal: ' bg-bg-surface-underlay blur-[1]',
    },
  },
});
