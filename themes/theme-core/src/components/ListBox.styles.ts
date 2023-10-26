import { ThemeComponent, cva } from '@marigold/system';

// Make sure ListBox looks correct if is in an overlay
const font = (selector = '&') =>
  `${selector}:font-body text-[13px] ${selector}:text-root-body`;

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva('border-input-border rounded-sm border bg-white'),
  list: cva(''),
  option: cva([
    font(),
    'cursor-pointer px-1.5 py-0.5 outline-none',
    'data-[focused]:text-text-light data-[focused]:bg-highlight',
    'data-[selected]:text-text-light aria-selected:bg-highlight',
    'data-[disabled]:text-text-disabled aria-disabled:cursor-not-allowed',
  ]),
  section: cva('[&:nth-child(n+2)]:pt-2 [&_div]:px-5'),
  sectionTitle: cva([
    font('[&_header]'),
    '[&_header]:px-1.5 [&_header]:font-bold',
  ]),
};
