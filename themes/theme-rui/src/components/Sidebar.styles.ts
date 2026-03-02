import { type ThemeComponent, cva } from '@marigold/system';

export const Sidebar: ThemeComponent<'Sidebar'> = {
  root: cva({
    base: [
      'relative h-full overflow-hidden',
      'bg-surface border-surface-border ui-elevation-overlay util-scrollbar',
      'data-[state=expanded]:w-64',
      'data-[state=collapsed]:w-0',
      'transition-[width] duration-200 ease-in-out',
      'data-[side=left]:border-r data-[side=right]:border-l',
    ],
  }),
  closeButton: cva({ base: ['absolute top-3.5 right-3 z-50', 'size-7'] }),
  header: cva({ base: 'border-border border-b px-4 py-3' }),
  content: cva({ base: 'px-4 py-2 overflow-y-auto outline-none' }),
  footer: cva({ base: 'border-border border-t px-4 py-3' }),
  toggle: cva({
    base: [
      'ui-button-base ui-press',
      'hover:bg-current/10',
      'size-button [&_svg]:size-6',
    ],
  }),
  group: cva({ base: 'flex flex-col gap-1 py-2' }),
  groupLabel: cva({
    base: 'px-2 h-[30px] pt-3 pb-0.5 text-xs font-medium text-muted-foreground uppercase tracking-wider',
  }),
  menu: cva({ base: 'flex flex-col gap-0.5 list-none p-0 m-0' }),
  menuItem: cva({ base: '' }),
  menuButton: cva({
    base: [
      'flex items-center gap-2 w-full px-2 h-9 text-sm rounded-md',
      'text-muted-foreground hover:text-foreground hover:bg-hover transition-colors',
      'data-active:bg-selected data-active:text-foreground data-active:font-medium',
      'outline-none focus-visible:ring-2 focus-visible:ring-outline-focus',
    ],
  }),
  subNav: cva({ base: 'relative overflow-hidden' }),
  subNavBackButton: cva({
    base: [
      'grid grid-cols-[2.25rem_1fr_2.25rem] items-center w-full px-2 h-9 text-sm rounded-md',
      'text-muted-foreground hover:text-foreground transition-colors',
      'outline-none focus-visible:ring-2 focus-visible:ring-outline-focus',
      'cursor-pointer mb-1',
    ],
  }),
};
