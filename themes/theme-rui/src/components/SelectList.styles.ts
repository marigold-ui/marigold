import { type ThemeComponent, cva } from '@marigold/system';

export const SelectList: ThemeComponent<'SelectList'> = {
  container: cva({
    base: ['flex w-full'],
  }),
  list: cva({
    base: ['outline-0 w-full'],
    variants: {
      variant: {
        default:
          'flex flex-col ui-surface shadow-elevation-border overflow-hidden',
        bordered: 'flex flex-col gap-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  item: cva({
    base: [
      'relative grid items-center gap-x-3',
      'grid-cols-[auto_auto_1fr_auto]',
      'text-sm text-foreground outline-none',
      'cursor-default data-selection-mode:cursor-pointer',
      'focus-visible:ui-state-focus focus-visible:z-1 transition-[border,color,background]',
      'disabled:cursor-not-allowed disabled:text-disabled-foreground',
      // image slot (first <img> in the item) — spans both rows so label + description sit beside it
      '[&>img]:size-10 [&>img]:rounded-md [&>img]:object-cover [&>img]:shrink-0',
      '[&>img]:col-start-2 [&>img]:row-start-1 [&>img]:row-span-2 [&>img]:self-center',
      // label + description layout: label row 1, description row 2, both in col 3
      '[&_[slot=label]]:col-start-3 [&_[slot=label]]:row-start-1 [&_[slot=label]]:font-medium',
      '[&_[slot=description]]:col-start-3 [&_[slot=description]]:row-start-2 [&_[slot=description]]:text-xs [&_[slot=description]]:text-muted-foreground',
    ],
    variants: {
      variant: {
        default: [
          'px-4 py-3 min-h-14',
          '[&:not(:last-child)]:border-b border-border/60',
          'selected:bg-selected',
          'hover:bg-hover hover:text-hover-foreground',
        ],
        bordered: [
          'rounded-xl border border-border p-4 min-h-14',
          'selected:border-foreground',
          'hover:border-border-hover',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  label: cva({ base: '' }),
  description: cva({ base: '' }),
  indicator: cva({
    base: [
      'flex shrink-0 items-center justify-center row-start-1 col-start-1 self-center',
    ],
  }),
  action: cva({
    base: ['row-span-2 row-start-1 col-start-4 flex items-center justify-end'],
  }),
};
