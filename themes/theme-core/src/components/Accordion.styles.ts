import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Accordion: ThemeComponent<'Accordion'> = {
  button: cva([
    'bg-accordion-button w-full justify-between border-none px-2 py-1',
    'font-bold leading-[1.125]',
  ]),
  item: cva('bg-accordion-item p-2'),
};
