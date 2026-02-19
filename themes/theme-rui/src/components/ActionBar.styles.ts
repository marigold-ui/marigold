import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const ActionBar: ThemeComponent<'ActionBar'> = {
  container: cva([
    'relative w-fit',
    'flex items-center justify-between justify-items-center gap-4',
    'px-6 py-3',
    'shadow-elevation-overlay',
    'bg-brand text-brand-foreground border-brand',
    'rounded-full font-medium transition-colors',
    'focus-visible:util-focus-ring outline-none disabled:util-disabled',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'entering:animate-slide-in',
    'exiting:animate-slide-out',
  ]),
  selection: cva(['flex items-center gap-4']),
  count: cva(['flex items-center', 'text-sm font-medium', 'whitespace-nowrap']),
  toolbar: cva([
    'flex items-center gap-2',
    'flex-1 justify-center',
    'overflow-x-auto',
  ]),
  clearButton: cva(['shrink-0', 'size-8', 'transition-colors']),
};
