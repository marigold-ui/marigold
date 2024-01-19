import { ThemeComponent, cva } from '@marigold/system';

export const Label: ThemeComponent<'Label'> = {
  container: cva('group-disabled/field:text-text-base-disabled text-sm '),
  indicator: cva(
    'group-required/field:text-text-error group-required/field:block'
  ),
};
