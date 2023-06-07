import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const DatePicker: ThemeComponent<'DatePicker'> = {
  container: cva(),
  button: cva([
    `right-1 h-5 w-5`,
    'p-0 pb-0.5',
    'text-text-primary/80 hover:text-text-primary border-none bg-transparent',

    'disabled:hidden',
    '-outline-offset-1',
  ]),
};
