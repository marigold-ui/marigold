import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const CloseButton: ThemeComponent<'CloseButton'> = cva([
  'flex items-center justify-center',
  'rounded cursor-pointer',
]);
