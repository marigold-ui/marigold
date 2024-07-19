import { ThemeComponent, cva } from '@marigold/system';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva([
    'bg-bg-surface-overlay borde-rborder mt-1 rounded border drop-shadow-lg',
  ]),
  list: cva([
    'outline-none',
    'p-1',
    'sm:max-h-[45vh] md:max-h-[75vh] lg:max-h-[75vh]',
  ]),
  option: cva([
    'cursor-pointer rounded p-2 outline-none',
    'rac-hover:bg-bg-hover rac-focus:bg-bg-hover',
    'aria-selected:font-medium',
  ]),
  section: cva(),
  sectionTitle: cva(),
};
