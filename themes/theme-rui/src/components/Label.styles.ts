import { type ThemeComponent, cva } from '@marigold/system';

export const Label: ThemeComponent<'Label'> = {
  container: cva([
    'text-sm font-medium leading-4 text-foreground',
    'group-disabled/field:cursor-not-allowed group-disabled/field:text-disabled-foreground',
  ]),
  indicator: cva(
    'group-required/field:text-destructive group-required/field:align-super group-required/field:block group-required/field:size-2.5'
  ),
};
