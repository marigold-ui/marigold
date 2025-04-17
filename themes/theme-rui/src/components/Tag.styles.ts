import { ThemeComponent, cva } from '@marigold/system';

export const Tag: ThemeComponent<'Tag'> = {
  tag: cva([
    'relative inline-flex items-center gap-[7px]',
    'border border-solid border-input rounded-md',
    'font-medium text-xs',
    'h-7 px-2 cursor-default',
    'bg-background',
    'data-selected:text-white data-selected:bg-brand',
    'data-[disabled]:cursor-not-allowed data-[disabled]:text-disabled-foreground data-[disabled]:bg-disabled',
    'focus-visible:utility-focus-ring',
  ]),
  closeButton: cva([
    'size-4 flex items-center justify-end whitespace-nowrap',
    'font-medium text-muted-foreground  text-sm hover:text-brand rounded-md',
    'p-0  transition-colors outline-0 cursor-pointer',
    'disabled:bg-disabled disabled:text-disabled-foreground disabled:cursor-not-allowed',
  ]),
  listItems: cva('flex flex-wrap items-center gap-1'),
};
