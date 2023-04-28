import { tv } from 'tailwind-variants';

export const listbox = tv({
  slots: {
    container: [
      'mt-[1] bg-secondary-50',
      'border border-solid rounded-sm border-listbox-border',
      'data-[error]:border-error',
    ],
    list: [
      'outline-none overflow-auto',
      'sm:max-h-[75vh] md:max-h-[75vh] lg:max-h-[45vh]',
    ],
    section: ['font-bold leading-normal px-1'],
    option: ['leading-normal outline-none py-0 pl-[6px] pr-4', 'focus:'],
  },
});
