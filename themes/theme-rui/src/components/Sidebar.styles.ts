import { type ThemeComponent, cva } from '@marigold/system';

export const Sidebar: ThemeComponent<'Sidebar'> = {
  root: cva([
    'relative h-full grid-rows-[auto_1fr_auto]',
    'bg-surface border-surface-border ui-elevation-overlay util-scrollbar',
    'data-[state=expanded]:w-64',
    'data-[state=collapsed]:w-0 data-[state=collapsed]:overflow-hidden',
    'transition-[width] duration-200 ease-in-out',
    'data-[side=left]:border-r data-[side=right]:border-l',
  ]),
  closeButton: cva(['absolute top-3.5 right-3 z-50', 'size-7']),
  header: cva('border-border border-b px-6 py-4'),
  content: cva('px-6 py-4 overflow-y-auto outline-none'),
  footer: cva('border-border border-t px-6 py-4'),
  toggle: cva([
    'inline-flex items-center justify-center',
    'whitespace-nowrap rounded-surface font-medium transition-[color,box-shadow,transform]',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'focus-visible:ui-state-focus outline-none disabled:ui-state-disabled',
    'cursor-pointer',
    'duration-150 active:scale-[0.97]',
    'ui-surface',
    'hover:[--ui-background-color:var(--color-hover)] hover:text-foreground',
    'size-button [&_svg]:size-4',
  ]),
  group: cva('flex flex-col gap-1 py-2'),
  groupLabel: cva(
    'px-6 py-1 text-xs font-medium text-text-primary-muted uppercase tracking-wider'
  ),
  menu: cva('flex flex-col gap-0.5 list-none p-0 m-0'),
  menuItem: cva(''),
  menuButton: cva([
    'flex items-center gap-2 w-full px-6 py-1.5 text-sm rounded',
    'hover:bg-secondary-100 transition-colors',
    'data-active:bg-secondary-200 data-active:font-medium',
    'outline-none focus-visible:ring-2 focus-visible:ring-outline-focus',
  ]),
};
