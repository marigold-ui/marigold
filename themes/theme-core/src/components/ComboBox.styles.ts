import { ThemeComponent, cva } from '@marigold/system';

export const ComboBox: ThemeComponent<'ComboBox'> = cva([
  'absolute right-2 size-4 border-none bg-transparent disabled:bg-transparent hover:bg-transparent overflow-hidden',
]);
