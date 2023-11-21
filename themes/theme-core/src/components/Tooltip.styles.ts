import { ThemeComponent, cva } from '@marigold/system';

export const Tooltip: ThemeComponent<'Tooltip'> = {
  container: cva([
    'text-body border-border-light bg-bg-surface rounded-sm border px-1 py-0.5',
    'placement-t:mb-1',
    'placement-b:mt-1',
    'placement-r:ml-1',
    'placement-l:mr-1',
  ]),
  arrow: cva(''),
};
