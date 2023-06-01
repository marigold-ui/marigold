import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Accordion: ThemeComponent<'Accordion'> = {
  button: cva(
    'bg-button-base-background w-full justify-between border-none p-0'
  ),
  item: cva(''),
};
