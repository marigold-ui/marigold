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
    'placement-r:[&>svg]:rotate-90',

    // left
    'placement-l:[&>svg]:-rotate-90',

    // bottom
    'placement-b:[&>svg]:rotate-180',
  ]),
};
