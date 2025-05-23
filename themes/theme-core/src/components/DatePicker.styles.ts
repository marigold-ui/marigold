import { ThemeComponent, cva } from '@marigold/system';

export const DatePicker: ThemeComponent<'DatePicker'> = cva([
  'text-text-body/80 relative  border-none bg-transparent px-0 data-disabled:hidden',
  'flex h-full w-9 items-center justify-center',
  'data-pressed:text-text-base/80 data-pressed:bg-transparent',
  'data-focused:border-none data-focused:outline-hidden ',
  'first:size-5',
]);
