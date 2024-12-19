import { ThemeComponent, cva } from '@marigold/system';

export const Pagination: ThemeComponent<'Pagination'> = cva([
  'border-border-base bg-bg-inverted text-text-base ease-ease-out h-component cursor-pointer rounded-sm border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:cursor-none',
  'disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid',
  'outline-outline-focus outline-2 outline-offset-1 focus-visible:outline',
  'h-auto border-none bg-transparent',
  'flex !h-8 w-8 items-center justify-center wrap',
  'data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-text-base data-[selected=true]:font-bold',
  'hover:bg-gray-100',
]);
