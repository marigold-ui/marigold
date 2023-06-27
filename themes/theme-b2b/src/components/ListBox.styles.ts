import { ThemeComponent, cva } from '@marigold/system';

// Make sure ListBox looks correct if is in an overlay
const font = 'font-body text-text-primary';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva([
    'bg-bg-surface border-border-light mt-[2px] overflow-y-auto overflow-x-hidden rounded-sm border border-solid',
    'data-error:border-border-error',
  ]),
  list: cva([
    'outline-none',
    'sm:max-h-[45vh] md:max-h-[75vh] lg:max-h-[75vh]',
  ]),
  option: cva([
    font,
    'cursor-pointer p-2 outline-none',
    // Need to use data attributes here because `focus-visible` only works with <Select>
    'data-[focus-visible]:bg-bg-focus',
    'aria-selected:text-text-light aria-selected:bg-bg-selected aria-selected:data-[focus-visible]:bg-bg-selected',
    'aria-disabled:text-text-disabled aria-disabled:cursor-not-allowed',
  ]),
  section: cva(
    '[&:nth-child(n+1)]:border-border-light outline-none [&:nth-child(n+1)]:border-t-[1px_solid]'
  ),
  sectionTitle: cva('text-text-primary-light px-2 pt-2 text-sm'),
};
