import { ThemeComponent, cva } from '@marigold/system';

// Make sure ListBox looks correct if is in an overlay
const font = (selector = '&') =>
  `${selector}:font-body ${selector}:text-text-base`;

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva([
    'bg-bg-surface border-border-light mt-[2px] rounded-sm border border-solid',
    'data-error:border-border-error',
  ]),
  list: cva([
    'outline-none',
    'sm:max-h-[45vh] md:max-h-[75vh] lg:max-h-[75vh]',
  ]),
  option: cva([
    font(),
    'cursor-pointer p-2 outline-none',
    // Need to use data attributes here because `focus-visible` only works with <Select>
    'data-[selected]:text-text-inverted data-[selected]:bg-bg-selected-input ',
    'data-[disabled]:text-text-base-disabled data-[disabled]:cursor-not-allowed',
  ]),
  section: cva(
    '[&:nth-child(n+1)]:border-border-base outline-none [&:nth-child(n+1)]:border-t-[1px_solid]'
  ),
  sectionTitle: cva(
    '[&_header]:text-text-accent [&_header]:px-2 [&_header]:pt-2 [&_header]:text-sm'
  ),
};
