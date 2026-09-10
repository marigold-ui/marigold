import { type ThemeComponent, cva } from '@marigold/system';

export const ListView: ThemeComponent<'ListView'> = {
  list: cva({
    base: [
      'w-full outline-0 flex flex-col divide-y divide-border',
      // Row padding follows `--bleed-px`, published by a bled `Panel.Content`
      // / `Panel.CollapsibleContent` / `Drawer.Content`: dividers reach the
      // container border while row text lines up with its title, the way
      // `Table` and `Accordion` do. Falls back to the standalone padding.
      '[--listview-item-px:var(--bleed-px,var(--spacing-stretch-regular-x))]',
    ],
    variants: {
      // One variant: the list draws no surface of its own. It always sits in a
      // container that owns the frame (`Popover`, `Panel`, `Card`), the way
      // `Table` does — a framed list nested in one of those is a ring inside a
      // ring. A standalone framed list is `<Card><ListView /></Card>`.
      variant: {
        default: '',
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  item: cva({
    base: [
      'group/option relative grid items-center',
      // `actions` is listed in both template rows, so it spans them without a
      // span count.
      "[grid-template-areas:'label_actions'_'description_actions'] grid-cols-[minmax(0,1fr)_auto]",
      // No column gap: it would inset the text even on a row with no controls,
      // breaking the alignment a bled container needs. The spacing rides on
      // the actions cell (`ms-3`) so it exists only when the cell does.
      'px-(--listview-item-px) py-(--spacing-stretch-regular-y)',
      // This padding plus `text-sm` lands on exactly 44px, so state the touch
      // target rather than arriving at it — as `ListBox` and `Menu` do.
      'max-sm:min-h-touch-target',
      'text-sm text-foreground outline-none',
      // `background` is deliberately absent: DST-1436 dropped it from hover
      // transitions theme-wide so hover fills flip instantly.
      'transition-[border,color]',
      'hover:ui-state-hover',
      'focus-visible:ui-state-focus',
      'disabled:cursor-not-allowed disabled:text-disabled',
    ],
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  // `<TextValue>` and `<Title>` are alternatives for a row's primary text, so
  // both take the label cell; a row authoring both overlaps them.
  label: cva({ base: '[grid-area:label]' }),
  title: cva({ base: '[grid-area:label]' }),
  description: cva({
    base: [
      '[grid-area:description]',
      'text-xs font-normal text-secondary group-disabled/option:text-disabled',
    ],
  }),
  // Placement only. Reaches the row's control — or the `<ButtonGroup>` around
  // several — through `ButtonContext`, and the group brings its own layout.
  actions: cva({
    base: '[grid-area:actions] self-center justify-self-end ms-3',
  }),
};
