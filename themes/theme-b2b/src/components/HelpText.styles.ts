import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const HelpText: ThemeComponent<'HelpText'> = {
  container: cva('group-error/field:text-text-error text-sm'),
  icon: cva(''),
};
