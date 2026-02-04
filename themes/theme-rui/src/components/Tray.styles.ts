import { ThemeComponent, cva } from '@marigold/system';

export const Tray: ThemeComponent<'Tray'> = {
  overlay: cva('bg-black/50 fixed inset-0 z-40 flex items-end justify-center'),
  container: cva([
    'relative grid-rows-[auto_auto_1fr_auto] max-h-[95vh] rounded-b-none',
    'ui-surface ui-elevation-overlay',
    "group/tray outline-hidden grid [grid-template-areas:'drag'_'title'_'content'_'actions']",
    "after:absolute after:inset-x-0 after:top-full after:h-screen after:bg-background after:content-['']",
  ]),
  closeButton: cva(['absolute top-3.5 right-3 z-50', 'size-7']),
  drag: cva(
    'bg-surface-border mx-auto mt-2 h-1.5 w-12 rounded-full [grid-area:drag]'
  ),
  header: cva('border-border border-b px-6 py-4'),
  title: cva('font-semibold text-base'),
  content: cva('overflow-y-auto outline-none p-2'),
  actions: cva(
    'flex flex-row gap-3 justify-end border-border border-t px-6 py-4'
  ),
};
