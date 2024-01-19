import { ThemeComponent, cva } from '@marigold/system';

// Make sure ListBox looks correct if is in an overlay
const font = (selector = '&') =>
  `${selector}:font-body text-[13px] ${selector}:text-root-body`;

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva('border-border-inverted rounded-sm border bg-white'),
  list: cva(''),
  option: cva([
    font(),
    'rac-hovered:text-text-inverted rac-hovered:bg-highlight',
    'cursor-pointer px-1.5 py-0.5 outline-none',
    'rac-focus:text-text-inverted rac-focus:bg-highlight',
    'rac-selected:text-text-inverted aria-selected:bg-highlight',
    'rac-disabled:text-text-base-disabled aria-disabled:cursor-not-allowed',
  ]),
  section: cva('[&:nth-child(n+2)]:pt-2 [&_div]:px-5'),
  sectionTitle: cva([
    font('[&_header]'),
    '[&_header]:px-1.5 [&_header]:font-bold',
  ]),
};
