import { ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = cva(
  ['mt-0.5 bg-bg-surface-overlay shadow-surface-overlay'],
  {
    variants: {
      variant: {
        top: ['mb-0.5'],
        bottom: ['mt-0.5'],
        right: [''],
        left: [''],
      },
    },
  }
);
