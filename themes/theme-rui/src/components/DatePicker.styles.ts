import { type ThemeComponent, cva } from '@marigold/system';

export const DatePicker: ThemeComponent<'DatePicker'> = cva([
  'relative h-input -top-2',
  'text-muted-foreground/80',
  'hover:text-brand',
]);
