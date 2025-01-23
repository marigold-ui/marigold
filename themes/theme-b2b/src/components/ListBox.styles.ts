import { ThemeComponent, cva } from '@marigold/system';

// Make sure ListBox looks correct if is in an overlay
const font = 'font-body text-text-base';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva([
    'bg-bg-surface border-border-light mt-0.5 rounded-xs border border-solid',
    'data-error:border-border-error',
  ]),
  list: cva([
    'outline-hidden',
    'sm:max-h-[45vh] md:max-h-[75vh] lg:max-h-[75vh]',
  ]),
  option: cva([
    font,
    'group/option flex flex-col',
    'cursor-pointer p-2 outline-hidden',
    'rac-hover:bg-bg-selected rac-hover:text-text-base',
    // Need to use data attributes here because `focus-visible` only works with <Select>
    'rac-focus:bg-bg-selected rac-focus:text-text-base',
    'aria-selected:text-text-inverted aria-selected:bg-bg-selected-input',
    'rac-selected:bg-bg-selected-input rac-selected:text-text-inverted',
    'rac-disabled:text-text-base-disabled rac-disabled:cursor-not-allowed',
  ]),
  section: cva(
    'nth-[n+1]:border-border-base border outline-hidden nth-[n+1]:border-t nth-[n+1]:border-solid'
  ),
  header: cva(
    '[&_header]:text-text-accent [&_header]:px-2 [&_header]:pt-2 [&_header]:text-sm'
  ),
};
