import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const Label: ThemeComponent<'Label'> = {
  container: cva('group-disabled/field:text-text-disabled text-sm '),
  indicator: cva(
    'group-required/field:fill-fill-required group-required/field:block'
  ),
};
