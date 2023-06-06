import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const DatePicker: ThemeComponent<'DatePicker'> = {
  container: cva(
    'group-focus/field:bg-datepicker-hover hover:[&>*]:fill-white'
  ),
  button: cva(
    'hover:bg-datepicker-hover focus:[&[aria-expanded=true]]:bg-datepicker-focus group-focus/field:bg-bg-datepicker-hover group-focus/field:[&_button[aria-expanded=true])]:bg-datepicker-focus border-none bg-transparent'
  ),
};
