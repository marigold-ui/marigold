import { type ThemeComponent, cva } from '@marigold/system';

export const ComboBox: ThemeComponent<'ComboBox'> = {
  icon: cva({ base: 'text-muted-foreground/80 right-2' }),
  mobileTrigger: cva({ base: 'group/input relative flex items-center' }),
};
