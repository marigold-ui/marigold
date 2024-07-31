import { ThemeComponent, cva } from '@marigold/system';
import { ELEVALTION_RING } from '../mixins';

export const Card: ThemeComponent<'Card'> = cva(
  [
    'bg-bg-surface-raised shadow-surface-raised rounded-lg p-4',
    ELEVALTION_RING,
  ],
  {
    variants: {
      size: {
        stretch: 'flex-1',
      },
    },
  }
);
