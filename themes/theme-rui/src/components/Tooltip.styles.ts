import { ThemeComponent, cva } from '@marigold/system';

export const Tooltip: ThemeComponent<'Tooltip'> = {
  container: cva([
    'bg-secondary text-secondary-foreground relative z-50 max-w-70 rounded-md border px-3 py-1.5 text-sm ',
    'placement-t:mb-2',
    'placement-b:mt-2',
    'placement-r:ml-2',
    'placement-l:mr-2',
  ]),

  arrow: cva([
    'fill-secondary  stroke-secondary-foreground',

    // right
    'data-[placement=right]:[&_svg]:rotate-90',

    // left
    'data-[placement=left]:[&_svg]:-rotate-90',

    // bottom
    'data-[placement=bottom]:[&_svg]:rotate-180',
  ]),
};
