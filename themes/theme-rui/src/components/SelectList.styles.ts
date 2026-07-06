import { type ThemeComponent, cva } from '@marigold/system';

export const SelectList: ThemeComponent<'SelectList'> = {
  container: cva({
    base: [
      'flex',
      'has-orientation-vertical:w-full',
      'has-orientation-horizontal:w-fit has-orientation-horizontal:max-w-full',
      // When horizontal and the @container/selectlist scope is narrower than
      // 40rem, the surface fills its parent so the stacked layout reads as a
      // regular vertical list.
      'has-orientation-horizontal:@max-[40rem]/selectlist:w-full',
    ],
    variants: {
      variant: {
        // A default SelectList is a form control, so it wears the control surface
        // (dense boundary + bevel), not the decorative hairline. Focus/error still
        // recolor through --ui-border-color, as on an input.
        default: 'ui-surface-control shadow-elevation-border',
        bordered: '',
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  list: cva({
    base: [
      'outline-0 flex',
      'orientation-vertical:w-full orientation-vertical:flex-col orientation-vertical:overflow-x-hidden orientation-vertical:overflow-y-auto',
      'orientation-horizontal:w-fit orientation-horizontal:max-w-full orientation-horizontal:flex-row orientation-horizontal:overflow-x-auto orientation-horizontal:overflow-y-hidden',
      // Container-query flip: a horizontally arranged list switches to a
      // vertical stack once the wrapping `@container/selectlist` is narrower
      // than 40rem. Keyboard navigation still works on both axes thanks to
      // `layout="grid"` on the underlying GridList.
      'orientation-horizontal:@max-[40rem]/selectlist:w-full',
      'orientation-horizontal:@max-[40rem]/selectlist:flex-col',
      'orientation-horizontal:@max-[40rem]/selectlist:overflow-x-hidden',
      'orientation-horizontal:@max-[40rem]/selectlist:overflow-y-auto',
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
      // Container-query flip: drop the horizontal min-width so stacked rows
      // can take the full container width.
      'group-orientation-horizontal/list:@max-[40rem]/selectlist:min-w-0',
    ],
    variants: {
      variant: {
        default: [
          'min-h-14',
          'selected:bg-selected hover:ui-state-hover',
          'group-orientation-vertical/list:first:rounded-t-(--selectlist-item-radius) group-orientation-vertical/list:last:rounded-b-(--selectlist-item-radius)',
          'group-orientation-horizontal/list:first:rounded-l-(--selectlist-item-radius) group-orientation-horizontal/list:last:rounded-r-(--selectlist-item-radius)',
          // Dividers use the opaque structural --color-border (like Table grid
          // lines): darker than every wash, so they stay crisp against rest,
          // hover, and the selected fill alike.
          'group-orientation-vertical/list:not-last:border-b group-orientation-vertical/list:not-last:border-border',
          'group-orientation-horizontal/list:not-last:border-r group-orientation-horizontal/list:not-last:border-border',
          // Container-query flip: in narrow containers, swap horizontal
          // rounding/borders for the vertical equivalents.
          'group-orientation-horizontal/list:@max-[40rem]/selectlist:first:rounded-bl-none',
          'group-orientation-horizontal/list:@max-[40rem]/selectlist:first:rounded-tr-(--selectlist-item-radius)',
          'group-orientation-horizontal/list:@max-[40rem]/selectlist:last:rounded-tr-none',
          'group-orientation-horizontal/list:@max-[40rem]/selectlist:last:rounded-bl-(--selectlist-item-radius)',
          'group-orientation-horizontal/list:@max-[40rem]/selectlist:not-last:border-r-0',
          'group-orientation-horizontal/list:@max-[40rem]/selectlist:not-last:border-b',
        ],
        bordered: [
          'ui-surface shadow-elevation-border min-h-14',
          'selected:[--ui-border-color:var(--color-foreground)] selected:inset-shadow-[0_0_0_0.5px_var(--ui-border-color)]',
          'disabled:selected:[--ui-border-color:var(--color-control-border)] disabled:selected:inset-shadow-none',
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
