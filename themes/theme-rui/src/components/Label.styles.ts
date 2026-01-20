import { type ThemeComponent, cva } from '@marigold/system';

export const Label: ThemeComponent<'Label'> = cva([
  'flex items-center gap-1 whitespace-nowrap',
  'text-sm font-medium leading-none text-foreground',
  'group-disabled/field:cursor-not-allowed group-disabled/field:text-disabled-foreground',

  // required indicator
  'group-required/field:after:content-["*"]',
  'group-required/field:after:-ml-1',
  'group-required/field:after:text-destructive',
]);
