import { type ThemeComponent, cva } from '@marigold/system';

export const ListView: ThemeComponent<'ListView'> = {
  list: cva({
    base: [
      'w-full outline-0 flex flex-col divide-y divide-border',
      '[--listview-item-px:var(--bleed-px,var(--spacing-stretch-regular-x))]',
    ],
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  item: cva({
    base: [
      'group/option relative grid items-center',
      "[grid-template-areas:'indicator_label_actions'_'indicator_description_actions'] grid-cols-[auto_minmax(0,1fr)_auto]",
      'px-(--listview-item-px) py-(--spacing-stretch-regular-y)',
      'max-sm:min-h-touch-target',
      'text-sm text-foreground outline-none',
      'transition-[border,color]',
      'selected:bg-selected',
      'hover:ui-state-hover',
      'focus-visible:ui-state-focus',
      'not-disabled:data-selection-mode:cursor-pointer',
      'disabled:cursor-not-allowed disabled:text-disabled',
    ],
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  label: cva({ base: '[grid-area:label]' }),
  title: cva({ base: '[grid-area:label]' }),
  description: cva({
    base: [
      '[grid-area:description]',
      'text-xs font-normal text-secondary group-disabled/option:text-disabled',
    ],
  }),
  indicator: cva({
    base: '[grid-area:indicator] self-center me-3 flex shrink-0 items-center justify-center',
  }),
  actions: cva({
    base: '[grid-area:actions] self-center justify-self-end ms-3',
  }),
};
