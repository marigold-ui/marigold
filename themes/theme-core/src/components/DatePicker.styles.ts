import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const DatePicker: ThemeComponent<'DatePicker'> = {
  container: cva(
    'group-focus/field:bg-datepicker-hover hover:[&>*]:fill-white'
  ),
  button: cva(
    'border-none bg-transparent mg-hover:bg-datepicker-hover mg-focus:[&[aria-expanded=true]]:bg-datepicker-focus group-focus/field:bg-bg-datepicker-hover group-focus/field:[&_button[aria-expanded=true])]:bg-datepicker-focus'
  ),
};
