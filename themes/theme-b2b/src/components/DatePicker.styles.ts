import { ThemeComponent, cva } from '@marigold/system';

export const DatePicker: ThemeComponent<'DatePicker'> = {
  container: cva(),
  button: cva([
    'h-full w-9 p-0',
    'flex items-center justify-center ',
    'text-text-body/80',
    'focus-visible:border-none focus-visible:outline-0',
    'disabled:hidden',
  ]),
};
