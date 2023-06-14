import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const Card: ThemeComponent<'Card'> = cva(
  'bg-bg-surface rounded-lg p-4 drop-shadow-md'
);
