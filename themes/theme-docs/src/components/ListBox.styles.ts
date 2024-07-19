import { ThemeComponent, cva } from '@marigold/system';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva([
    'bg-bg-surface-overlay border-border rounded border drop-shadow-lg',
  ]),
  list: cva([
    'outline-none',
    'p-1',
    'sm:max-h-[45vh] md:max-h-[75vh] lg:max-h-[75vh]',
  ]),
  option: cva(
    [
      'text-text-primary',
      'cursor-pointer rounded outline-none',
      'rac-hover:bg-bg-hover rac-focus:bg-bg-hover',
      'aria-selected:bg-bg-hover',
    ],
    {
      variants: {
        size: {
          default: 'p-2',
          small: 'px-2 py-1 text-sm',
        },
      },
      defaultVariants: {
        size: 'small',
      },
    }
  ),
  section: cva(),
  sectionTitle: cva(),
};
