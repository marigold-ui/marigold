import { ThemeComponent, cva } from '@marigold/system';

export const Tray: ThemeComponent<'Tray'> = {
  overlay: cva('bg-black/50'),
  modal: cva('rounded-t-xl'),
  container: cva([
    'relative grid-rows-[auto_1fr_auto] h-[85vh]',
    'util-surface-overlay rounded-t-xl',
  ]),
  closeButton: cva(['absolute top-3.5 right-3 z-50', 'size-7']),
  header: cva('border-border border-b px-6 py-4'),
  title: cva('font-semibold text-base'),
  content: cva([
    'overflow-y-auto outline-none',
    /** reset for Listbox*/
    '**:border-0 **:shadow-none **:bg-transparent ',
  ]),
  actions: cva(
    'flex flex-row gap-3 justify-end border-border border-t px-6 py-4'
  ),
};
