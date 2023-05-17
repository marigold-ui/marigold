import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva('border rounded-sm border-input-border bg-white'),
  list: cva('sm:max-h-[75vh] lg:max-h-[45vh]'),
  option: cva([
    'outline-none px-1.5 [li_&]:px-5 py-0.5 cursor-pointer',
    'focus-visible:text-secondary-50 focus-visible:bg-highlight',
    'aria-enabled:hover:text-secondary-50 aria-enabled:hover:bg-highlight',
    'aria-selected:text-secondary-50 aria-selected:bg-highlight',
    'aria-disabled:cursor-not-allowed aria-disabled:text-disabled-text',
  ]),
  section: cva('[&:nth-child(n+2)]:pt-2'),
  sectionTitle: cva('font-bold px-1.5'),
};
