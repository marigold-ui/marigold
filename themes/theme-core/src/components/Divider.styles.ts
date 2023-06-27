import { ThemeComponent, cva } from '@marigold/system';

export const Divider: ThemeComponent<'Divider'> = cva(
  'bg-bg-surface-lowered h-px w-full',
  {
    variants: {
      variant: {
        bold: 'h-[2px]',
      },
    },
  }
);
