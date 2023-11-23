import { ThemeComponent, cva } from '@marigold/system';

export const Tooltip: ThemeComponent<'Tooltip'> = {
  container: cva([
    'text-sm leading-[1.125rem]',
    'border-border-info rounded-lg border border-solid',
    'bg-bg-neutral p-2',
    'placement-t:mb-2',
    'placement-b:mt-2',
    'placement-r:ml-2',
    'placement-l:mr-2',
  ]),

  arrow: cva([
    'fill-bg-neutral stroke-border-info',

    // right
    '[&>svg]:placement-r:rotate-90',

    // left
    '[&>svg]:placement-l:-rotate-90',

    // bottom
    '[&>svg]:placement-b:rotate-180',
  ]),
};
