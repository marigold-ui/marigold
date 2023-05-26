import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Accordion: ThemeComponent<'Accordion'> = {
  button: cva(
    'border-none p-0 w-full justify-between bg-button-base-background'
  ),
  item: cva(''),
};
