import { ThemeComponent, cva } from '@marigold/system';

export const Pagination: ThemeComponent<'Pagination'> = cva([
  'border-border-base bg-bg-inverted text-text-base ease-ease-out h-component cursor-pointer rounded-sm border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:cursor-none',
  'disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed',
  'outline-outline-focus outline-2 outline-offset-1 focus-visible:outline',
  'h-auto border-none bg-transparent',
  'flex !h-10 !w-10 items-center justify-center',
  'data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-black data-[selected=true]:bg-none data-[selected=true]:text-black',
  'text-gray-700 hover:bg-gray-100',
]);
