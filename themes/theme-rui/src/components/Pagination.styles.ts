import { ThemeComponent, cva } from '@marigold/system';

export const Pagination: ThemeComponent<'Pagination'> = {
  container: cva({ base: 'flex items-center justify-center space-x-2' }),
  navigationButton: cva({
    base: [
      'ui-button-base',
      'text-sm hover:ui-state-hover-ghost',
      'h-control py-2 gap-1 px-2.5',
      /**
       * Removes the spacing from the button when when there are hidden
       * elements (e.g. the hidden elements for accessibility).
       */
      'has-[+_[hidden]]:mr-0',
    ],
  }),
  pageButton: cva({
    base: [
      'ui-button-base',
      'text-sm bg-transparent size-control',
      // An unselected page is a ghost button, same as the prev/next arrows, so it
      // wears the identical translucent hover. Gated to unselected: the selected
      // page keeps its ui-control fill and must not get the ghost overlay.
      'data-[selected=false]:hover:ui-state-hover-ghost',
      'data-[selected=true]:ui-control data-[selected=true]:shadow-elevation-border',
    ],
  }),
  icon: cva({ base: 'h-4 w-4' }),
  ellipsis: cva({
    base: 'text-foreground flex h-8 w-8 items-center justify-center',
  }),
};
