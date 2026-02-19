import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const ActionBar: ThemeComponent<'ActionBar'> = {
  container: cva({
    base: [
      'relative w-fit',
      'flex items-center justify-between justify-items-center gap-4',
      'px-6 py-3',
      'shadow-lg',
      'bg-brand text-brand-foreground border-brand',
      'rounded-lg font-medium transition-colors',
      'focus-visible:ui-state-focus outline-none disabled:ui-state-disabled',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    ],
  }),
  count: cva({
    base: ['flex items-center', 'text-sm font-medium', 'whitespace-nowrap'],
  }),
  actions: cva({
    base: [
      'flex items-center gap-2',
      'flex-1 justify-center',
      'overflow-x-auto',
    ],
  }),
  clearButton: cva({ base: ['shrink-0', 'size-8', 'transition-colors'] }),
};
