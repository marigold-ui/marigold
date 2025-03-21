import { type ThemeComponent, cva } from '@marigold/system';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva([
    'overflow-hidden rounded-lg border border-input group-[trigger]/popover:border-0',
  ]),
  list: cva(['space-y-1 bg-background p-1 text-sm outline-0']),
  option: cva([
    'disabled:cursor-not-allowed disabled:text-disabled-foreground',
    'relative flex flex-col rounded-md px-2 py-1.5 text-sm text-foreground',
    'selected:bg-selected',
    // TODO: can not use "ouline-none" because it overrides the focus visible things -.-
    // TODO: try it after RAC is updated!
    'data-[focused]:outline-none data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70',
  ]),
  section: cva(''),
  header: cva(
    '[&_header]:px-2 [&_header]:py-1.5 [&_header]:text-xs [&_header]:font-medium [&_header]:text-muted-foreground'
  ),
};
