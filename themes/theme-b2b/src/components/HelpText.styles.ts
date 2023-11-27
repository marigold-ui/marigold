import { ThemeComponent, cva } from '@marigold/system';

export const HelpText: ThemeComponent<'HelpText'> = {
  container: cva(
    'group-error/field:text-text-error group-[invalid=true]/field:text-text-error text-sm leading-6'
  ),
  icon: cva(''),
};
