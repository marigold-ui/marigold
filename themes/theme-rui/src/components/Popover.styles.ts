import { type ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = {
  container: cva([
    'group/popover',
    'surface elevation-overlay',
    'z-50',
    'placement-top:mb-1',
    'placement-bottom:mt-1',
    'placement-right:ml-1',
    'placement-left:mr-1',
  ]),
  content: cva('text-foreground overflow-y-auto overflow-x-hidden outline-0'),
};
