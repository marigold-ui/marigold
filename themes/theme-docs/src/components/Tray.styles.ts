import { ThemeComponent, cva } from '@marigold/system';

export const Tray: ThemeComponent<'Tray'> = {
  overlay: cva({
    base: 'bg-black/50 fixed inset-0 z-40 flex items-end justify-center',
  }),
  container: cva({
    base: [
      'w-full border-0 inset-shadow-black inset-shadow-sm/20',
      'relative grid-rows-[auto_auto_1fr_auto] max-h-[95vh] rounded-t-lg rounded-b-none',
      'bg-bg-surface-overlay shadow-lg',
      'outline-hidden grid',
      "after:absolute after:inset-x-0 after:top-full after:h-screen after:bg-bg-surface-overlay after:content-['']",
    ],
  }),
  dragHandle: cva({ base: 'bg-border mx-auto mt-2 h-1.5 w-12 rounded-full' }),
  header: cva({ base: 'border-border border-b px-6 py-4' }),
  title: cva({ base: 'font-semibold text-base' }),
  content: cva({ base: 'overflow-y-auto outline-none p-2' }),
  actions: cva({
    base: 'flex flex-row gap-3 justify-end border-border border-t px-6 py-4',
  }),
};
