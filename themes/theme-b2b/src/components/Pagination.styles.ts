import { ThemeComponent, cva } from '@marigold/system';

const BUTTON_STYLES = cva([
  'rounded-xs border-none leading-[48px] outline-hidden',
  'focus-visible:outline-outline-focus focus-visible:outline focus-visible:outline-offset-1',
  'disabled:text-text-base-disabled disabled:bg-bg-inverted-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid',
  'text-text-base hover:bg-bg-brand-hover active:bg-bg-brand-active active:text-text-inverted',
  'flex h-8! w-8 items-center justify-center',
  'data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-text-base  data-[selected=true]:font-bold',
  'text-text-base hover:bg-gray-100',
]);

export const Pagination: ThemeComponent<'Pagination'> = {
  navigationButton: BUTTON_STYLES,
  pageButton: BUTTON_STYLES,
  icon: cva('h-5 w-5'),
};
