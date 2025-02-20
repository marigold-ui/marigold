import { type ThemeComponent, cva } from '@marigold/system';

export const DatePicker: ThemeComponent<'DatePicker'> = cva([
  'relative -top-2 -right-3',
  'text-muted-foreground/80',
]);
