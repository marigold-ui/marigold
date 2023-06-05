import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Tabs: ThemeComponent<'Tabs'> = {
  tabs: cva('mb-[10px]'),
  tab: cva(
    [
      'min-h-[40px]',
      'data-[hover]:text-text-hover-light data-[hover]:border-b-border-hover data-[hover]:border-b-8 data-[hover]:border-solid',
      'mg-disabled:text-text-disabled',
      'mg-selected:border-b-border-primary mg-selected:border-b-8 mg-selected:border-solid ',
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
