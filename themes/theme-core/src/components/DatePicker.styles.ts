import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const DatePicker: ThemeComponent<'DatePicker'> = {
  container: cva(),
  button: cva([
    `h-5 w-5 right-1`,
    'p-0 pb-0.5',
    'border-none bg-transparent text-text-primary/80 hover:text-text-primary',

    'disabled:hidden',
    '-outline-offset-1',
  ]),
};
