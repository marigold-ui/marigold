import { type ThemeComponent, cva } from '@marigold/system';

export const HelpText: ThemeComponent<'HelpText'> = {
  container: cva([
    'text-xs text-muted-foreground group-disabled/field:text-disabled-foreground',
    'group-invalid/field:text-destructive',
  ]),
  icon: cva(''),
};
