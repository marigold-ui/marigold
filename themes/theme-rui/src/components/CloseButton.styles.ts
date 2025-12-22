import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const CloseButton: ThemeComponent<'CloseButton'> = cva([
  'flex items-center justify-center whitespace-nowrap',
  'cursor-pointer',
  'transition-[color,box-shadow]',
  'focus-visible:state-focus outline-none',
  'rounded-full',
  'duration-150 active:scale-[0.97] pressed:scale-[0.97] transition-transform',
  '[&_svg]:size-4 [&_svg]:opacity-60 [&_svg]:transition-opacity hover:[&_svg]:opacity-100',
]);
