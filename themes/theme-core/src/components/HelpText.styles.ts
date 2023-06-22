import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const HelpText: ThemeComponent<'HelpText'> = {
  container: cva('group-error/field:text-text-error'),
  icon: cva('h-4 w-4'),
};
