import { ThemeComponent, cva } from '@marigold/system';

export const ToggleButton: ThemeComponent<'ToggleButton'> = {
  group: cva('inline-flex rounded-md shadow-sm'),
  button: cva(
    'px-4 py-2 border text-sm font-medium focus:z-10 focus:outline-none focus:ring-1'
  ),
};
