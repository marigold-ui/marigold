import { type ThemeComponent, cva } from '@marigold/system';
import { buttonBase } from './Button.styles';

export const ActionBar: ThemeComponent<'ActionBar'> = {
  container: cva({
    base: [
      'relative w-fit',
      'flex items-center justify-between justify-items-center gap-16',
      'px-6 py-3',
      'shadow-elevation-overlay',
      'ui-surface-contrast',
      'rounded-full font-medium',
      'focus-visible:util-focus-ring outline-none disabled:util-disabled',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      'entering:animate-slide-in',
      'exiting:animate-slide-out',
    ],
  }),
  selection: cva({ base: 'flex items-center gap-1' }),
  count: cva({
    base: 'flex items-center text-sm font-medium whitespace-nowrap',
  }),
  toolbar: cva({
    base: ['flex items-center', 'flex-1 justify-center', 'overflow-x-auto'],
  }),
  clearButton: cva({
    base: [
      'inline-flex items-center justify-center',
      'shrink-0 size-8 rounded-full cursor-pointer transition-colors',
      'hover:bg-current/10',
      'focus-visible:ui-state-focus outline-none',
      'disabled:ui-state-disabled',
      '[&_svg]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    ],
  }),
  actionButton: cva({
    base: [
      ...buttonBase,
      'hover:bg-current/10',
      'text-sm h-button p-squish-relaxed [&_svg]:size-4',
    ],
  }),
};
