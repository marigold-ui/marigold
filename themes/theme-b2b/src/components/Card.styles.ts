import { ThemeComponent, cva } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva(
  'bg-bg-surface-raised shadow-surface-raised rounded-lg p-4 drop-shadow-md',
  {
    variants: {
      size: {
        stretch: 'flex-1',
      },
    },
  }
);
