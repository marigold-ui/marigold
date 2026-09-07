import { type ThemeComponent, cva } from '@marigold/system';

export const DatePicker: ThemeComponent<'DatePicker'> = cva({
  base: [
    'flex size-control items-center justify-center rounded-surface',
    'text-secondary',
    'not-disabled:hover:ui-state-hover-ghost not-disabled:hover:text-primary',
    'aria-expanded:ui-state-hover-ghost aria-expanded:text-primary',
    'focus-visible:ui-state-focus-item',
    'disabled:cursor-not-allowed',
  ],
});
