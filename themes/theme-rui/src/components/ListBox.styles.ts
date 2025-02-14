import { type ThemeComponent, cva } from '@marigold/system';
import { inputDisabled } from './Input.styles';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva(['overflow-hidden rounded-lg border border-input-border']),
  list: cva(['space-y-1 bg-background p-1 text-sm ']),
  option: cva([
    'relative rounded-md px-2 py-1.5',
    inputDisabled,
    'selected:bg-accent selected:text-accent-foreground',
    'focus:outline-2 focus:outline-ring/70',
  ]),
  section: cva(),
  header: cva(),
};
