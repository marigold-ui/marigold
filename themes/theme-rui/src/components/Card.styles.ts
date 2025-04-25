import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva([
  'p-4 border border-input rounded-md',
  'util-surface-raised',
]);
