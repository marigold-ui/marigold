import { ThemeComponent, cva } from '@marigold/system';

export const Tooltip: ThemeComponent<'Tooltip'> = {
  container: cva([
    'text-body border-border-inverted bg-bg-surface rounded-sm border px-1 py-0.5',
    'placement-t:mb-1',
    'placement-b:mt-1',
    'placement-r:ml-1',
    'placement-l:mr-1',
  ]),
  arrow: cva([
    'fill-bg-surface stroke-border-inverted',

    // right
    '[&>svg]:placement-r:rotate-90',

    // left
    '[&>svg]:placement-l:-rotate-90',

    // bottom
    '[&>svg]:placement-b:rotate-180',
  ]),
};
