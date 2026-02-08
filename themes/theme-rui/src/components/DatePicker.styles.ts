import { type ThemeComponent, cva } from '@marigold/system';

export const DatePicker: ThemeComponent<'DatePicker'> = cva({
  base: [
    'h-input pr-3',
    'text-muted-foreground/80',
    'hover:text-brand',
    'disabled:cursor-not-allowed',
    'util-touch-hitbox',
  ],
});
