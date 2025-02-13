import { ThemeComponent, cva } from '@marigold/system';

export const DatePicker: ThemeComponent<'DatePicker'> = {
  container: cva(['-mr-2 h-full w-9']),
  button: cva([
    'text-text-base/80 relative  px-0 data-[disabled]:hidden',
    'flex h-full w-9 items-center justify-center',
    'data-[pressed]:bg-bg-brand-active data-[pressed]:text-text-inverted',
    'data-[focused]:border-none data-[focused]:outline-none ',
  ]),
};
