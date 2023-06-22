import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Tooltip: ThemeComponent<'Tooltip'> = {
  container: cva('text-body'),
  arrow: cva('border-solid border-x-transparent border-b-transparent'),
};
