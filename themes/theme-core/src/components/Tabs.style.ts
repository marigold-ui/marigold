import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Tabs: ThemeComponent<'Tabs'> = {
  tabs: cva('mb-[10px]'),
  tab: cva(
    [
      'min-h-[40px]',
      'data-[hover]:text-tabs-tab-text data-[hover]:border-b-tabs-tab-hover data-[hover]:border-b-8 data-[hover]:border-solid',
      'mg-disabled:text-tabs-tab-disabled',
      'mg-selected:border-b-primary-600 mg-selected:border-b-8 mg-selected:border-solid ',
    ],
    {
      variants: {
        size: {
          small: 'pb-1 px-1',
          medium: 'pb-2 px-2 text-lg',
          large: 'pb-4 px-4 text-2xl',
        },
      },
    }
  ),
};
