import { ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = cva([''], {
  variants: {
    variant: {
      top: ['mb-1'],
      bottom: ['mt-1'],
      right: [''],
      left: [''],
    },
  },
});
