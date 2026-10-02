import { ThemeComponent, cva } from '@marigold/system';

export const Tray: ThemeComponent<'Tray'> = {
  overlay: cva({
    base: 'bg-overlay-backdrop fixed inset-0 flex items-end justify-center',
  }),
  container: cva({
    base: [
      'w-full border-0 inset-shadow-black inset-shadow-sm/20',
      // `vh` is the *large* viewport on mobile, so the tray could be laid out
      // taller than what is visible while browser UI is showing. RAC's
      // `ModalOverlay` publishes the visual viewport height as a custom
      // property, which is what `Drawer` already uses (DST-1739).
      'relative grid-rows-[auto_auto_1fr_auto] max-h-[calc(var(--visual-viewport-height,100vh)*0.95)] rounded-b-none',
      'ui-surface shadow-elevation-overlay',
      'outline-hidden grid',
      "after:absolute after:inset-x-0 after:top-full after:h-screen after:bg-surface after:content-['']",
    ],
  }),
  dragHandle: cva({
    base: 'bg-border mx-auto mt-2 h-1.5 w-12 rounded-full',
  }),
  header: cva({ base: 'ui-surface-header' }),
  title: cva({ base: 'font-semibold text-base' }),
  description: cva({ base: 'text-sm text-secondary mt-0.5' }),
  content: cva({ base: 'ui-surface-content' }),
  actions: cva({ base: 'ui-surface-actions' }),
};
