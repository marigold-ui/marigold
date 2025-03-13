import { ThemeComponent, cva } from '@marigold/system';

export const Divider: ThemeComponent<'Divider'> = cva(
  'bg-stone-300 h-px w-full',
  {
    variants: {
      variant: {
        bold: 'h-0.5',
        section: '',
      },
    },
  }
);
