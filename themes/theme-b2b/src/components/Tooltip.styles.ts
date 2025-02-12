import { ThemeComponent, cva } from '@marigold/system';

export const Tooltip: ThemeComponent<'Tooltip'> = {
  container: cva([
    'text-sm leading-[1.125rem]',
    'border-border-info rounded-lg border border-solid',
    'bg-bg-surface-overlay p-2',
    'placement-t:mb-2',
    'placement-b:mt-2',
    'placement-r:ml-2',
    'placement-l:mr-2',
  ]),

  arrow: cva([
    'fill-bg-surface-overlay stroke-border-info',

    // right
    'data-[placement=right]:[&_svg]:rotate-90',

    // left
    'data-[placement=left]:[&_svg]:-rotate-90',

    // bottom
    'data-[placement=bottom]:[&_svg]:rotate-180',
  ]),
};
