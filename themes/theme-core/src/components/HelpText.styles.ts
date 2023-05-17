import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const HelpText: ThemeComponent<'HelpText'> = cva([
  'group-error/field:text-error-text',
  '[&>svg]:h-[18px] [&>svg]:w-[18px]',
]);
