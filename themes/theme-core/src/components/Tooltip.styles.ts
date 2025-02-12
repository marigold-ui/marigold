import { ThemeComponent, cva } from '@marigold/system';

export const Tooltip: ThemeComponent<'Tooltip'> = {
  container: cva([
    'text-text-base border-border-inverted bg-bg-surface rounded-xs border px-1 py-0.5',
    'placement-t:mb-1',
    'placement-b:mt-1',
    'placement-r:ml-1',
    'placement-l:mr-1',
  ]),
  arrow: cva([
    'fill-bg-surface stroke-border-inverted',

    // right
    'data-[placement=right]:[&_svg]:rotate-90',

    // left
    'data-[placement=left]:[&_svg]:-rotate-90',

    // bottom
    'data-[placement=bottom]:[&_svg]:rotate-180',
  ]),
};
