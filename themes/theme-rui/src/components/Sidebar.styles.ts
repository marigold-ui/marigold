import { type ThemeComponent, cva } from '@marigold/system';

export const Sidebar: ThemeComponent<'Sidebar'> = {
  overlay: cva({}),
  modal: cva({
    base: [
      'flex h-full *:flex-1',
      'justify-start',
      'entering:animate-slide-in-left',
      'exiting:animate-slide-out-left exiting:[--slide-out-duration:0.1s]',
      'motion-reduce:entering:animate-none motion-reduce:exiting:animate-none',
    ],
  }),
  root: cva({
    base: [
      'relative h-full overflow-hidden',
      'bg-surface border-surface-border ui-elevation-overlay util-scrollbar',
      'sm:data-[state=expanded]:w-64',
      'sm:data-[state=collapsed]:w-0',
      'sm:transition-[width] sm:duration-200 sm:ease-in-out',
      'motion-reduce:sm:transition-none',
      'border-r',
    ],
  }),
  closeButton: cva({ base: ['absolute top-3.5 right-3', 'size-7'] }),
  content: cva({ base: 'sm:w-64' }),
  header: cva({ base: 'border-border border-b px-4 min-h-14' }),
  nav: cva({
    base: [
      'flex flex-col px-3 py-4 overflow-y-auto outline-none',
      'ui-scrollbar',
    ],
  }),
  footer: cva({ base: 'border-border border-t p-3' }),
  toggle: cva({
    base: [
      'ui-button-base ui-press',
      'hover:bg-current/10',
      'size-button [&_svg]:size-6',
    ],
  }),
  separator: cva({ base: 'bg-border my-1 h-px border-0' }),
  groupLabel: cva({
    base: 'px-3 pt-4 pb-1 mb-0 text-xs font-medium text-muted-foreground uppercase tracking-wider',
  }),
  navPanel: cva({
    base: [
      'flex flex-col gap-0.5 p-0',
      'transition-[opacity,translate,filter] duration-300 ease-out sm:duration-200',

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
  navLink: cva({
    base: [
      'flex items-center gap-2 w-full px-3 h-8 text-sm rounded-md',
      'text-foreground/80 hover:text-foreground hover:bg-stone-100 transition-colors',
      'data-active:bg-stone-300 data-active:shadow-sm data-active:text-foreground data-active:font-medium',
      'motion-reduce:transition-none',
      'outline-none focus-visible:ui-state-focus',
    ],
  }),
  backButton: cva({
    base: [
      'flex items-center gap-2 w-full pl-0.5 pr-3 h-8 text-sm rounded-md',
      'text-foreground/80 hover:text-foreground hover:bg-stone-100 transition-colors',
      'motion-reduce:transition-none',
      'outline-none focus-visible:ui-state-focus',
      'cursor-pointer mb-1',
    ],
  }),
};
