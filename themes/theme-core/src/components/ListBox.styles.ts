import { ThemeComponent, cva } from '@marigold/system';

// Make sure ListBox looks correct if is in an overlay
const font = 'font-body text-[13px] text-root-body';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva('border-input-border rounded-sm border bg-white'),
  list: cva(''),
  option: cva([
    font,
    'cursor-pointer px-1.5 py-0.5 outline-none [li_&]:px-5',
    // Need to use data attributes here because `focus-visible` only works with <Select>
    'data-[focus-visible]:text-text-light data-[focus-visible]:bg-highlight',
    'aria-enabled:hover:text-text-light aria-enabled:hover:bg-highlight',
    'aria-selected:text-text-light aria-selected:bg-highlight',
    'aria-disabled:text-text-disabled aria-disabled:cursor-not-allowed',
  ]),
  section: cva('[&:nth-child(n+2)]:pt-2'),
  sectionTitle: cva([font, 'px-1.5 font-bold']),
};
