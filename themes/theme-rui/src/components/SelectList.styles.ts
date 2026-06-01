import { type ThemeComponent, cva } from '@marigold/system';

export const SelectList: ThemeComponent<'SelectList'> = {
  container: cva({
    base: [
      'flex',
      'has-orientation-vertical:w-full',
      'has-orientation-horizontal:w-fit',
    ],
    variants: {
      variant: {
        default: 'ui-surface shadow-elevation-border',
        bordered: '',
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  list: cva({
    base: [
      'outline-0 flex',
      'orientation-vertical:w-full orientation-vertical:flex-col orientation-vertical:overflow-x-hidden orientation-vertical:overflow-y-auto',
      'orientation-horizontal:w-fit orientation-horizontal:flex-row orientation-horizontal:overflow-x-auto orientation-horizontal:overflow-y-hidden',
    ],
    variants: {
      variant: {
        default: [
          '[--selectlist-item-px:var(--spacing-stretch-regular-x)]',
          '[--selectlist-item-py:var(--spacing-stretch-regular-y)]',
          '[--selectlist-item-radius:calc(var(--radius-surface)-1px)]',
        ],
        bordered: [
          'gap-2',
          '[--selectlist-item-px:var(--spacing-square-relaxed-x)]',
          '[--selectlist-item-py:var(--spacing-square-relaxed-y)]',
        ],
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  item: cva({
    base: [
      'relative grid items-start content-center gap-x-3',
      'grid-cols-[auto_1fr_auto]',
      'grid-rows-[minmax(1.25rem,auto)_auto]',
      'text-sm font-medium text-foreground outline-none',
      'cursor-default data-selection-mode:cursor-pointer',
      'focus-visible:inset-ring-2 focus-visible:inset-ring-ring/50',
      'transition-[border,color]',
      'disabled:cursor-not-allowed disabled:text-disabled',
      'group-orientation-horizontal/list:min-w-40',
    ],
    variants: {
      variant: {
        default: [
          'min-h-14',
          'selected:bg-selected hover:ui-state-hover',
          'group-orientation-vertical/list:first:rounded-t-(--selectlist-item-radius) group-orientation-vertical/list:last:rounded-b-(--selectlist-item-radius)',
          'group-orientation-horizontal/list:first:rounded-l-(--selectlist-item-radius) group-orientation-horizontal/list:last:rounded-r-(--selectlist-item-radius)',
          'group-orientation-vertical/list:not-last:border-b group-orientation-vertical/list:not-last:border-border',
          'group-orientation-horizontal/list:not-last:border-r group-orientation-horizontal/list:not-last:border-border',
        ],
        bordered: [
          'ui-surface shadow-elevation-border min-h-14',
          'selected:[--ui-border-color:var(--color-foreground)] selected:inset-shadow-[0_0_0_0.5px_var(--ui-border-color)]',
          'disabled:selected:[--ui-border-color:var(--color-border)] disabled:selected:inset-shadow-none',
          'hover:[--ui-background-color:var(--color-hover)]',
        ],
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  label: cva({ base: 'col-start-2 row-start-1' }),
  description: cva({
    base: 'col-start-2 row-start-2 text-xs font-normal text-secondary',
  }),
  indicator: cva({
    base: 'flex shrink-0 items-center justify-center row-start-1 col-start-1 self-center',
  }),
  action: cva({
    base: 'row-span-2 row-start-1 col-start-3 self-center flex items-center justify-end',
  }),
};
