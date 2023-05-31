import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Accordion: ThemeComponent<'Accordion'> = {
  button: cva([
    'border-none px-2 py-1 w-full justify-between bg-accordion-button',
    'font-bold leading-[1.125]',
  ]),
  item: cva('bg-accordion-item p-2'),
};
