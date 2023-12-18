import { ThemeComponent, cva } from '@marigold/system';

export const DatePicker: ThemeComponent<'DatePicker'> = {
  container: cva(['-mr-2 h-full w-8']),
  button: cva([
    'text-text-body/80 relative  border-none bg-transparent px-0 data-[disabled]:hidden',
    'flex h-full w-9 items-center justify-center',
    'data-[pressed]:text-text-primary/80 data-[pressed]:bg-transparent',
    'data-[focused]:border-none data-[focused]:outline-none ',
    'first:h-5 first:w-5',
  ]),
};
