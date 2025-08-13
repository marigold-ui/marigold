import { ThemeComponent, cva } from '@marigold/system';

export const Tag: ThemeComponent<'Tag'> = {
  container: cva('flex gap-3'),
  tag: cva([
    'relative inline-flex items-center gap-[7px]',
    'border border-solid border-input rounded-md',
    'font-medium text-xs',
    'h-7 px-2 cursor-default',
    'bg-background',
    'data-selected:text-white data-selected:bg-brand',
    'data-[disabled]:cursor-not-allowed data-[disabled]:text-disabled-foreground data-[disabled]:bg-disabled',
    'focus-visible:util-focus-ring outline-none',
  ]),
  closeButton: cva([
    'size-4',
    'disabled:bg-disabled disabled:text-disabled-foreground disabled:cursor-not-allowed',
  ]),
  listItems: cva('flex flex-wrap items-center gap-1 mb-0'), // mb-0 prevents whitespace when the hidden field is rendered
  removeAll: cva([
    'inline whitespace-nowrap font-medium transition-[color,box-shadow,transform]',
    'duration-150 active:scale-[0.98] pressed:scale-[0.98]',
    'focus-visible:util-focus-ring outline-none',
    'cursor-pointer',
    'text-link text-xs h-button-small',
  ]),
};
