import { tv } from 'tailwind-variants';

export const listbox = tv({
  slots: {
    container: [
      'mt-[1] bg-secondary-50 font-[13px]',
      'border border-solid rounded-sm border-listbox-border',
      'data-[error]:border-error',
    ],
    list: [
      'outline-none overflow-auto font-[13px]',
      'sm:max-h-[75vh] md:max-h-[75vh] lg:max-h-[45vh]',
    ],
    section: ['font-bold px-1'],
    option: [
      'outline-none py-0 pl-[6px] pr-4 font-[13px]',
      'focus-visible:text-secondary-50 focus-visible:bg-focus-bg focus-visible:bg-gradient-to-r:[(#3875d7 20%),(#2a62bc, 90%)]',
      'data-[selected]:text-secondary-50 data-[selected]:bg-focus-bg aria-selected:bg-gradient-[focus-bgImage]',
    ],
    sectionTitle: [],
  },
});
