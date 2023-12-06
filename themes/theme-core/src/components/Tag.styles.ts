import { ThemeComponent, cva } from '@marigold/system';

export const Tag: ThemeComponent<'Tag'> = {
  tag: cva([
    'border-border-brand bg-bg-surface flex items-center gap-2 rounded border',
    'px-1.5 py-[2px]',
  ]),
  listItems: cva('flex items-center gap-1'),
  closeButton: cva(
    'h-4 w-4 cursor-pointer border-none bg-transparent p-0 leading-normal outline-0'
  ),
};
