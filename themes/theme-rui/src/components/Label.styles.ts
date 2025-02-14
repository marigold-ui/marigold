import { type ThemeComponent, cva } from '@marigold/system';

export const Label: ThemeComponent<'Label'> = {
  container: cva([
    'text-sm font-medium leading-4 text-foreground',
    'group-disabled/field:cursor-not-allowed group-disabled/field:opacity-70',
  ]),
  indicator: cva(
    'group-required/field:block group-required/field:text-destructive'
  ),
};
