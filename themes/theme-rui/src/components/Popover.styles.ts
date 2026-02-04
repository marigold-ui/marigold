import { type ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = cva({
  base: [
    'group/popover',
    'z-50 outline-0',
    'placement-top:mb-1',
    'placement-bottom:mt-1',
    'placement-right:ml-1',
    'placement-left:mr-1',
  ],
});
