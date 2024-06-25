import { ThemeComponent, cva } from '@marigold/system';

export const Divider: ThemeComponent<'Divider'> = cva(
  'bg-bg-brand h-px w-full',
  {
    variants: {
      variant: {
        bold: 'h-0.5',
        section: 'bg-bg-brand/50',
      },
    },
  }
);
