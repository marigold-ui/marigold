import { tv, type TVReturnType } from 'tailwind-variants';
export const listbox: TVReturnType<any, any, any, any, any, any> = tv({
  slots: {
    container: [
      'bg-secondary-50 mt-[1] text-[13px]',
      'border-listbox-border rounded-sm border border-solid',
      'mg-error:border-error-text',
    ],
    list: [
      'overflow-auto outline-none',
      'sm:max-h-[75vh] md:max-h-[75vh] lg:max-h-[45vh]',
    ],
    section: ['px-1 font-bold'],
    option: [
      'py-0 pl-[6px] pr-4 font-normal outline-none',
      'focus-visible:text-secondary-50 focus-visible:bg-focus-bg',
      'mg-selected:text-secondary-50 mg-selected:bg-focus-bg',
      'mg-hover:text-secondary-50 mg-hover:bg-focus-bg',
      'mg-disabled:cursor-not-allowed mg-disabled:text-disabled-text',
    ],
    sectionTitle: [''],
  },
});
