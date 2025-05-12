import { ThemeComponent, cva } from '@marigold/system';

// Make sure ListBox looks correct if is in an overlay
const font = 'font-body text-[13px] text-text-base';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva('border-border-inverted rounded-xs border bg-white'),
  list: cva(''),
  item: cva([
    font,
    'group/option flex flex-col',
    'data-hovered:text-text-inverted  data-hovered:bg-linear-to-t from-highlight-start/80 to-highlight-end/90',
    'cursor-pointer px-1.5 py-0.5 outline-hidden',
    'focus:text-text-inverted focus:bg-linear-to-t',
    'selected:text-text-inverted selected:bg-linear-to-t',
    'disabled:text-text-base-disabled aria-disabled:cursor-not-allowed',
    'cursor-default data-selection-mode:cursor-pointer',
  ]),
  section: cva('nth-[n+2]:pt-2 [&_div]:px-5'),
  header: cva([font, '[&_header]:px-1.5 [&_header]:font-bold']),
};
