import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva('border rounded-sm border-input-border bg-white'),
  list: cva('sm:max-h-[75vh] lg:max-h-[45vh]'),
  option: cva([
    'outline-none px-1.5 py-0.5 cursor-pointer',
    'focus-visible:text-secondary-50 focus-visible:bg-highlight',
    'aria-enabled:hover:text-secondary-50 aria-enabled:hover:bg-highlight',
    'aria-disabled:cursor-not-allowed aria-disabled:text-disabled-text',
  ]),
  section: cva(),
  sectionTitle: cva(),
};

// section: ['font-bold px-1'],
// option: [
//   'outline-none py-0 pl-[6px] pr-4 font-normal',
//   'focus-visible:text-secondary-50 focus-visible:bg-focus-bg',
//   'mg-selected:text-secondary-50 mg-selected:bg-focus-bg',
//   'mg-hover:text-secondary-50 mg-hover:bg-focus-bg',
//   'mg-disabled:cursor-not-allowed mg-disabled:text-disabled-text',
// ],
// sectionTitle: [''],
