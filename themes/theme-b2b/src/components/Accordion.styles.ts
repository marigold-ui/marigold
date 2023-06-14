import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Accordion: ThemeComponent<'Accordion'> = {
  button: cva(
    'bg-bg-surface flex w-full items-center justify-between border-none px-2 py-1 leading-normal'
  ),
  item: cva('p-2'),
};
