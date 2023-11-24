import { ThemeComponent, cva } from '@marigold/system';

export const Tabs: ThemeComponent<'Tabs'> = {
  container: cva(''),
  tabsList: cva('mb-[10px]'),
  tabpanel: cva(''),
  tab: cva(
    [
      'min-h-[40px]',
      'data-[hover]:text-text-body data-[hover]:border-b-border-hover data-[hover]:border-b-8 data-[hover]:border-solid',
      'aria-disabled:text-text-disabled ',
      'aria-selected:border-b-border-focus aria-selected:border-b-8 aria-selected:border-solid',
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
