import { type ThemeComponent, cva } from '@marigold/system';

export const Sidebar: ThemeComponent<'Sidebar'> = {
  overlay: cva({
    base: [
      'fixed inset-0 h-(--visual-viewport-height)',
      'entering:animate-in entering:fade-in entering:duration-300 entering:ease-out',
      'exiting:animate-out exiting:fade-out exiting:duration-200 exiting:ease-in',
    ],
  }),
  modal: cva({
    base: [
      'flex h-full *:flex-1',
      'justify-start',
      'entering:animate-slide-in-left',
      'exiting:animate-slide-out-left',
    ],
  }),
  root: cva({
    base: [
      'relative h-full overflow-hidden',
      'bg-surface border-surface-border ui-elevation-overlay util-scrollbar',
      'data-[state=expanded]:w-64',
      'data-[state=collapsed]:w-0',
      'transition-[width] duration-200 ease-in-out',
      'border-r',
    ],
  }),
  closeButton: cva({ base: ['absolute top-3.5 right-3 z-50', 'size-7'] }),
  header: cva({ base: 'border-border border-b px-4 py-3' }),
  content: cva({
    base: 'flex flex-col px-4 py-2 overflow-y-auto outline-none',
  }),
  footer: cva({ base: 'border-border border-t px-4 py-3' }),
  toggle: cva({
    base: [
      'ui-button-base ui-press',
      'hover:bg-current/10',
      'size-button [&_svg]:size-6',
    ],
  }),
  separator: cva({ base: 'bg-border my-1 h-px border-0' }),
  groupLabel: cva({
    base: 'px-2 h-7.5 pt-3 pb-0.5 mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider',
  }),
  menu: cva({
    base: [
      'flex flex-col gap-0.5',
      'transition-[visibility,opacity,translate,filter] duration-300 ease-out sm:duration-200',

      // Panel behind (already visited) — slides left
      'data-[position=before]:absolute data-[position=before]:inset-x-0 data-[position=before]:top-0',
      'data-[position=before]:invisible data-[position=before]:opacity-0',
      'data-[position=before]:-translate-x-1/3 data-[position=before]:sm:-translate-x-2',
      'data-[position=before]:sm:blur-[2px]',
      'data-[position=before]:pointer-events-none',

      // Panel ahead (not yet visited) — slides right
      'data-[position=after]:absolute data-[position=after]:inset-x-0 data-[position=after]:top-0',
      'data-[position=after]:invisible data-[position=after]:opacity-0',
      'data-[position=after]:translate-x-1/3 data-[position=after]:sm:translate-x-2',
      'data-[position=after]:sm:blur-[2px]',
      'data-[position=after]:pointer-events-none',

      'motion-reduce:transition-none',
    ],
  }),
  menuItem: cva({ base: '' }),
  menuButton: cva({
    base: [
      'flex items-center gap-2 w-full px-2 h-9 text-sm rounded-md',
      'text-muted-foreground hover:text-foreground hover:bg-hover transition-colors',
      // 'data-active:bg-selected data-active:text-foreground data-active:font-medium',
      'data-active:bg-orange-500/15 data-active:text-orange-700 data-active:font-medium',
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
