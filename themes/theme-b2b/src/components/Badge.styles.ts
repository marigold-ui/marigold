import { ThemeComponent, cva } from '@marigold/system';

export const Badge: ThemeComponent<'Badge'> = cva(
  'inline-flex items-center whitespace-nowrap rounded-[20px] px-2 py-[2px] text-sm',
  {
    variants: {
      variant: {
        info: 'text-text-light bg-bg-info',
        dark: 'text-text-light bg-bg-surface-lowered',
      },
    },
  }
);
