import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const DatePicker: ThemeComponent<'DatePicker'> = {
  container: cva(),
  button: cva([
    ' h-full w-6',
    'p-0',
    'text-text-primary/80 hover:text-text-primary border-none bg-transparent',
    'outline-none',

    'disabled:hidden',
    '-outline-offset-1',
  ]),
};
