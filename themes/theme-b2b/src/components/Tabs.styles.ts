import { ThemeComponent, cva } from '@marigold/system';

export const Tabs: ThemeComponent<'Tabs'> = {
  container: cva(''),
  tabsList: cva('mb-[10px]'),
  tabpanel: cva(''),
  tab: cva(
    [
      'min-h-[40px]',
      'data-[hovered]:text-text-base data-[hovered]:border-b-border-base-hover data-[hovered]:border-b-8 data-[hovered]:border-solid',
      'aria-disabled:text-text-base-disabled ',
      'aria-selected:border-b-border-selected aria-selected:border-b-8 aria-selected:border-solid',
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
