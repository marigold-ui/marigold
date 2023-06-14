import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Accordion: ThemeComponent<'Accordion'> = {
  button: cva(),
  item: cva(),
};
