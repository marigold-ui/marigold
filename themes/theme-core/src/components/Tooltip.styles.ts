import { ThemeComponent, cva } from '@marigold/system';

export const Tooltip: ThemeComponent<'Tooltip'> = {
  container: cva('text-body'),
  arrow: cva('border-solid border-x-transparent border-b-transparent'),
};
