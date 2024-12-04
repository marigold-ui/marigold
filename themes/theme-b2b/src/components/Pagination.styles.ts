import { ThemeComponent, cva } from '@marigold/system';

export const Pagination: ThemeComponent<'Pagination'> = cva([
  'rounded-sm border-none leading-[48px] outline-none',
  'focus-visible:outline-outline-focus focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1',
  'disabled:text-text-base-disabled disabled:bg-bg-base-disabled disabled:cursor-not-allowed',
  'text-text-base hover:bg-bg-brand-hover active:bg-bg-brand-active active:text-text-inverted',
  'flex !h-10 !w-10 items-center justify-center',
  'data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-black data-[selected=true]:bg-none data-[selected=true]:text-black',
  'text-gray-700 hover:bg-gray-100',
]);
