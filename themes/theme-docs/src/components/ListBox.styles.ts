import { ThemeComponent, cva } from '@marigold/system';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva({
    base: [
      'bg-bg-surface-overlay border-border rounded-sm border drop-shadow-lg',
      'w-full',
    ],
  }),
  list: cva({
    base: [
      'outline-hidden',
      'p-1',
      'sm:max-h-[45vh] md:max-h-[75vh] lg:max-h-[75vh]',
    ],
  }),
  item: cva({
    base: [
      'text-text-primary',
      'cursor-pointer rounded-xs outline-hidden',
      'hover:bg-bg-hover focus:bg-bg-hover',
      'aria-selected:bg-bg-hover',
    ],
    variants: {
      size: {
        default: 'p-2',
        small: 'px-2 py-1 text-sm',
      },
    },
    defaultVariants: {
      size: 'small',
    },
  }),
  section: cva({}),
  header: cva({}),
};
