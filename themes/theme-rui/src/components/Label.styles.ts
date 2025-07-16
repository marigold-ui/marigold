import { type ThemeComponent, cva } from '@marigold/system';

export const Label: ThemeComponent<'Label'> = {
  container: cva([
    'flex items-center gap-1',
    'text-sm font-medium leading-none text-foreground',
    'group-disabled/field:cursor-not-allowed group-disabled/field:text-disabled-foreground',
  ]),
  indicator: cva(
    'group-required/field:block text-destructive align-super size-2.5'
  ),
};
