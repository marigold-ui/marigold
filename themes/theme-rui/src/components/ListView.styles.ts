import { type ThemeComponent, cva } from '@marigold/system';

export const ListView: ThemeComponent<'ListView'> = {
  list: cva({
    base: [
      'w-full outline-0 flex flex-col',
      'divide-y divide-border ui-surface shadow-elevation-border',
    ],
  }),
  item: cva({
    base: [
      'relative flex items-center gap-3',
      'px-(--spacing-stretch-regular-x) py-(--spacing-stretch-regular-y)',
      'text-sm text-foreground outline-none',
      'transition-[border,color]',
      'hover:ui-state-hover',
      'focus-visible:ui-state-focus',
      'disabled:cursor-not-allowed disabled:text-disabled',
    ],
  }),
  leading: cva({ base: 'flex shrink-0 items-center' }),
  content: cva({ base: 'flex min-w-0 flex-1 flex-col justify-center' }),
  label: cva({ base: '' }),
  title: cva({ base: '' }),
  description: cva({ base: 'text-xs font-normal text-secondary' }),
  action: cva({
    base: 'flex shrink-0 items-center justify-end gap-1',
  }),
};
