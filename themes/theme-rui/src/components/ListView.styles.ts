import { type ThemeComponent, cva } from '@marigold/system';

export const ListView: ThemeComponent<'ListView'> = {
  list: cva({
    base: ['w-full outline-0 flex flex-col'],
    variants: {
      // `default` is a bounded surface of its own (ring, shadow, radius).
      // `plain` drops that frame — divider lines only — so the list can sit
      // inside a container that already provides one, e.g. the Popover
      // notifications panel this component was built for.
      variant: {
        default: [
          'divide-y divide-border ui-surface shadow-elevation-border',
          '[--listview-item-radius:calc(var(--radius-surface)-1px)]',
        ],
        plain: 'divide-y divide-border',
      },
    },
    defaultVariants: { variant: 'default' },
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
      // Round the first/last row to match the surface's own corners: a
      // square-cornered row's hover fill/focus outline would otherwise poke
      // past the rounded container edge.
      'first:rounded-t-(--listview-item-radius) last:rounded-b-(--listview-item-radius)',
    ],
    variants: { variant: { default: '' } },
    defaultVariants: { variant: 'default' },
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
