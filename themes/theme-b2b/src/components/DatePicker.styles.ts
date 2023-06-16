import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const DatePicker: ThemeComponent<'DatePicker'> = {
  container: cva('[&_button]:[&_button[data-[hover]]]:bg-green-700'),
  button: cva([
    'h-full w-9 p-0',
    'flex items-center justify-center ',
    'text-text-primary/80 hover:text-text-primary border-none',
    'group-focus/field:bg-red-600 group-focus/field:[&_svg]:fill-white',
    'overflow-hidden',
    'disabled:hidden',
    '-outline-offset-1',
  ]),
};
