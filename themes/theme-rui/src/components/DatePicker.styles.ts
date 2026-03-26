import { type ThemeComponent, cva } from '@marigold/system';

export const DatePicker: ThemeComponent<'DatePicker'> = cva({
  base: [
    'h-input pr-3',
    'text-secondary',
    'hover:text-primary',
    'disabled:cursor-not-allowed',
    'ui-touch-hitbox',
  ],
});
