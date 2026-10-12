import { ThemeComponent, cva } from '@marigold/system';

export const Radio: ThemeComponent<'Radio'> = {
  container: cva({
    base: [
      'gap-x-2',
      'group-disabled/radio:cursor-not-allowed',
      'group-data-[orientation=vertical]/radiogroup:py-1',
      'group-data-[orientation=horizontal]/radiogroup:px-1.5',
    ],
  }),
  label: cva({
    base: [
      'text-sm leading-4 font-normal cursor-pointer w-full min-w-0',
      'group-disabled/radio:text-disabled group-disabled/radio:cursor-not-allowed',
    ],
  }),
  radio: cva({
    base: [
      'flex aspect-square size-4 shrink-0 items-center justify-center rounded-full p-1',
      // The same shared edge Checkbox draws; see tokens.css.
      'border border-control-edge bg-surface',
      'group-focus-visible/radio:ui-state-focus outline-none',
      // `text-disabled!` rather than plain: the dot is `bg-current`, and
      // `group-selected` sorts after `group-disabled`, so the unforced rule
      // loses and the dot paints `selected-bold-foreground` on
      // `disabled-surface` at 1.06:1. Same reason as the border above.
      'group-disabled/radio:group-selected/radio:bg-disabled-surface group-disabled/radio:border-control-edge-disabled! group-disabled/radio:text-disabled! group-disabled/radio:cursor-not-allowed',
      'group-selected/radio:border-selected-bold group-selected/radio:bg-selected-bold group-selected/radio:text-selected-bold-foreground',
      // Same exclusions as Checkbox, minus `focus-visible`: this slot never
      // flips its border on focus, so there is no declaration for hover to outrank.
      // `disabled` is absent because `border-control-edge-disabled!` wins regardless.
      // Switch names it explicitly because its rule does not.
      'group-hover/radio:not-group-read-only/radio:not-group-selected/radio:border-control-edge-hover',
    ],
  }),
  group: cva({}),
};
