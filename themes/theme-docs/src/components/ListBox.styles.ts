import { ThemeComponent, cva } from '@marigold/system';

// Make sure ListBox looks correct if is in an overlay
const font = 'font-body text-text-base';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva([]),
  list: cva([]),
  option: cva([]),
  section: cva(),
  sectionTitle: cva(),
};
