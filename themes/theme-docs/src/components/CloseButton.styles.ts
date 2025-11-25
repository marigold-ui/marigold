import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const CloseButton: ThemeComponent<'CloseButton'> = cva([
  'flex items-center justify-center whitespace-nowrap',
  'cursor-pointer',
  'transition-[color,box-shadow]',
  'rounded',
  '[&_svg]:size-4 [&_svg]:opacity-60 [&_svg]:transition-opacity hover:[&_svg]:opacity-100',
]);
