import { ThemeComponent, cva } from '@marigold/system';

export const DatePicker: ThemeComponent<'DatePicker'> = {
  container: cva(),
  button: cva([
    'h-full w-9 p-0',
    'flex items-center justify-center ',
    'text-text-body/80',
    'data-[hover]:bg-bg-hover group-focus/field:bg-bg-hover group-focus/field:[&[aria-expanded=true]]:bg-bg-secondary focus-visible:border-none focus-visible:outline-0 group-focus/field:text-white data-[hover]:text-white',
    'disabled:hidden',
  ]),
};
