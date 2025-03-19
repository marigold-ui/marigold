import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva([
  'border border-input rounded-lg',
  'bg-surface-overlay',
  'p-4',
  'shadow-sm shadow-black/5',
]);
