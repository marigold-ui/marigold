import { ThemeComponent, cva } from '@marigold/system';

export const Tabs: ThemeComponent<'Tabs'> = {
  tabs: cva('mb-[10px]'),
  tab: cva(
    [
      'min-h-[40px]',
      'hover:text-text-hover-light hover:border-b-border-hover hover:border-b-8 hover:border-solid',
      'aria-disabled:text-text-disabled aria-disabled:hover:border-none',
      'aria-selected:border-b-border-primary aria-selected:border-b-8 aria-selected:border-solid ',
    ],
    {
      variants: {
        size: {
          small: 'px-1 pb-1',
          medium: 'px-2 pb-2 text-lg',
          large: 'px-4 pb-4 text-2xl',
        },
      },
    }
  ),
};
