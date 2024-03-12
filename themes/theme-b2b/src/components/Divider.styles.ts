import { ThemeComponent, cva } from '@marigold/system';

export const Divider: ThemeComponent<'Divider'> = cva(
  'bg-bg-inverted h-[1px] w-full border-none',
  {
    variants: {
      variant: {
        bold: 'h-[2px]',
        section: 'bg-bg-inverted/70',
      },
    },
  }
);
