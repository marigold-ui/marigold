import { ThemeComponent, cva } from '@marigold/system';

export const Divider: ThemeComponent<'Divider'> = cva(
  'bg-bg-accent h-px w-full',
  {
    variants: {
      variant: {
        bold: 'h-[2px]',
      },
    },
  }
);
