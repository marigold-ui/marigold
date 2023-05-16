import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';
// container: ['mg-error:text-error-text'],
// icon: ['16'],

export const HelpText: ThemeComponent<'HelpText'> = cva([
  'leading-none',
  'group-error/field:text-red-500',
  '[&>svg]:h-[18px] [&>svg]:w-[18px]',
]);
