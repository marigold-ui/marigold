import { ThemeComponent, cva } from '@marigold/system';

export const Tabs: ThemeComponent<'Tabs'> = {
  container: cva(''),
  tabpanel: cva('', {
    variants: {
      variant: {
        sunken: 'bg-black/10 p-2 px-4',
      },
    },
  }),
  tabsList: cva('mb-[10px]', {
    variants: {
      variant: {
        sunken: 'm-0 gap-0 space-x-0 leading-none',
      },
    },
  }),
  tab: cva(
    [
      'min-h-[40px]',
      'data-[hovered]:text-text-base-hover data-[hovered]:border-b-border-base-hover data-[hovered]:border-b-8 data-[hovered]:border-solid',
      'aria-disabled:text-text-base-disabled aria-disabled:hover:border-none',
      'aria-selected:border-b-border-brand data-[hovered]:aria-selected:border-b-border-brand aria-selected:border-b-8 aria-selected:border-solid ',
    ],
    {
      variants: {
        variant: {
          sunken: [
            'm-0 cursor-pointer rounded-t-md p-2 px-4 font-bold outline-none',
            'rac-hover:border-none rac-selected:border-none rac-selected:bg-black/10 hover:bg-black/5',
          ],
        },
        size: {
          small: 'px-1 pb-1',
          medium: 'px-2 pb-2 text-lg',
          large: 'px-4 pb-4 text-2xl',
        },
      },
    }
  ),
};
