import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva([
    'bg-bg-surface list-none break-words rounded-[2px] border p-0',
    'sm:max-h-[75ch] md:max-h-[75vh] lg:max-h-[45vh]',
    'flex flex-col overflow-y-auto overflow-x-hidden',
    'border-border-inverted bg-surface-overlay border-solid',
  ]),
  item: cva([
    'cursor-pointer p-1 focus:outline-0',
    'disabled:text-text-base-disabled disabled:cursor-not-allowed',
    'data-hovered:text-text-inverted  data-hovered:bg-linear-to-t from-highlight-start/80 to-highlight-end/90',
    'text-xs',
    'data-selected:bg-bg-selected',
  ]),
  section: cva('text-text-base border-t p-1 text-xs font-normal'),
  button: cva([
    'border-border-base bg-bg-inverted text-text-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:cursor-none',
    'disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed',
    'pending:border-border-base-disabled pending:bg-bg-inverted-disabled pending:text-text-base-disabled pending:cursor-not-allowed',
    'focus-visible:outline-outline-focus focus-visible:outline focus-visible:outline-offset-1 outline-hidden',
    'hover:bg-bg-inverted-hover',
  ]),
};
