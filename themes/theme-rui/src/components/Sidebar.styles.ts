import { type ThemeComponent, cva } from '@marigold/system';

export const Sidebar: ThemeComponent<'Sidebar'> = {
  root: cva({
    base: [
      'relative h-full grid-rows-[auto_1fr_auto]',
      'bg-surface border-surface-border ui-elevation-overlay util-scrollbar',
      'data-[state=expanded]:w-64',
      'data-[state=collapsed]:w-0 data-[state=collapsed]:overflow-hidden',
      'transition-[width] duration-200 ease-in-out',
      'data-[side=left]:border-r data-[side=right]:border-l',
    ],
  }),
  closeButton: cva({ base: ['absolute top-3.5 right-3 z-50', 'size-7'] }),
  header: cva({ base: 'border-border border-b px-6 py-4' }),
  content: cva({ base: 'px-6 py-4 overflow-y-auto outline-none' }),
  footer: cva({ base: 'border-border border-t px-6 py-4' }),
  toggle: cva({
    base: [
      'ui-button-base ui-press',
      'hover:bg-current/10',
      'size-button [&_svg]:size-4',
    ],
  }),
  group: cva({ base: 'flex flex-col gap-1 py-2' }),
  groupLabel: cva({
    base: 'px-6 py-1 text-xs font-medium text-text-primary-muted uppercase tracking-wider',
  }),
  menu: cva({ base: 'flex flex-col gap-0.5 list-none p-0 m-0' }),
  menuItem: cva({ base: '' }),
  menuButton: cva({
    base: [
      'flex items-center gap-2 w-full px-6 py-1.5 text-sm rounded',
      'hover:bg-secondary-100 transition-colors',
      'data-active:bg-secondary-200 data-active:font-medium',
      'outline-none focus-visible:ring-2 focus-visible:ring-outline-focus',
    ],
  }),
  subNav: cva({ base: 'relative overflow-hidden' }),
  subNavBackButton: cva({
    base: [
      'flex items-center gap-1 w-full px-6 py-1.5 text-sm rounded',
      'text-text-primary-muted hover:text-text-primary transition-colors',
      'outline-none focus-visible:ring-2 focus-visible:ring-outline-focus',
      'cursor-pointer mb-1',
    ],
  }),
};
