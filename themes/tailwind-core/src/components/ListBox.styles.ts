import { tv } from 'tailwind-variants';

export const listbox = tv({
  slots: {
    container: [
      'mt-[1] bg-secondary-50 text-[13px]',
      'border border-solid rounded-sm border-listbox-border',
      'mg-error:border-error-text',
    ],
    list: [
      'outline-none overflow-auto',
      'sm:max-h-[75vh] md:max-h-[75vh] lg:max-h-[45vh]',
    ],
    section: ['font-bold px-1'],
    option: [
      'outline-none py-0 pl-[6px] pr-4 font-normal',
      'focus-visible:text-secondary-50 focus-visible:bg-focus-bg',
      'mg-selected:text-secondary-50 mg-selected:bg-focus-bg',
      'mg-disabled:cursor-not-allowed mg-disabled:text-disabled-text',
    ],
    sectionTitle: [],
  },
});
