import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';
import { inputHeight } from './Input.styles';

export const DatePicker: ThemeComponent<'DatePicker'> = {
  container: cva(
    'group-focus/field:bg-datepicker-hover hover:[&>*]:fill-white'
  ),
  button: cva([
    `h-5 w-5 right-1`,
    'p-0 pb-0.5',
    'border-none bg-transparent text-text-primary/80 hover:text-text-primary',

    'disabled:hidden',
    '-outline-offset-1',
    //'mg-hover:bg-datepicker-hover mg-focus:[&[aria-expanded=true]]:bg-datepicker-focus group-focus/field:bg-bg-datepicker-hover group-focus/field:[&_button[aria-expanded=true])]:bg-datepicker-focus',
  ]),
};
