import { ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = cva(
  ['bg-bg-surface-overlay shadow-surface-overlay mt-0.5'],
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
